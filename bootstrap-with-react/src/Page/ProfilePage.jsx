import React, { useEffect, useState } from "react";
import { Container, Card, ListGroup } from "react-bootstrap";
import NewNav from "../Component/NewNav";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({});
  const [orders, setOrders] = useState([]);
  const [navData, setNavData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
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
    if (!userId) {
      alert("Please log in to view your profile.");
      return;
    }

    const fetchProfileData = async () => {
      try {
        const res = await fetch(`/api/users/profile/${userId}`);
        const data = await res.json();

        if (res.ok) {
          setUserInfo(data.user);
          setOrders(data.orders);
        } else {
          alert(data.error || "Failed to fetch profile data.");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        alert("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NewNav navData={navData} />
      <div className="main-content">
        <Container className="mt-5">
          <h2>User Profile</h2>

          {/* User Information */}
          <Card className="mb-4">
            <Card.Body>
              <h5>Username: {userInfo.username}</h5>
              <p>Email: {userInfo.email}</p>
            </Card.Body>
          </Card>

          {/* Order History */}
          <h3>Order History</h3>
          <ListGroup>
            {orders.length > 0 ? (
              orders.map((order) => (
                <ListGroup.Item key={order._id}>
                  <h5>Order ID: {order._id}</h5>
                  <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
                  <p>
                    Order Date: {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                  <ul>
                    {order.items.map((product) => (
                      <li key={product._id}>
                        {product.name} - ${product.price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </ListGroup.Item>
              ))
            ) : (
              <p>No orders found.</p>
            )}
          </ListGroup>
        </Container>
      </div>
    </div>
  );
};

export default ProfilePage;
