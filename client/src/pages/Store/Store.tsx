import storeItems from "../../data/items.json";
import React from "react";
import { Col, Row } from "react-bootstrap";
import StoreItem from "../../components/StoreItem";

export class Store extends React.Component {
  render() {
    return (
      <div>
        <h1>Store</h1>
        <Row md={2} xs={1} lg={3} className="g-3">
          {storeItems.map((item) => (
            <Col key={item.id}>
              <StoreItem {...item} />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default Store;
