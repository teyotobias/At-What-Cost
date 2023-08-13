import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import React, { useState } from 'react'
import { processStripePayment } from '../../utilities/orders-api';
import './PaymentForm.css';


const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",

			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export default function PaymentForm({ orderTotal, handleSuccessfulPayment }) {
    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()


    const handleSubmit = async (e) => {
        e.preventDefault()

        // Check if stripe or elements is not initialized
        if (!stripe || !elements) {
            console.warn("Stripe has not been fully initialized. Please wait and try again.");
            return;
        }
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

        if(error) {
            console.error(error.message);
            return;
        }
        try {
            const {id} = paymentMethod
            // const response = await axios.post("http://localhost:4000/payment", {
            //     amount: 1000,
            //     id
            // })
            const paymentResponse = await processStripePayment({
                amount: orderTotal,
                paymentMethodId: id
            })

            if(paymentResponse.success) {
                console.log("Successful payment");
                setSuccess(true);
                handleSuccessfulPayment();
                console.log("Order finalized successfully");
            } else {
                console.error("Failed to finalize order: ", paymentResponse);
            }
        } catch (error) {
            console.log("Payment Error: ", error.message)
        }
    } 
    return (
        <>
        {!success ? 
        <form className="pay-form" onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button className="payBtn">Pay</button>
        </form>
        :
       <div>
           <h2>You just bought a sweet spatula congrats this is the best decision of your life</h2>
       </div> 
        }
            
        </>
    )
}