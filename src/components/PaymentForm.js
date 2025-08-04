import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setPaymentMessage(error.message);
    } else {
      console.log('PaymentMethod:', paymentMethod);
      setPaymentMessage('Payment successful!');
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="billing-section">
        <h3>Billing Address</h3>
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="text" placeholder="Address" required />
        <input type="text" placeholder="City" required />
        <div className="row">
          <input type="text" placeholder="State" required />
          <input type="text" placeholder="Zip Code" required />
        </div>
      </div>

      <div className="card-section">
        <h3>Payment</h3>
        <CardElement className="card-element" />
        <button
          type="submit"
          className="checkout-button"
          disabled={!stripe || isProcessing}
        >
          {isProcessing ? 'Processing…' : 'Pay Now'}
        </button>
        {paymentMessage && <p className="payment-message">{paymentMessage}</p>}
      </div>
    </form>
  );
};

export default PaymentForm;
