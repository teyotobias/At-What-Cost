import './StoreListItem.css';

export default function StoreListItem({ storeItem }) {
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
        <button className="btn-sm" onClick={() => console.log('clicked')}>
          ADD
        </button>
      </div>
    </div>
  );
}