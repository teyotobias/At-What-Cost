import "./CartItem.css";

export default function CartItem({ lineItem, handleChangeQty }) {
  return (
    <div className="CartItem">
      <img
        src={lineItem.item.image}
        alt={lineItem.item.name}
        class="CartItemImage"
      />
      <div className="qty">
        <button
          className="btn-xs mobile-btn"
          onClick={() => handleChangeQty(lineItem.item._id, lineItem.qty - 1)}
        >
          −
        </button>
        <span className="itemqty">{lineItem.qty}</span>
        <button
          className="btn-xs mobile-btn"
          onClick={() => handleChangeQty(lineItem.item._id, lineItem.qty + 1)}
        >
          +
        </button>
      </div>
      <div className="ext-price">${lineItem.extPrice.toFixed(2)}</div>
    </div>
  );
}
