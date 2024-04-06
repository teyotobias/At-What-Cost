import LineItem from '../LineItem/LineItem';
import './OrderDetail.css';
import { createCheckoutSession } from '../../utilities/orders-api';

//OrderDetail component - props: order, function to change qty, flag for cart page
export default function OrderDetail({ order, handleChangeQty, isCartPage}) {

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
      isCartPage={isCartPage}
      key={item._id}
    />
  );

  return (
    <div className="OrderDetail" style={isCartPage ? {width: '100%'}: {}}>
      <div className="section-heading" style={isCartPage ? {borderBottomLeftRadius: '0', borderBottomRightRadius: '0', borderBottom: '.1vmin solid rgb(230,230,230)'}: {}}>
        {order.isPaid ?
          <>
            <span>ORDER <span className="smaller">{order.orderId}</span></span>
            <span>{new Date(order.updatedAt).toLocaleDateString()}</span>
          </>
          :
          <>
          <span class="spanItem">&nbsp;&nbsp;&nbsp;ITEM</span>
          <span class="spanItem">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;QTY</span>
          <span class="spanItem">PRICE</span>
          </>
        }
      </div>
      <div className="line-item-container flex-ctr-ctr flex-col detail-font" style={!isCartPage ? { marginTop: '1vmin', padding: '0' } : {}}>
        {lineItems.length ?
          <>
            {lineItems}
            <section className="total" style={!isCartPage ? {gridTemplateColumns: '11vw 12vw 7vw'}:{paddingBottom: '3vmin'}}>
              {order.isPaid ?
                <>
                <span className="right">&nbsp;&nbsp;&nbsp;TOTAL:</span>
                <span className="right">${order.orderTotal.toFixed(2)}</span>
                </>
                :
                <>
                <button
                  className="btn-sm btn-checkout"
                  style={{width: '12%', height: '100%'}}
                  onClick={handleCheckout}
                  disabled={!lineItems.length}
                >CHECKOUT</button>
                </>
              }
              {/* <span className="right" style={!isCartPage ? {justifyContent: 'center', marginTop:'0'}: {marginLeft: '2%'}}>{order.totalQty}</span>
              <span className="right" style={!isCartPage ? { justifyContent: 'flex-end', marginTop: '0' } : { marginLeft: '2%'}}>${order.orderTotal.toFixed(2)}</span> */}
            </section>
          </>
          :
          <div className="hungry">Your cart is empty.</div>
        }
      </div>
    </div>
  );
}
