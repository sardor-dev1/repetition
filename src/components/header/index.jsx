import "./style.scss";

const index = ({ setSortBy, sortBy }) => {
  return (
    <header>
      <nav>
        <div className="text-black rounded-sm">
          <select
            className="rounded-sm p-1 outline-none cursor-pointer"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">none</option>
            <option value="cheap">cheap</option>
            <option value="expensive">expensive</option>
          </select>
        </div>
      </nav>
    </header>
  );
};

export default index;
