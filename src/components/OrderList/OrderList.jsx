import "./OrderList.css";
import OrderListItem from "../OrderListItem/OrderListItem";

export default function OrderList({
  user,
  orders,
  activeOrder,
  setActiveOrder,
}) {
  const orderList =
    orders.length > 0 ? (
      orders.map((order) => (
        <OrderListItem
          order={order}
          activeOrder={activeOrder}
          setActiveOrder={setActiveOrder}
          key={order.id}
        />
      ))
    ) : (
      <div className="noOrders">No Previous Orders</div>
    );

  return (
    <main className={`OrderList ${orders.length ? "" : "no-orders"}`}>
      {user ? (
        orderList
      ) : (
        <div className="noOrders">Please log in to view order history</div>
      )}
    </main>
  );
}
