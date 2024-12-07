import CartItem from "../CartItem/CartItem";
import "./CartDetail.css";
import { createCheckoutSession } from "../../utilities/orders-api";

export default function CartDetail({ user, order, handleChangeQty }) {
  const handleCheckout = async () => {
    try {
      const session = await createCheckoutSession(order._id);
      window.location.href = session.url;
    } catch (err) {
      console.error("Error during checkout:", err);
    }
  };
  //   if (!order) return null;

  //change
  const lineItems = order?.lineItems?.map((item) => (
    <CartItem
      lineItem={item}
      handleChangeQty={handleChangeQty}
      key={item._id}
    />
  ));

  return (
    <div className="CartDetail">
      {/* These headers always render */}
      <div className="headerItem headerItem1">ITEM</div>
      <div className="headerItem">QTY</div>
      <div className="headerItem headerItem3">PRICE</div>

      {/* Conditional rendering for the rest */}
      {!user ? (
        <div className="hungry">Please log in to view cart.</div>
      ) : lineItems.length ? (
        <>
          {lineItems}
          <section className="total">
            <button
              className="btn-sm btn-checkout"
              style={{ width: "auto", height: "100%" }}
              onClick={handleCheckout}
              disabled={!lineItems.length}
            >
              CHECKOUT
            </button>
          </section>
        </>
      ) : (
        <div className="hungry">Your cart is empty.</div>
      )}
    </div>
  );
}
