import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";
import UserLogOut from "../UserLogOut/UserLogOut";
import Logo from "../Logo/Logo";
import {
  textHoverVariants,
  navbarLogoVariants,
} from "../../utilities/variants";
import { motion } from "framer-motion";
export default function NavBar({ user, setUser }) {
  const location = useLocation();

  return (
    <nav className="navbar">
      <motion.div
        key={location.pathname}
        className="navbarLogo"
        variants={navbarLogoVariants}
        initial="hidden"
        animate="visible"
      >
        <Link to="/">
          <Logo />
        </Link>
      </motion.div>
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
