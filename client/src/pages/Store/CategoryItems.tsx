import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StoreItem from "../../components/StoreItems";
import styles from "./store.module.css";
import { Col, Row, Container } from "react-bootstrap";

type Product = {
  id: number;
  title: string;
  price: string;
  description: string;
  image: string;
  mainCategory: string;
  subCategory: string;
  User: string; // User (author) information
  email: string | null; // Email (nullable if no user found)
};

const CategoryItems: React.FC = () => {
  const { mainCategory, subCategory } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const safeMainCategory = encodeURIComponent(mainCategory || "");
  const safeSubCategory = encodeURIComponent(subCategory || "");

  useEffect(() => {
    // Fetch data from the database using mainCategory and subCategory
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/products?mainCategory=${safeMainCategory}&subCategory=${safeSubCategory}`
        );
        const data = await response.json();
        setProducts(data); // Assuming data has the correct structure for Product type
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [safeMainCategory, safeSubCategory]);

  return (
    <div>
        <h2>{mainCategory} - {subCategory}</h2>
    
    <div className={styles.onepage}>
      <Container fluid>
        <Row md={2} xs={1} lg={4} className="g-4">
          {products.length > 0 ? (
            products.map((product) => (
              <Col key={product.id}>
                <StoreItem
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  image={product.image} // Ensure this is the correct format
                  description={product.description}
                  mainCategory={product.mainCategory}
                  subCategory={product.subCategory}
                  User={product.User} // Seller (author)
                  email={product.email} // Seller email (nullable)
                />
              </Col>
            ))
          ) : (
            <p>No products found for this category.</p>
          )}
        </Row>
      </Container>
    </div>
    </div>
  );
};

export default CategoryItems;
