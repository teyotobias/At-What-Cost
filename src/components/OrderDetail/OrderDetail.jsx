import LineItem from '../LineItem/LineItem';
import './OrderDetail.css';
import { createCheckoutSession } from '../../utilities/orders-api';

export default function OrderDetail({ order, handleChangeQty}) {

  const handleCheckout = async () => {
    try {
      const session = await createCheckoutSession(order._id);
      window.location.href = session.url;
    } catch (err) {
      console.error('Error during checkout:', err);
    }
  };
  if (!order) return null;
  const lineItems = order.lineItems.map(item =>
    <LineItem
      lineItem={item}
      isPaid={order.isPaid}
      handleChangeQty={handleChangeQty}
      key={item._id}
    />
  );

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
                  onClick={handleCheckout}
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
