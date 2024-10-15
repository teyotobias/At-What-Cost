import { motion, AnimatePresence } from "framer-motion";
import { recruiterMessageVariant } from "../../utilities/variants";
import "./RecruiterMessage.css";
import { useState, useEffect } from "react";
export default function RecruiterMessage() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="recruiter-message"
          variants={recruiterMessageVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <p>
            Recruiters, feel free to log in with <br />
            <strong>Email:</strong> teyo@email.com,
            <strong> Password:</strong> 1213
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
