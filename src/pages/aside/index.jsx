import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../context/Context";

export default function index() {
  const [colorLoading, setColorLoading] = useState(false);
  const [brandLoading, setBrandLoading] = useState(false);
  const [error, setError] = useState(null);

  const { state, dispatch } = useContext(Context);
  const { colors, brands } = state;
  const [activeColor, setActiveColor] = useState("");

  useEffect(() => {
    async function fetchBrands() {
      setBrandLoading(true);
      try {
        const response = await fetch(
          "https://headphones-server.onrender.com/brands"
        );

        if (!response.ok) {
          throw new Error("Error fetching colors");
        }

        const data = await response.json();
        dispatch({ type: "FETCH_BRANDS", payload: data });
      } catch (error) {
        setError(error.message);
      } finally {
        setBrandLoading(false);
      }
    }

    fetchBrands();
  }, []);

  useEffect(() => {
    async function fetchColors() {
      setColorLoading(true);
      try {
        const response = await fetch(
          "https://headphones-server.onrender.com/colors"
        );

        if (!response.ok) {
          throw new Error("Error fetching colors");
        }

        const data = await response.json();
        dispatch({ type: "FETCH_COLORS", payload: data });
      } catch (error) {
        setError(error.message);
      } finally {
        setColorLoading(false);
      }
    }

    fetchColors();
  }, []);
  return (
    <div className="grid col-span-2 max-w-[100%] min-w-[300px] border-solid border-[1.5px] border-black">
      <div>
        <h2>Brands</h2>
        {brandLoading ? (
          <div>Loading...</div>
        ) : (
          brands.map((brand, index) => (
            <li key={index} className="list-none">
              {brand}
            </li>
          ))
        )}
      </div>
      <div>
        <h2>Colors</h2>
        <ul className="px-[30px]">
          {colors.map((color, index) => {
            return (
              <li key={index} className="list-none float-start m-1 gap-[1rem]">
                <button
                  onClick={() => setActiveColor(color)}
                  className="border-solid h-[20px] w-[20px] border-[1px] border-black rounded-full bg-[#f5f5f5]"
                  style={{
                    backgroundColor: color,
                    outline: activeColor === color ? "2px solid red" : "",
                  }}
                ></button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
