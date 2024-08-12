import { useState } from "react";
import "./style.scss";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { useNavigate } from "react-router-dom";

const index = ({ setSortBy, sortBy, searchBy, setSearchBy }) => {
  const navigate = useNavigate();
  return (
    <header className="w-full">
      <nav className="flex justify-between items-center">
        <div className="text-black rounded-sm">
          <select
            className="rounded-md p-1 outline-none cursor-pointer border-[1.5px] border-solid border-gray-500 "
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">none</option>
            <option value="cheap">cheap</option>
            <option value="expensive">expensive</option>
          </select>
        </div>
        <div className="flex items-center gap-5">
          <div onClick={()=>navigate("/cart")}>
            <AddShoppingCartOutlinedIcon className="text-gray-500 cursor-pointer" />
          </div>
          <input
            onChange={(event) => setSearchBy(event.target.value)}
            value={searchBy}
            type="text"
            placeholder="Search..."
            className="border-solid border-gray-400 rounded-md outline-none text-black border-[1.5px] px-2 py-1"
          />
        </div>
      </nav>
    </header>
  );
};

export default index;
