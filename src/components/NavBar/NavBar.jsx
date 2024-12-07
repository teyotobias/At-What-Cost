import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"; // Import cart icon
import "./NavBar.css";
import UserLogOut from "../UserLogOut/UserLogOut";
import Logo from "../Logo/Logo";
import UserLogIn from "../UserLogIn/UserLogIn";
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
        whileHover="hover"
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
          Orders
        </motion.div>
      </Link>
      <Link to="/cart" className="cart">
        <motion.div
          className="a"
          variants={textHoverVariants}
          initial="initial"
          whileHover="hover"
        >
          <FontAwesomeIcon icon={faShoppingCart} />
        </motion.div>
      </Link>
      {user && <UserLogOut user={user} setUser={setUser} />}
      {!user && <UserLogIn />}
    </nav>
  );
}
