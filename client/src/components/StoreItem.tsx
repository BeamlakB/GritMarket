import React from 'react';
import { Card } from 'react-bootstrap';
type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

const StoreItem: React.FC<StoreItemProps> = ({ id, name, price, imgUrl }) => {
  return (
    <div>
      <Card>
        <Card.Img variant='top' src= {imgUrl} height= "200px" style={{objectFit:"cover"}} />
      </Card>
    </div>
  );
};

export default StoreItem;
