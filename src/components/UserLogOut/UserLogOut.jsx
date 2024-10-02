import "./UserLogOut.css";
import { logOut } from "../../utilities/users-service";
import { motion } from "framer-motion";
import { buttonHoverVariants } from "../../utilities/variants";

export default function UserLogOut({ user, setUser }) {
  function handleLogOut() {
    logOut();
    setUser(null);
  }

  return (
    <div className="UserLogOut">
      <motion.button
        className="btn-sm logOutBtn"
        onClick={handleLogOut}
        variants={buttonHoverVariants}
        initial="initial"
        whileHover="hover"
      >
        LOG OUT
      </motion.button>
      <div className="email">{user.email}</div>
    </div>
  );
}
