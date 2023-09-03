import './StoreListItem.css';

export default function StoreListItem({ storeItem, handleAddToOrder }) {
  return (
    <div className="store-list-item">
      <img src={storeItem.image} alt={storeItem.name} className="product-image" />
      <span className="product-label">{storeItem.name}</span>
      <span className="product-price">${storeItem.price.toFixed(2)}</span>
      <button className="add-button" onClick={() => handleAddToOrder(storeItem._id)}>Add</button>
    </div>

  );
}