import './OrderList.css';
import OrderListItem from '../OrderListItem/OrderListItem';

export default function OrderList({ orders, activeOrder, setActiveOrder }) {

  const orderList = orders.length > 0 ? ( 
    orders.map(order =>  (
    <OrderListItem
      order={order}
      activeOrder={activeOrder}
      setActiveOrder={setActiveOrder}
      key={order.id}
    />
  ))
  ) : (
    <p>No Previous Orders</p>
  );

  return (
    <main className={`OrderList ${orders.length ? '' : 'no-orders'}`}>
      {orderList}
    </main>
  );
} 