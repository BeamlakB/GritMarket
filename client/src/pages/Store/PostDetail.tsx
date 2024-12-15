import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Product = {
  id: number;
  title: string;
  price: string;
  description: string;
  image: string;
  mainCategory: string;
  subCategory: string;
  User: string; // Seller (author)
  email: string | null; // Seller email (nullable)
};

const ProductDetail: React.FC = () => {
  const { id } = useParams(); // Retrieve product id from the URL
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (id) {
      fetchProductDetail();
    }
  }, [id]);

  if (!product) {
    return <h2>Item not found</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} style={{ width: "300px" }} />
      <h3>Price: ${product.price}</h3>
      <p>{product.description}</p>
      <p>
        <strong>Category:</strong> {product.mainCategory} - {product.subCategory}
      </p>
      <p>
        <strong>Seller:</strong> {product.User} <br />
        <strong>Email:</strong> {product.email || "Not available"}
      </p>
    </div>
  );
};

export default ProductDetail;
