import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CheckoutForm = () => {
    const stripe = useStripe();
    console.log(stripe);
    const elements = useElements();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [clientSecrets, setClientSecret] = useState('');
    const navigate = useNavigate();
    console.log(clientSecrets);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const amount = parseFloat(event.target.amount.value);

        if (isNaN(amount) || amount <= 0) {
            Swal.fire({
                icon: "error",
                title: "Invalid Amount",
                text: "Please enter a valid amount.",
            });
            return;
        }

        try {
            // Step 1: Create Payment Intent
            const res = await axiosSecure.post('/create-payment-intent', { price: amount });
            setClientSecret(res.data.clientSecret);
            console.log(clientSecrets);
        } catch (error) {
            console.error("Error fetching client secret:", error);
            Swal.fire({
                icon: "error",
                title: "Payment Initialization Failed",
                text: "Failed to create payment intent. Please try again.",
            });
            return;
        }

        if (!stripe || !elements || !clientSecrets) {
            console.log("Stripe, Elements, or ClientSecret not available.");
            return;
        }

        const card = elements.getElement(CardElement);
        console.log(card);
        if (!card) {
            console.log("CardElement not found.");
            return;
        }

        // Step 2: Confirm Card Payment
        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecrets, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "anonymous",
                    name: user?.displayName || "anonymous",
                },
            },
        });

        if (error) {
            console.error("Payment confirmation error:", error);
            Swal.fire({
                icon: "error",
                title: "Payment Failed",
                text: "Unable to complete the payment. Please try again.",
            });
            return;
        }

        // Step 3: Handle Successful Payment
        if (paymentIntent.status === "succeeded") {

            const paymentInfo = {
                name: user?.displayName,
                email: user?.email,
                transactionId: paymentIntent.id,
                price: amount,
                date: new Date(),
            };

            try {
                await axiosSecure.post('/payment', paymentInfo);
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Payment Successful",
                    showConfirmButton: false,
                    timer: 1500,
                });

            } catch (error) {
                console.error("Error saving payment info:", error);
            }
            navigate("/");
        }
    };

    console.log(clientSecrets);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-control py-5" >
                    <label className="label">
                        <span className="label-text text-gray-700 font-medium">Amount</span>
                    </label>
                    <input
                        type="number"
                        name="amount"
                        placeholder="Enter your Amount (TK)"
                        className="input input-bordered border-gray-300 outline-none"
                        required
                    />
                </div>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-outline btn-ghost btn-wide my-3" type="submit" >
                    Pay
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;
