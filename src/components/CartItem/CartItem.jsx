import "./CartItem.css";
import { motion } from "framer-motion";
import { buttonHoverVariants } from "../../utilities/variants";
export default function CartItem({ lineItem, handleChangeQty }) {
  return (
    <div className="CartItem">
      <img
        src={lineItem.item.image}
        alt={lineItem.item.name}
        class="CartItemImage"
      />
      <div className="qty">
        <motion.button
          variants={buttonHoverVariants}
          initial="initial"
          whileHover="hover"
          className="btn-xs mobile-btn"
          onClick={() => handleChangeQty(lineItem.item._id, lineItem.qty - 1)}
        >
          −
        </motion.button>
        <span className="itemqty">{lineItem.qty}</span>
        <motion.button
          variants={buttonHoverVariants}
          initial="initial"
          whileHover="hover"
          className="btn-xs mobile-btn"
          onClick={() => handleChangeQty(lineItem.item._id, lineItem.qty + 1)}
        >
          +
        </motion.button>
      </div>
      <div className="ext-price">${lineItem.extPrice.toFixed(2)}</div>
    </div>
  );
}
