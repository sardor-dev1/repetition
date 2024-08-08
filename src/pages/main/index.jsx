// MUI
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// ----------------------------------------------------------------
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";

import "./index.scss";
export default function index({ selectedBrand, selectedColor, sortBy }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    state: { products },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);

      let query = `https://headphones-server.onrender.com/products`;

      let params = [];

      if (selectedBrand) {
        params.push(`brand_name=${encodeURIComponent(selectedBrand)}`);
      }

      if (selectedColor) {
        params.push(`color_options_like=${encodeURIComponent(selectedColor)}`);
      }

      if (params.length > 0) {
        query += `?${params.join("&")}`;
      }

      try {
        const response = await fetch(query);
        const data = await response.json();
        dispatch({ type: "FETCH_PRODUCTS", payload: data });
      } catch (error) {
        setError(error.massage);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [selectedBrand, selectedColor, sortBy]);

  const sortedProducts = [...products].sort((p1, p2) => {
    if (sortBy === "cheep") {
      return p1.price - p2.price;
    }
    if (sortBy === "expensive") {
      return p2.price - p1.price;
    }
    return 0;
  });

  return (
    <div className="">
      {loading && <p>Loading products...</p>}
      <ul className="products">
        {sortedProducts.map((p) => (
          <li className="products__card" key={p.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                image={p.image_url}
                alt={p.name}
                sx={{
                  objectFit: "contain",
                  height: "240px",
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {p.name}
                </Typography>
                <div className="flex flex-col gap-1 pb-2">
                  <Typography variant="body2" color="text.secondary">
                    {p.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: {p.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Brand: {p.brand_name}
                  </Typography>
                </div>
                <ul className="flex gap-1">
                  {p.color_options.map((color, index) => (
                    <li
                      key={index}
                      className="w-[20px] h-[20px] rounded-full border-[1px] border-solid border-black"
                      style={{ background: color }}
                    ></li>
                  ))}
                </ul>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </li>
        ))}
      </ul>
      <div></div>
    </div>
  );
}
