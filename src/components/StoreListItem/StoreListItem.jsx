import './StoreListItem.css';

export default function StoreListItem({ storeItem, handleAddToOrder }) {
  return (
    <div className="MenuListItem">
      {/* <div className="emoji flex-ctr-ctr">{storeItem.image}</div> */}
      <div className="emoji">
        <img src={storeItem.image} alt={storeItem.name} />
      </div>
      {/* <div className="image"><img src={storeItem.image} alt={storeItem.name} /></div> */}
      <div className="name">{storeItem.name}</div>
      <div className="buy">
        <span>${storeItem.price.toFixed(2)}</span>
        <button className="btn-sm add-btn" onClick={() => handleAddToOrder(storeItem._id)}>
          ADD
        </button>
      </div>
    </div>
  );
}