import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { removeItem, removeAll } from "../../store/CartSlice";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { NotFound } from "@pages";

const index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart);

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleRemoveAll = () => {
    dispatch(removeAll());
  };

  return (
    <>
      <div>
        <div className="cart flex flex-col gap-[30px]">
          {cart.length == 0 ? (
            <NotFound />
          ) : (
            cart.map((item, index) => (
              <div
                key={index}
                className="relative cart__card max-w-[800px] w-full rounded-[10px] px-6 bg-white text-black flex justify-between items-center"
              >
                <div className=" py-1 w-[150px]">
                  <img
                    className="object-contain w-full"
                    src={item.image_url}
                    alt=""
                  />
                </div>
                <h3 className="text-[28px]">{item.name}</h3>
                <p className="text-red-500 text-[24px]">
                  {item.price}
                  <span className="text-orange-500">$</span>
                </p>
                <button
                  className="absolute top-4 duration-3 transition hover:scale-[1.2] right-5"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <Tooltip title="Delete">
                    <RemoveShoppingCartIcon />
                  </Tooltip>
                </button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 ? (
          <div className="flex justify-center py-3">
            <button></button>
            <Button
              onClick={() => handleRemoveAll()}
              variant="contained"
              color="success"
            >
              Remove all
            </Button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default index;
