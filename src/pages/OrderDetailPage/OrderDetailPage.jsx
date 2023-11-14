import './OrderDetailPage.css';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import * as ordersAPI from '../../utilities/orders-api';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
export default function OrderDetailPage({user, setUser, cart, setCart}) {
    const navigate = useNavigate();
    //taken out because orderdetail was also taken out, adder of current items in cart - will be added in payment page, or cart page.

    useEffect(function() {
        // load cart - unpaid order
        async function getCart() {
            const cart = await ordersAPI.getCart();
            setCart(cart);
        }
        getCart();
    }, []);
    
    async function handleChangeQty(itemId, newQty) {
        const updatedCart = await ordersAPI.setItemQtyInCart(itemId, newQty);
        setCart(updatedCart);
    }
    //orderdetail component taken out, going to be added back in the form of a navbar
    // function handleSuccessfulPayment() {
    //     navigate('/orders');
    // }

    const goToNewOrderPage = () => {
        navigate('/orders/new');
    }



    return (
        <div className="OrderDetailPage-container">
            <button className="shopping" onClick={goToNewOrderPage}>
                Back To Shopping
            </button>
            <div className="OrderDetailPage">
                <OrderDetail 
                    order={cart} 
                    handleChangeQty={handleChangeQty} 
                    // handleSuccessfulPayment={handleSuccessfulPayment}
                />
            </div>
        </div>
    );
}