import "./StoreListItem.css";
import { buttonHoverVariants, cardVariants } from "../../utilities/variants.js";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
export default function StoreListItem({ storeItem, handleAddToOrder, user }) {
  const navigate = useNavigate();

  return (
    <motion.div
      className="MenuListItem"
      variants={cardVariants}
      whileHover="hover"
    >
      {/* <div className="emoji flex-ctr-ctr">{storeItem.image}</div> */}
      <div className="emoji">
        <img src={storeItem.image} alt={storeItem.name} />
      </div>
      {/* <div className="image"><img src={storeItem.image} alt={storeItem.name} /></div> */}
      <div className="name">{storeItem.name}</div>
      <div className="details">
        <span className="price">${storeItem.price.toFixed(2)}</span>
        <motion.button
          className="btn-sm add-btn"
          variants={buttonHoverVariants}
          initial="visible"
          animate="visible"
          whileHover="hover"
          onClick={() =>
            user ? handleAddToOrder(storeItem._id) : navigate("/login")
          }
        >
          ADD
        </motion.button>
      </div>
    </motion.div>
  );
}
