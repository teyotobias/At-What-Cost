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
    const [cart, setCart] = useState(null);
    const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
    const categoriesRef = useRef([]);
    //navigate fx to change routes programmatically
    const navigate = useNavigate();

    const toggleLeftSidebar = () => {
        setIsRightSidebarOpen(false);
        setIsLeftSidebarOpen(!isLeftSidebarOpen);
    }
    
    const toggleRightSidebar = () => {
        setIsLeftSidebarOpen(false);
        setIsRightSidebarOpen(!isRightSidebarOpen);
    }


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
        <main className={`NewOrderPage ${isLeftSidebarOpen ? 'left-sidebar-open' : ''} ${isRightSidebarOpen ? 'right-sidebar-open' : ''}`}>
            <aside className={`left-sidebar ${isLeftSidebarOpen ? 'left-sidebar-open' : 'left-sidebar-closed'}`}>
                {/* Arrow Button */}
                <button 
                    className={`arrow-btn arrow-${isLeftSidebarOpen ? 'right' : 'left'}`} 
                    onClick={toggleLeftSidebar}
                    >
                    {isLeftSidebarOpen ? '❮' : '❯'}
                </button>
                <Logo />
                <CategoryList
                categories={categoriesRef.current}
                activeCat={activeCat}
                setActiveCat={setActiveCat}
                />
                <Link to="/orders" className="button btn-sm histBtn">PREVIOUS ORDERS</Link>
                <UserLogOut user={user} setUser={setUser} />
            </aside>
            <section className="main-content">
                <StoreList
                storeItems={storeItems.filter(item => item.category.name === activeCat)}
                handleAddToOrder={handleAddToOrder}
                />
            </section>
        
            <aside className={`right-sidebar ${isRightSidebarOpen ? 'right-sidebar-open' : 'right-sidebar-closed'}`}>
                {/* Arrow Button */}
                <button 
                    className={`arrow-btn arrow-${isRightSidebarOpen ? 'left' : 'right'}`} 
                    onClick={toggleRightSidebar}
                    >
                    {isRightSidebarOpen ? '❯' : '❮'}
                </button>
                <OrderDetail order={cart} handleChangeQty={handleChangeQty} handleSuccessfulPayment={handleSuccessfulPayment}/>
            </aside>
        </main>
    )
}