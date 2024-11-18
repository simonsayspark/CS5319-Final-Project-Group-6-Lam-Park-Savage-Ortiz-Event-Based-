import React, { useState, useEffect } from "react";
import { FiTrash2, FiBookmark, FiMinus, FiPlus } from "react-icons/fi";
import NewNav from "../Component/NewNav";
import { Container, Col } from "react-bootstrap";
import ProductCart from "../Component/ProductCard";

const ShoppingCart = () => {
  const [navData, setNavData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  useEffect(() => {
    // Fetch navigation data
    fetch(`/api/category`)
      .then((response) => response.json())
      .then((data) => {
        setNavData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Fetch cart items for the logged-in user
    if (userId) {
      fetch(`/api/cart/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setCartItems(data);
        })
        .catch((error) => {
          console.error("Error fetching cart items:", error);
        });
    }
  }, [userId]);

  // Calculate subtotal, shipping, and VAT
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );
  const shipping = 16.0;
  const vat = subtotal * 0.2;
  const total = subtotal + shipping + vat;

  const updateQuantity = (id, amount) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) + amount) }
          : item
      )
    );
  };

  const handleRemoveItem = async (productId) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please log in to remove items from your cart.");
      return;
    }

    try {
      const res = await fetch("/api/cart/remove", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
      });

      const data = await res.json();

      if (res.ok) {
        // Update the cart items state
        setCartItems((prevItems) =>
          prevItems.filter((item) => item._id !== productId)
        );
        alert("Product removed from cart.");
      } else {
        alert(data.error || "Failed to remove product from cart.");
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handlePlaceOrder = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please log in to place an order.");
      return;
    }

    try {
      const orderDetails = {
        userId,
        cartItems: cartItems.map((item) => ({ productId: item._id })),
        totalAmount: total,
      };

      const res = await fetch("/api/orders/place", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Order placed successfully!");
        setCartItems([]);
      } else {
        alert(data.error || "Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <NewNav navData={navData} />
      <div className="main-content">
        <div className="p-2"></div>
        <Container className="mb-2 mt-2 d-flex flex-row justify-between">
          <Col md={7} className="border-right">
            <div className="space-y-6 flex-grow">
              {cartItems.map((item) => (
                <ProductCart
                  key={item._id}
                  product={item}
                  quantity={item.quantity || 1}
                  updateQuantity={updateQuantity}
                  removeItem={handleRemoveItem}
                />
              ))}
            </div>
          </Col>

          <div className="w-full p-6 bg-gray-50 rounded-lg shadow-md">
            <div className="border-b pb-4 mb-4">
              <h3 className="text-xl font-bold">Order Summary</h3>
            </div>
            <div className="flex justify-between text-lg">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span>Shipping:</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span>VAT (20%):</span>
              <span>${vat.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold mt-4">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full py-3 mt-4 bg-blue text-white rounded-lg hover:bg-blue-700"
            >
              Place Order
            </button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ShoppingCart;
