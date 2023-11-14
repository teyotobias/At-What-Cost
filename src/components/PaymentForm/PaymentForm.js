import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { processCheckout } from '../../utilities/orders-api';
import './PaymentForm.css';


// const CARD_OPTIONS = {
// 	iconStyle: "solid",
// 	style: {
// 		base: {
// 			iconColor: "#c4f0ff",
// 			color: "#fff",
// 			fontWeight: 500,
// 			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
// 			fontSize: "16px",

// 			fontSmoothing: "antialiased",
// 			":-webkit-autofill": { color: "#fce883" },
// 			"::placeholder": { color: "#87bbfd" }
// 		},
// 		invalid: {
// 			iconColor: "#ffc7ee",
// 			color: "#ffc7ee"
// 		}
// 	}
// }

//handleSuccessfulPayment removed from props
export default function PaymentForm({ orderTotal }) {
    // const [success, setSuccess] = useState(false)   : not used
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault()

        // Check if stripe or elements is not initialized
        if (!stripe || !elements) {
            console.warn("Stripe has not been fully initialized. Please wait and try again.");
            return;
        }
        const cardElement = elements.getElement(CardElement);
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if(error) {
            console.error(error.message);
        } else {
            const response = await processCheckout(paymentMethod.id, orderTotal);

            if(response.success) {
                navigate('/orders')
            } else {
                console.error("Payment Failed: ", response.message)
            }
        }
        // try {
        //     const {id} = paymentMethod
        //     // const response = await axios.post("http://localhost:4000/payment", {
        //     //     amount: 1000,
        //     //     id
        //     // })
        //     const paymentResponse = await processStripePayment({
        //         amount: orderTotal,
        //         paymentMethodId: id
        //     })

        //     if(paymentResponse.success) {
        //         console.log("Successful payment");
        //         setSuccess(true);
        //         handleSuccessfulPayment();
        //         console.log("Order finalized successfully");
        //     } else {
        //         console.error("Failed to finalize order: ", paymentResponse);
        //     }
        // } catch (error) {
        //     console.log("Payment Error: ", error.message)
        // }
    };
    /*
This is where we are right now. 

files used in implementation:

controllers/orders.js
utilities/orders-api.js
Components: StripeContainer, OrderDetail, PaymentForm
Pages: App, OrderDetailPage,   deleted: PaymentPage


Current Payment Flow: 
    user adds items to cart, presses cart icon in navbar: navigates to OrderDetailPage
    OrderDetailPage renders OrderDetail which conditionally renders StripeContainer which renders paymentform.
    This is where the issue lies. Currently only room for card input shows up. When typing into it, card # leaks
    into card date and so on. Something is overlapping here, there is a styling issue. Find it, fix it.
    Also need the whole input form as shown in the video once styling is figured out.

    What is working? 
    Whenever test card info entered, pay button pressed, app takes you to orderhistory and already has the order there

    How can it improve?
    Need pop ups for "added to cart" and "payment successful, thank you" and things of the sort
    Look at guy's video and take account of the code he uses vs yours.
    */
    return (
        <form onSubmit={handleSubmit}>
            <p>Helllooo</p>
            <CardElement />
            <button type="submit" disabled={!stripe}>Pay</button>
        </form>

    )
}