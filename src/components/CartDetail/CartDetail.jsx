import LineItem from '../LineItem/LineItem'; //change
import CartItem from '../CartItem/CartItem';
import './CartDetail.css';
import { createCheckoutSession } from '../../utilities/orders-api';


export default function CartDetail({ order, handleChangeQty }) {


    const handleCheckout = async () => {
        try {
          const session = await createCheckoutSession(order._id);
          window.location.href = session.url;
        } catch (err) {
          console.error('Error during checkout:', err);
        }
    };
    if (!order) return null;

    //change 
    const lineItems = order.lineItems.map(item =>
        <CartItem
          lineItem={item}
          handleChangeQty={handleChangeQty}
          key={item._id}
        />
    );

    return (
        <div className="CartDetail">
            <div className="section-heading" style={{ borderBottomLeftRadius:'0', borderBottomRightRadius: '0', borderBottom: '.1vmin solid rgb(230,230,230)'}}>
                <span className="spanItem">ITEM</span>
                <span className="spanItem">QTY</span>
                <span className="spanItem">PRICE</span>
            </div>

            <div className="line-item-container flex-ctr-ctr flex-col detail-font">
            {lineItems.length ?
                <>
                {lineItems}
                <section className="total" style={{paddingBottom: '3vmin'}}>
                    <button
                    className="btn-sm btn-checkout"
                    style={{width: 'auto', height: '100%'}}
                    onClick={handleCheckout}
                    disabled={!lineItems.length}
                    >CHECKOUT</button>
                </section>
                </>
                :
                <div className="hungry">Your cart is empty.</div>
            }
            </div>
        </div>
    )
}