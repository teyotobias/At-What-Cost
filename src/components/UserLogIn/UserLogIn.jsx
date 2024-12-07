import "../UserLogOut/UserLogOut.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { buttonHoverVariants } from "../../utilities/variants";
export default function UserLogIn() {
  return (
    <Link to="/login">
      <div className="UserLogOut">
        <motion.button
          className="btn-sm logOutBtn"
          variants={buttonHoverVariants}
          initial="initial"
          whileHover="hover"
        >
          LOG IN
        </motion.button>
      </div>
    </Link>
  );
}
