import React from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, updateCartItemQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleBuyNow = (item) => {
    navigate("/checkout", { state: { product: item } });
  };

  const handlePlaceOrder = () => {
    navigate("/checkout");
  };

  return (
    <div className="flipkart-cart">
      <h2>My Cart ({cartItems.length})</h2>

      {cartItems.length === 0 ? (
        <p className="empty">No items in your cart.</p>
      ) : (
        <>
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.imageUrl} alt={item.name} />
                <div className="details">
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                  <p>In Stock: {item.stock - item.quantity}</p>

                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        updateCartItemQuantity(item.id, item.quantity - 1)
                      }
                      className="remove-btn"
                    >
                      −
                    </button>
                    <span className="qty">{item.quantity}</span>
                    <button
                      onClick={() => {
                        if (item.quantity < item.stock) {
                          updateCartItemQuantity(item.id, item.quantity + 1);
                        }
                      }}
                      className="add-btn"
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                  </div>

                  {item.stock > 0 ? (
                    <div className="action-buttons">
                      <button className="buy-btn" onClick={() => handleBuyNow(item)}>
                        Buy Now
                      </button>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="action-buttons">
                      <button className="out-btn" disabled>
                        Out of Stock
                      </button>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <p>
              Total ({cartItems.length} items): <strong>₹{total}</strong>
            </p>
            <div className="summary-buttons">
              <button className="clear-btn" onClick={clearCart}>
                Clear Cart
              </button>
              <button className="checkout-btn" onClick={handlePlaceOrder}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
