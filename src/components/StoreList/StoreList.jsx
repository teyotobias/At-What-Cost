import './StoreList.css';
import StoreListItem from '../StoreListItem/StoreListItem';

export default function StoreList({ storeItems, handleAddToOrder }) {
  const items = storeItems.map(item =>
    <StoreListItem
      key={item._id}
      storeItem={item}
      handleAddToOrder={handleAddToOrder}
    />
  );
  return (
    <main className="StoreList">
      {items}
    </main>
  );
}