import './CartItem.css';

export default function CartItem({ lineItem, handleChangeQty }) {

    return (

    
        <div className="CartItem">
            <div class="itemContainer">
            <div className="emoji" style={{height: '100%', width: '100%'}}>
                <img src={lineItem.item.image} alt={lineItem.item.name} />
            </div>
            </div>

            <div className="qty">
                <button
                    className="btn-xs"
                    onClick={() => handleChangeQty(lineItem.item._id, lineItem.qty - 1)}
                >−</button>
                <span className="itemqty">{lineItem.qty}</span>
                <button
                    className="btn-xs"
                    onClick={() => handleChangeQty(lineItem.item._id, lineItem.qty + 1)}
                >+</button>
        </div>

        <div className="ext-price">${lineItem.extPrice.toFixed(2)}</div> 

        </div>
    );
}