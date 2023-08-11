import './StoreList.css';
import StoreListItem from '../StoreListItem/StoreListItem';

export default function StoreList({ storeItems }) {
  const items = storeItems.map(item =>
    <StoreListItem
      key={item._id}
      storeItem={item}
    />
  );
  return (
    <main className="StoreList">
      {items}
    </main>
  );
}