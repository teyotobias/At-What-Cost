import './OrderDetailPage.css';
import CartDetail from '../../components/CartDetail/CartDetail';
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

    
//cart page
    return (
            <div className="OrderDetailPage">
                <CartDetail 
                    order={cart} 
                    handleChangeQty={handleChangeQty} 
                />
            </div>
    );
}
