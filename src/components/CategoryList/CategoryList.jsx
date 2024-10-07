import "./CategoryList.css";
import { textHoverVariants } from "../../utilities/variants";
import { motion } from "framer-motion";
export default function CategoryList({ categories, activeCat, setActiveCat }) {
  const cats = categories.map((cat) => (
    <motion.li
      key={cat}
      className={cat === activeCat ? "active" : ""}
      onClick={() => setActiveCat(cat)}
      variants={textHoverVariants}
      initial="initial"
      whileHover="hover"
    >
      {cat}
    </motion.li>
  ));
  return <ul className="CategoryList">{cats}</ul>;
}
