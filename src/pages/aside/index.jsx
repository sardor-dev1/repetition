import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../context/Context";

export default function index({
  selectedBrand,
  setSelectedBrand,
  setSelectedColor,
  selectedColor,
}) {
  const [colorLoading, setColorLoading] = useState(false);
  const [brandLoading, setBrandLoading] = useState(false);
  const [error, setError] = useState(null);

  const { state, dispatch } = useContext(Context);
  const { colors, brands } = state;

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
    <div className="px-3">
      <div className="border-b-2 py-3">
        <h2 className="text-center font-semibold text-[18px]">Brands</h2>
        <ul className="flex flex-col gap-1">
          {brands?.map((brand) => (
            <li key={`${brand.id}`} className="list-none ">
              <input
                className="mr-1 cursor-pointer"
                type="radio"
                name={"brand"}
                id={brand}
                onChange={() => setSelectedBrand(brand)}
                checked={selectedBrand === brand}
              />
              <label htmlFor={brand}>{brand}</label>
            </li>
          ))}
        </ul>
        <div className="w-full flex justify-center py-2">
          <button
            className="py-1 px-2 border-black border-[1.5px] rounded-md border-solid"
            onClick={() => setSelectedBrand("")}
          >
            Reset
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-center font-semibold text-[18px]">Colors</h2>
        <ul className="">
          {colors.map((color) => {
            return (
              <li
                key={`${color.id}`}
                className="list-none float-start m-1 gap-[1rem]"
              >
                <button
                  onClick={() => setSelectedColor(color)}
                  className="border-solid h-[20px] w-[20px] border-[1px] border-black rounded-full bg-[#f5f5f5]"
                  style={{
                    backgroundColor: color,
                    outline: selectedColor === color ? "2px solid red" : "",
                  }}
                ></button>
              </li>
            );
          })}
        </ul>
        <div className="flex w-full px-2 justify-center">
          <button
            className="py-1 px-2 border-[1.5px] rounded-md border-black border-solid"
            onClick={() => setSelectedColor("")}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
