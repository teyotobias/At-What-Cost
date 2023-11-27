import './NewOrderPage.css';
import { useState, useEffect, useRef } from 'react';
import * as itemsAPI from '../../utilities/items-api';
import * as ordersAPI from '../../utilities/orders-api';
import StoreList from '../../components/StoreList/StoreList';
import CategoryList from '../../components/CategoryList/CategoryList';
// import OrderDetail from '../../components/OrderDetail/OrderDetail';
import NavBar from '../../components/NavBar/Navbar';

export default function NewOrderPage({ user, setUser, cart, setCart}) {
    const [storeItems, setStoreItems] = useState([]);
    const [activeCat, setActiveCat] = useState('');
    // const [cart, setCart] = useState(null);
    const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
    // const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
    const categoriesRef = useRef([]);
    //navigate fx to change routes programmatically

    const toggleLeftSidebar = () => {
        // setIsRightSidebarOpen(false);
        setIsLeftSidebarOpen(!isLeftSidebarOpen);
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
    //taken out because orderdetail was also taken out, adder of current items in cart - will be added in payment page, or cart page.
    // async function handleChangeQty(itemId, newQty) {
    //     const updatedCart = await ordersAPI.setItemQtyInCart(itemId, newQty);
    //     setCart(updatedCart);
    // }


    return (
        <>
            <NavBar user={user} setUser={setUser}/>
            <main className={`NewOrderPage ${isLeftSidebarOpen ? 'left-sidebar-open' : ''}`}>
                <aside className={`left-sidebar ${isLeftSidebarOpen ? 'left-sidebar-open' : 'left-sidebar-closed'}`}>
                    <button 
                        className={`arrow-btn ${isLeftSidebarOpen ? '' : 'arrow-left'}`} 
                        onClick={toggleLeftSidebar}
                        >
                        {isLeftSidebarOpen ? '❮' : '❯'}
                    </button>
                    <CategoryList
                    categories={categoriesRef.current}
                    activeCat={activeCat}
                    setActiveCat={setActiveCat}
                    />
                </aside>
                <section className="main-content">
                    <StoreList
                    storeItems={storeItems.filter(item => item.category.name === activeCat)}
                    handleAddToOrder={handleAddToOrder}
                    />
                </section>
            
            </main>
        </>
    )
}


