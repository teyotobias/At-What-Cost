import './App.css';
import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import AuthPage from '../AuthPage/AuthPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import AboutPage from '../AboutPage/AboutPage';
import OrderDetailPage from '../OrderDetailPage/OrderDetailPage';
// import NavBar from '../../components/NavBar/Navbar';
import { getUser } from '../../utilities/users-service';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_51NeRmtFx5ZKy98UP24XAh1eqZSFjrjDhODKxchYDiNjjIQ41qxGS4iw7tHeIcpgGzbcsjsEkn442MYlfIxhIRZIg007ASGjVKu");
// React Router provides several components used to conditionally
// render our app’s components based upon the path of the URL in the address bar - client side routing
//wrapped App w/ BrowserRouter in index.js where we are rendering app
export default function App() {
  const [user, setUser] = useState(getUser());
  const [cart, setCart] = useState(null);

  // useEffect(function() {
  //   async function getItems() {
  //       const items = await itemsAPI.getAll();
  //       categoriesRef.current = [...new Set(items.map(item => item.category.name))];
  //       setStoreItems(items);
  //       setActiveCat(categoriesRef.current[0]);
  //   }
  //   getItems();

  //   // load cart - unpaid order
  //   async function getCart() {
  //       const cart = await ordersAPI.getCart();
  //       setCart(cart);
  //   }
  //   getCart();
  // }, []);








  return (
    <Elements stripe={stripePromise}>
      <main className="App">
        { user ?
          <Routes>
            <Route path="/orders/new" element={<NewOrderPage user={user} setUser={setUser} cart={cart} setCart={setCart}/>} />
            <Route path="/orders" element={<OrderHistoryPage user={user} setUser={setUser}/>} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/cart" element={<OrderDetailPage cart={cart} setCart={setCart} user={user} setUser={setUser}/>} />
            {/* redirect to /orders/new if path in address bar hasn't matched a <Route> above */}
            <Route path="/*" element={<Navigate to="/orders/new" />} />
          </Routes>
          :
          <AuthPage setUser={setUser}/>
        }
      </main>
    </Elements>
  );
}

