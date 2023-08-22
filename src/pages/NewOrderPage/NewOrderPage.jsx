import './NewOrderPage.css';
import { useState, useEffect, useRef } from 'react';
import * as itemsAPI from '../../utilities/items-api';
import * as ordersAPI from '../../utilities/orders-api';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import StoreList from '../../components/StoreList/StoreList';
import CategoryList from '../../components/CategoryList/CategoryList';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import UserLogOut from '../../components/UserLogOut/UserLogOut';

export default function NewOrderPage({ user, setUser}) {
    const [storeItems, setStoreItems] = useState([]);
    const [activeCat, setActiveCat] = useState('');
    const [isAsideVisible, setIsAsideVisible] = useState(false);
    const [isOrderDetailVisible, setIsOrderDetailVisible] = useState(false);
    const [cart, setCart] = useState(null);
    const categoriesRef = useRef([]);
    //navigate fx to change routes programmatically
    const navigate = useNavigate();


    useEffect(function() {
        async function getItems() {
            const items = await itemsAPI.getAll();
            categoriesRef.current = [...new Set(items.map(item => item.category.name))];
            setStoreItems(items);
            setActiveCat(categoriesRef.current[0]);
        }
        getItems();

        // load cart - unpaid order
        async function getCart() {
            const cart = await ordersAPI.getCart();
            setCart(cart);
        }
        getCart();
    }, []);

    useEffect(() => {
        const pageElement = document.querySelector('.NewOrderPage');
        if (isAsideVisible) {
            pageElement.classList.add('aside-visible');
        } else {
            pageElement.classList.remove('aside-visible');
        }
    }, [isAsideVisible]);

    useEffect(() => {
        const pageElement = document.querySelector('.NewOrderPage');
        if (isOrderDetailVisible) {
            pageElement.classList.add('order-detail-visible');
        } else {
            pageElement.classList.remove('order-detail-visible');
        }
    }, [isOrderDetailVisible]);
    //fetch items from server using ajax
    //when data comes back, call setStoreItems to update state

    //EVENT HANDLERS
    async function handleAddToOrder(itemId) {
        //update cart state w/updated cart from server
        const cart = await ordersAPI.addItemToCart(itemId);
        setCart(cart);
    }
    async function handleChangeQty(itemId, newQty) {
        const updatedCart = await ordersAPI.setItemQtyInCart(itemId, newQty);
        setCart(updatedCart);
    }
    function handleSuccessfulPayment() {
        navigate('/orders');
    }


    return (
        <main className="NewOrderPage">
            {/* Toggle Button */}
            <button 
                className="toggle-aside" 
                onClick={() => setIsAsideVisible(!isAsideVisible)}
            >
                {isAsideVisible ? '⟨' : '⟩'}
            </button>

            {isAsideVisible && (
                <aside>
                    <Logo />
                    <CategoryList
                    categories={categoriesRef.current}
                    activeCat={activeCat}
                    setActiveCat={setActiveCat}
                    />
                    <Link to="/orders" className="button btn-sm histBtn">PREVIOUS ORDERS</Link>
                    <UserLogOut user={user} setUser={setUser} />
                </aside>
            )}

            <StoreList
                storeItems={storeItems.filter(item => item.category.name === activeCat)}
                handleAddToOrder={handleAddToOrder}
            />
            <button 
                className="toggle-order-detail" 
                onClick={() => setIsOrderDetailVisible(!isOrderDetailVisible)}
            >
                {isOrderDetailVisible ? '⟨' : '⟩'}
            </button>
            {isOrderDetailVisible && <OrderDetail order={cart} handleChangeQty={handleChangeQty} handleSuccessfulPayment={handleSuccessfulPayment}/>}
        </main>
    );
}