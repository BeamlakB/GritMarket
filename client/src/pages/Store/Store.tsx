import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import StoreItem from "../../components/StoreItem";
//import storeItems from "../../data/Fashion.json";
import storeItems1 from "../../data/Fashion.json";
import storeItems2 from "../../data/electronicdata.json";
import storeItems3 from "../../data/ticketsdata.json";
import storeItems4 from "../../data/toydata.json";
import styles from "./store.module.css"

type StoreProps = {
  destination: string; // Determines which JSON file to render
};
type StoreItemProps = {
  
  name: string;
  price: string;
  description: string;
  image: string[];
  id: number;
};

export const Store: React.FC<StoreProps> = ({ destination }) => {
  let storeItems: StoreItemProps[] = [];;
  let destinationClass;
  
  // Determine the data and class based on the destination
  switch (destination) {
    case "fashion":
      storeItems = storeItems1;
      destinationClass = styles.fashion;
      break;
    case "electronics":
      storeItems = storeItems2;
      destinationClass = styles.electronics;
      break;
    case "tickets":
      storeItems = storeItems3;
      destinationClass = styles.books;
      break;
    case "toys":
      storeItems = storeItems4;
      destinationClass = styles.food;
      break;
    default:
      storeItems = [];
      destinationClass = styles.default;
  }

  return (
    <div className={`${styles.onepage} ${destinationClass}`}>
      <Container fluid>
        <Row md={2} xs={1} lg={4} className="g-4">
          {storeItems.map((item) => (
            <Col key={item.id}>
              <StoreItem {...item} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Store;