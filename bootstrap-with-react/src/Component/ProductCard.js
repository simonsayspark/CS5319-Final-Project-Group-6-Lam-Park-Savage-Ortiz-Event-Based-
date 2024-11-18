import React from "react";
import { Card, Button, Row, Col, Badge, Image } from "react-bootstrap";
import { FiTrash2, FiBookmark, FiMinus, FiPlus } from "react-icons/fi";

const ProductCart = ({ product, quantity, updateQuantity, removeItem }) => {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Row className="align-items-center">
          {/* Product Image */}
          <Col xs={3}>
            <Image
              src="https://via.placeholder.com/100"
              alt={product.name}
              rounded
              className="w-200"
            />
          </Col>

          {/* Product Details */}
          <Col xs={6}>
            <h5 className="mb-1">{product.name}</h5>
            <Badge bg="success" className="mb-2">
              In Stock
            </Badge>
            <p className="text-muted mb-1">{product.brand}</p>
            <Col xs={3} className="text-end">
              <h5 className="mb-2">${(product.price * quantity).toFixed(2)}</h5>
              <div className="d-flex align-items-center justify-content-end">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => updateQuantity(product.name, -1)}
                  disabled={quantity <= 1}
                >
                  <FiMinus />
                </Button>
                <span className="mx-2">{quantity}</span>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => updateQuantity(product.name, 1)}
                >
                  <FiPlus />
                </Button>
              </div>
            </Col>
          </Col>

          {/* Quantity and Price */}

          {/* Actions */}
          <Col xs={12} className="d-flex justify-content-between mt-3">
            <Button
              variant="link"
              className="text-danger"
              onClick={() => removeItem(product._id)}
            >
              <FiTrash2 /> Remove
            </Button>
            <Button variant="link" className="text-secondary">
              <FiBookmark /> Save for later
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ProductCart;
