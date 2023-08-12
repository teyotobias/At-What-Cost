import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App/App';
import { BrowserRouter as Router } from 'react-router-dom';
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe('your-publishable-key');
// React Router provides several components used to conditionally render our app’s components based upon the path of the URL in the address bar

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router><App /></Router>
  </React.StrictMode> 
);
// PM

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


  // <React.StrictMode> 
  //   <Elements stripe={stripePromise}>
  //     <App />
  //   </Elements>
  // </React.StrictMode>