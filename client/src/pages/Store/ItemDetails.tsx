import React from "react";
import { useParams } from "react-router-dom";
import fashionItems from "../../data/Fashion.json";
import electronicsItems from "../../data/electronicdata.json";
import ticketsItems from "../../data/ticketsdata.json";
import toysItems from "../../data/toydata.json";

type ItemType = {
  name: string;
  price: string;
  description: string;
  image: string[];
  id: number;
};

const ItemDetails: React.FC = () => {
  const { destination, id } = useParams<{ destination: string; id: string }>(); // Get parameters from the URL

  // Determine the correct data file based on the `destination` parameter
  let items: ItemType[] = [];

  switch (destination) {
    case "fashion":
      items = fashionItems;
      break;
    case "electronics":
      items = electronicsItems;
      break;
    case "tickets":
      items = ticketsItems;
      break;
    case "toys":
      items = toysItems;
      break;
    default:
      items = [];
  }

  // Find the specific item based on `id`
  const item = items.find((item: { id: number }) => item.id === parseInt(id || "", 10));

  if (!item) {
    return <h2>Item not found</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{item.name}</h1>
      <img src={item.image[0]} alt={item.name} style={{ width: "300px" }} />
      <h3>Price: ${item.price}</h3>
      <p>{item.description}</p>
    </div>
  );
};

export default ItemDetails;

