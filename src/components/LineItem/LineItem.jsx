import './LineItem.css';

export default function LineItem({ lineItem, isPaid, handleChangeQty }) {
  return (
    <div className="LineItem">
      {/* <div className="flex-ctr-ctr">{lineItem.item.emoji}</div> */}
      <div className="emoji">
        <img src={lineItem.item.image} alt={lineItem.item.name} />
      </div>
      <div className="flex-ctr-ctr flex-col">
        <span className="align-ctr">{lineItem.item.name}</span>
        <span>{lineItem.item.price.toFixed(2)}</span>
      </div>
      <div className="qty" style={{ justifyContent: isPaid && 'center' }}>
        <span>{lineItem.qty}</span>
      </div>
      <div className="ext-price">${lineItem.extPrice.toFixed(2)}</div> 
    </div>
  );
} 