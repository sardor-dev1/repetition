import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(
          `https://headphones-server.onrender.com/products/${id}`
        );
        const product = await response.json();
        setProduct(product);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>Error loading product: {error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image_url} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <p>Brand: {product.brand_name}</p>
      <ul>
        {product.color_options.map((color, index) => (
          <li
            key={index}
            style={{
              width: "20px",
              height: "20px",
              background: color,
              borderRadius: "50%",
              display: "inline-block",
              margin: "5px",
            }}
          ></li>
        ))}
      </ul>
    </div>
  );
}

export default ProductDetail;
