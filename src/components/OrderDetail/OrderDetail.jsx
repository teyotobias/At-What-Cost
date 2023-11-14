import LineItem from '../LineItem/LineItem';
import './OrderDetail.css';
import StripeContainer from '../StripeContainer/StripeContainer';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// Used to display the details of any order, including the cart (unpaid order)
//handleSuccessFulPayment removed from props
export default function OrderDetail({ order, handleChangeQty}) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  // const navigate = useNavigate();

  if (!order) return null;

  const lineItems = order.lineItems.map(item =>
    <LineItem
      lineItem={item}
      isPaid={order.isPaid}
      handleChangeQty={handleChangeQty}
      key={item._id}
    />
  );
  if (isCheckingOut) {
    console.log("Rendering StripeContainer"); // Add this line for debugging
    const orderTotalInCents = Math.round(order.orderTotal * 100);
    return <StripeContainer orderTotal={orderTotalInCents}/> //handleSuccessfulPayment removed from passed props
  }

  return (
    <div className="OrderDetail">
      <div className="section-heading">
        {order.isPaid ?
          <span>ORDER <span className="smaller">{order.orderId}</span></span>
          :
          <span>NEW ORDER</span>
        }
        <span>{new Date(order.updatedAt).toLocaleDateString()}</span>
      </div>
      <div className="line-item-container flex-ctr-ctr flex-col detail-font">
        {lineItems.length ?
          <>
            {lineItems}
            <section className="total">
              {order.isPaid ?
                <span className="right">TOTAL&nbsp;&nbsp;</span>
                :
                <button
                  className="btn-sm btn-checkout"
                  onClick={() => {
                    setIsCheckingOut(true); //navigates: maybe should set isCheckingOut to true instead?
                  }}
                  disabled={!lineItems.length}
                >CHECKOUT</button>
              }
              <span>{order.totalQty}</span>
              <span className="right">${order.orderTotal.toFixed(2)}</span>
            </section>
          </>
          :
          <div className="hungry">Your cart is empty.</div>
        }
      </div>
    </div>
  );
}
