import { Link } from "react-router-dom";
import "./NavBar.css";
import UserLogOut from "../UserLogOut/UserLogOut";
import Logo from "../Logo/Logo";
import { textHoverVariants } from "../../utilities/variants";
import { motion } from "framer-motion";
export default function NavBar({ user, setUser }) {
  return (
    <nav className="navbar">
      <div className="navbarLogo">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <Link to="/orders" className="previous-orders">
        <motion.div
          className="a"
          variants={textHoverVariants}
          initial="initial"
          whileHover="hover"
        >
          Previous Orders
        </motion.div>
      </Link>
      <Link to="/cart" className="cart">
        <motion.div
          className="a"
          variants={textHoverVariants}
          initial="initial"
          whileHover="hover"
        >
          Cart
        </motion.div>
      </Link>
      <UserLogOut user={user} setUser={setUser} />
    </nav>
  );
}
