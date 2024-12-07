const Order = require("../../models/order");
const domain = process.env.DOMAIN || "http://localhost:3000";
// const Item = require('../../models/item');
const Stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
module.exports = {
  cart,
  addToCart,
  setItemQtyInCart,
  getAllForUser,
  createCheckoutSession,
  verifySession,
};

async function getAllForUser(req, res) {
  try {
    const orders = await Order.find({ user: req.user._id, isPaid: true }).sort(
      "-updatedAt"
    );
    res.json(orders);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// A cart is the unpaid order for a user
async function cart(req, res) {
  const cart = await Order.getCart(req.user._id);
  res.json(cart);
}

// Add an item to the cart
// Add an item to the cart
async function addToCart(req, res) {
  const cart = await Order.getCart(req.user._id);

  let retryCount = 0;
  const maxRetries = 3;

  while (retryCount < maxRetries) {
    try {
      // Attempt to add the item to the cart
      await cart.addItemToCart(req.params.id);
      return res.json(cart); // Return the cart when the item is successfully added
    } catch (err) {
      if (err instanceof mongoose.Error.VersionError) {
        retryCount++;
        console.log(`Retry attempt ${retryCount}`);
        // Optionally add a small delay here to avoid hitting the database too quickly
        await new Promise((resolve) => setTimeout(resolve, 100));
        continue;
      }
      // If it's not a VersionError, rethrow the error
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  // If we reach here, retries have been exhausted
  return res
    .status(500)
    .json({ success: false, message: "Max retry attempts reached" });
}

// Updates an item's qty in the cart
async function setItemQtyInCart(req, res) {
  const cart = await Order.getCart(req.user._id);
  await cart.setItemQty(req.body.itemId, req.body.newQty);
  res.json(cart);
}

// handler to create a checkout session:
async function createCheckoutSession(req, res) {
  try {
    const cart = await Order.getCart(req.user._id);
    if (!cart) throw new Error("Cart not found.");

    //Populate the line items in the cart

    await cart.populate("lineItems.item");

    const lineItems = cart.lineItems.map((lineItem) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: lineItem.item.name,
        },
        unit_amount: lineItem.item.price * 100,
      },
      quantity: lineItem.qty,
    }));
    const session = await Stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${domain}/orders/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domain}/orders/new`,
      metadata: {
        cartId: cart._id.toString(),
      },
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function verifySession(req, res) {
  const { sessionId } = req.params;

  try {
    const session = await Stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const cartId = session.metadata.cartId;
      const cart = await Order.findById(cartId);

      if (!cart) {
        throw new Error("Cart not found.");
      }
      //update cart status
      cart.isPaid = true;
      await cart.save();

      //respond w/ updated cart:
      res.json({ verified: true, cart });
    } else {
      res.json({ verified: false });
    }
  } catch (error) {
    console.error("Error in verifySession:", error);
    res.status(400).json({ error: error.message });
  }
}
