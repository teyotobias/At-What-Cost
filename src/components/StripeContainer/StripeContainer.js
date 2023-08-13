import React from "react"
import PaymentForm from "../PaymentForm/PaymentForm";
import './StripeContainer.css';



export default function StripeContainer({orderTotal, handleSuccessfulPayment}) {
	return (
		<PaymentForm orderTotal={orderTotal} handleSuccessfulPayment={handleSuccessfulPayment}/>
	)
}