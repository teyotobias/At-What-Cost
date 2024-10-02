import { useState } from "react";
import { motion } from "framer-motion";
import {
  signUpLogoVariants,
  authPageVariants,
} from "../../utilities/variants.js";
import "./AuthPage.css";
import LoginForm from "../../components/LogInForm/LogInForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import Logo from "../../components/Logo/Logo";

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <motion.main
      className="AuthPage"
      variants={authPageVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container">
        <motion.div
          className="SignUpLogo"
          variants={signUpLogoVariants}
          animate="visible"
        >
          <Logo />
        </motion.div>
        <h3 onClick={() => setShowLogin(!showLogin)}>
          {showLogin ? "SIGN UP" : "LOG IN"}
        </h3>
        {showLogin ? (
          <LoginForm setUser={setUser} />
        ) : (
          <SignUpForm setUser={setUser} />
        )}
      </div>
    </motion.main>
  );
}
