// Cart.js (Flipkart-Style Cart Page)
import React from "react";
import { useCart } from "./CartContext";


const Cart = () => {
  const { cartItems, removeFromCart, addToCart, clearCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="flipkart-cart">
      <h2>My Cart ({cartItems.length})</h2>

      {cartItems.length === 0 ? (
        <p className="empty">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.imageUrl} alt={item.name} />
                <div className="details">
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => removeFromCart(item.id)} className="remove-btn">−</button>
                    <span className="qty">{item.quantity}</span>
                    <button onClick={() => addToCart(item)} className="add-btn">+</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <p>Total ({cartItems.length} items): <strong>₹{total}</strong></p>
            <div className="summary-buttons">
              <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
              <button className="checkout-btn">Proceed to Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;