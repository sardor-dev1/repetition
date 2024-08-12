import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../store/CartSlice";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "./index.scss"

const Index = () => {
  const dispatch = useDispatch();
  const { carts, loading, error } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    const productId = localStorage.getItem("cart");
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="pb-3">
        <button
          className="px-2 py-1 border-solid border-[1.5px] border-black rounded-md"
          onClick={() => navigate("/")}
        >
          « Back
        </button>
      </div>
      <div className="products">
        {carts.map((product) => (
          <div className="products__card">
            <Card key={product.id} sx={{ maxWidth: 345, boxShadow: 3 }}>
              <CardMedia
                component="img"
                image={product.image_url}
                alt={product.name}
                sx={{
                  objectFit: "contain",
                  height: "240px",
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Brand: {product.brand_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantity: {product.quantity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantity: {product.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  sx={{
                    backgroundColor: "#f5f5f5",
                    outline: "2px solid red",
                    color: "red",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "red",
                      color: "white",
                    },
                  }}
                  size="small"
                  color="secondary"
                >
                  Remove Cart
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
