import './OrderDetailPage.css';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import * as ordersAPI from '../../utilities/orders-api';
import { useEffect } from 'react';
export default function OrderDetailPage({user, setUser, cart, setCart}) {

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




//redo whole new order page
//current format is a good starting point
//detach checkout button
    return (
            <div className="OrderDetailPage">
                <OrderDetail 
                    order={cart} 
                    handleChangeQty={handleChangeQty} 
                    isCartPage={true}
                />
            </div>
    );
}