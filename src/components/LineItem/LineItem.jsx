import './LineItem.css';

export default function LineItem({ lineItem, isPaid, handleChangeQty, isCartPage }) {
  return (
    <div className="LineItem" style={!isCartPage ? {gridTemplateColumns: '3vw 15.35vw 5.75vw 5.25vw', height: 'auto' }: {}}>
      { isCartPage ? (
        <div class="itemContainer">
          <div className="emoji">
            <img src={lineItem.item.image} alt={lineItem.item.name} />
          </div>
        </div>

      ) : (
        <>
        <div className="emoji">
          <img src={lineItem.item.image} alt={lineItem.item.name} />
        </div>
        <div className="flex-ctr-ctr flex-col more-marginLeft">
          <span className="align-ctr">{lineItem.item.name}</span>
          <span>{lineItem.item.price.toFixed(2)}</span>
        </div>
        </>
      )}
      <div className="qty" style={!isCartPage? { justifyContent: 'center'}: {}}>
        {isCartPage &&
          <button
            className="btn-xs"
            onClick={() => handleChangeQty(lineItem.item._id, lineItem.qty - 1)}
          >−</button>
        }
        <span className="itemqty">{lineItem.qty}</span>
        {isCartPage &&
          <button
            className="btn-xs"
            onClick={() => handleChangeQty(lineItem.item._id, lineItem.qty + 1)}
          >+</button>
        }
      </div>

      <div className="ext-price">${lineItem.extPrice.toFixed(2)}</div> 
    </div>
  );
} 