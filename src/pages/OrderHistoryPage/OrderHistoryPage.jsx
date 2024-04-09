import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './OrderHistoryPage.css';
import * as ordersAPI from '../../utilities/orders-api';
import UserLogOut from '../../components/UserLogOut/UserLogOut';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import OrderList from '../../components/OrderList/OrderList';

export default function OrderHistoryPage({ user, setUser }) {
  const [orders, setOrders] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);




  useEffect(function() {
    async function getOrders() {
      const orders = await ordersAPI.getAllForUser();
      setActiveOrder(orders[0] || null);
      setOrders(orders);
    }
    getOrders();
  }, []);


//history page

  return (
    <main className="OrderHistoryPage">
      <aside>
        <div className="sidebarLogo">
          <img src="/images/iPhone.png" alt="Shop Icon" />
        </div>
        <Link to="/orders/new" className="btn-new">NEW ORDER</Link>
        <div className="logout-wrapper">
          <UserLogOut user={user} setUser={setUser} />
        </div>
      </aside>
      <OrderList
        orders={orders}
        activeOrder={activeOrder}
        setActiveOrder={setActiveOrder}
      />
      <OrderDetail order={activeOrder} isCartPage={false} />
    </main>
  );
}