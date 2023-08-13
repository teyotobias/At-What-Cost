const Order = require('../../models/order');
// const Item = require('../../models/item');
const Stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);
module.exports = {
    cart,
    addToCart,
    setItemQtyInCart,
    checkout,
    getAllForUser
  };
  
  async function getAllForUser(req, res) {
    try {
        const orders = await Order.find({user: req.user._id, isPaid: true}).sort('-updatedAt');
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
  async function addToCart(req, res) {
    const cart = await Order.getCart(req.user._id);
    //promise resolves to -> document, but already in cart variable: create anoth1
    await cart.addItemToCart(req.params.id);
    res.json(cart);
  }
  
  // Updates an item's qty in the cart
  async function setItemQtyInCart(req, res) {
    const cart = await Order.getCart(req.user._id);
    await cart.setItemQty(req.body.itemId, req.body.newQty); 
    res.json(cart);
  }
  
  // Update the cart's isPaid property to true
  async function checkout(req, res) {
    console.log(req.body);
    try {
      const cart = await Order.getCart(req.user._id);
      //calculate total amt
      const amount = Math.round(cart.orderTotal * 100);
      // process payment thru stripe
      const { paymentMethodId } = req.body;
      const paymentIntent = await Stripe.paymentIntents.create({
        amount,
        currency: 'USD',
        description: "At What Cost LLC",
        payment_method: paymentMethodId,
        confirm: true
      });
      //check if payment successful
      if(paymentIntent.status === 'succeeded') {
        //update order status in db
        cart.isPaid = true;
        await cart.save();

        res.json({ success: true, cart});
      } else {
        res.status(400).json({success: false, message: 'Payment failed'});
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message});
      console.error("Error during payment processing:", error);
    }
    // const cart = await Order.getCart(req.user._id);
    // cart.isPaid = true;
    // await cart.save(); 
    // res.json(cart);
  }