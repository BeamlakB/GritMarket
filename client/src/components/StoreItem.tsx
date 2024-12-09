import React, {useEffect} from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type StoreItemProps = {
  
  name: string;
  price: string;
  description: string;
  image: string[];
  id: number;
};

const StoreItem: React.FC<StoreItemProps> = ({ name, price, image, id }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/item/${id}`); // Navigate to the item details page
  };
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <Card
      className="h-100"
      style={{ width: "18rem", margin: "10px", cursor: "pointer" }}
      onClick={handleCardClick} // Navigate on card click
    >
      <Card.Img
        variant="top"
        src={image[0]}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">${price}</span>
        </Card.Title>
        <div className="mt-auto">
          <Button
            variant="primary"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the card click
              navigate(`/item/${id}`);
            }}
          >
           Contact Seller 
          </Button>
          
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
