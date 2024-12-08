import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  signUpLogoVariants,
  authPageVariants,
  textHoverVariants,
} from "../../utilities/variants.js";
import "./AuthPage.css";
import LoginForm from "../../components/LogInForm/LogInForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import Logo from "../../components/Logo/Logo";
import RecruiterMessage from "../../components/RecruiterMessage/RecruiterMessage.jsx";

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  return (
    <motion.main
      className="AuthPage"
      variants={authPageVariants}
      initial="hidden"
      animate="visible"
    >
      <RecruiterMessage />
      <div className="container">
        <motion.div
          className="SignUpLogo"
          variants={signUpLogoVariants}
          animate="visible"
        >
          <Logo />
        </motion.div>
        <motion.h3
          variants={textHoverVariants}
          initial="initial"
          whileHover="hover"
          onClick={() => setShowLogin(!showLogin)}
        >
          {showLogin ? "SIGN UP" : "LOG IN"}
        </motion.h3>
        {showLogin ? (
          <LoginForm setUser={setUser} />
        ) : (
          <SignUpForm setUser={setUser} navigate={navigate} />
        )}
      </div>
    </motion.main>
  );
}
