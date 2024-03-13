import './NewOrderPage.css';
import { useState, useEffect, useRef } from 'react';
import * as itemsAPI from '../../utilities/items-api';
import * as ordersAPI from '../../utilities/orders-api';
import StoreList from '../../components/StoreList/StoreList';
import CategoryList from '../../components/CategoryList/CategoryList';
import CustomModal from '../../components/CustomModal/CustomModal';

//sidebar refactor: will likely also require modifications to:
    //index.css
    //StoreList.css / jsx
    //Navbar.css / jsx
    //StoreList.css / jsx
    //StoreListItem.css / jsx


export default function NewOrderPage({ user, setUser, cart, setCart}) {
    const [storeItems, setStoreItems] = useState([]);
    const [activeCat, setActiveCat] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const categoriesRef = useRef([]);
    //navigate fx to change routes programmatically

    const toggleSidebar = () => {
        // setIsRightSidebarOpen(false);
        setIsSidebarOpen(!isSidebarOpen);
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
        <div className="page-container">
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                {isSidebarOpen ? '❮' : '❯'}
            </button>
            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebarLogo">
                    <img src="/images/brandlogo.png" alt="Brand Logo" />
                </div>
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
        </div>
        {showModal && (
                <CustomModal 
                    message={"Added To Cart!"}
                    onClose={handleCloseModal}
                    closeMessage={"Continue Shopping"}
                />
            )}
        </>
    )
}