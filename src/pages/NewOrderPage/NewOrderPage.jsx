import './NewOrderPage.css';
import { useState, useEffect, useRef } from 'react';
import * as itemsAPI from '../../utilities/items-api';
import * as ordersAPI from '../../utilities/orders-api';
import StoreList from '../../components/StoreList/StoreList';
import CategoryList from '../../components/CategoryList/CategoryList';
import NavBar from '../../components/NavBar/Navbar';
import CustomModal from '../../components/CustomModal/CustomModal';

export default function NewOrderPage({ user, setUser, cart, setCart}) {
    const [storeItems, setStoreItems] = useState([]);
    const [activeCat, setActiveCat] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
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
        setShowModal(true)
    }
    
    const handleCloseModal = () => {
        setShowModal(false);
    }


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
            {showModal && (
                <CustomModal 
                    message={"Item Added To Cart!"}
                    onClose={handleCloseModal}
                    closeMessage={"Continue Shopping"}
                />
            )}
        </>
    )
}


