import React from "react"
import PaymentForm from "../PaymentForm/PaymentForm";
import './StripeContainer.css';


//handle successful payment removed from props
export default function StripeContainer({orderTotal}) {
	console.log("Rendering PaymentForm with orderTotal:", orderTotal); // Add this line for debugging
	return (
		<PaymentForm orderTotal={orderTotal}/> //handleSuccessfulPayment removed from props
	)
}