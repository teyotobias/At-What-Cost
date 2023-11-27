import './OrderDetailPage.css';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import * as ordersAPI from '../../utilities/orders-api';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
export default function OrderDetailPage({user, setUser, cart, setCart}) {
    const navigate = useNavigate();

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
                />
            </div>
        </div>
    );
}