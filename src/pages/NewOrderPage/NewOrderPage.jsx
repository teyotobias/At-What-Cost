import "./NewOrderPage.css";
import { motion } from "framer-motion";
import {
  sidebarVariants,
  contentVariants,
  exitVariants,
} from "../../utilities/variants";
import { useState, useEffect, useRef } from "react";
import * as itemsAPI from "../../utilities/items-api";
import * as ordersAPI from "../../utilities/orders-api";
import StoreList from "../../components/StoreList/StoreList";
import CategoryList from "../../components/CategoryList/CategoryList";
import { toast } from "react-toastify";

export default function NewOrderPage({ user, setUser, cart, setCart }) {
  const [storeItems, setStoreItems] = useState([]);
  const [activeCat, setActiveCat] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const categoriesRef = useRef([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(function () {
    async function getItems() {
      const items = await itemsAPI.getAll();
      categoriesRef.current = [
        ...new Set(items.map((item) => item.category.name)),
      ];
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
    toast.success("Item added to the cart!", {
      style: {
        backgroundColor: "rgb(102,102,102)",
        color: "white",
      },
      progressStyle: {
        background: "rgb(206,251,244)",
      },
      icon: (
        <svg viewBox="0 0 24 24" fill="rgb(206,251,244)" height="24" width="24">
          <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 18l-5-5 1.4-1.4 3.6 3.6L18.6 7.4 20 8.8 10 18z" />
        </svg>
      ),
      autoClose: 250,
    });
  }

  return (
    <>
      <div className="page-container">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {isSidebarOpen ? "❮" : "❯"}
        </button>
        <motion.aside
          className="sidebar"
          variants={sidebarVariants}
          initial="closed"
          animate={isSidebarOpen ? "open" : "closed"}
        >
          <CategoryList
            categories={categoriesRef.current}
            activeCat={activeCat}
            setActiveCat={setActiveCat}
          />
        </motion.aside>
        <motion.section
          className="main-content"
          variants={contentVariants}
          initial="expanded"
          animate={isSidebarOpen ? "shrink" : "expanded"}
        >
          <motion.div
            variants={exitVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <StoreList
              storeItems={storeItems.filter(
                (item) => item.category.name === activeCat
              )}
              handleAddToOrder={handleAddToOrder}
            />
          </motion.div>
        </motion.section>
      </div>
    </>
  );
}
