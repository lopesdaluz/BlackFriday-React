import React from "react";
import "../Styles/Category.css";

const CategoryComponent = ({
  category,
  onClick,
  searchQuery,
  handleSearchChange,
}) => {
  return (
    <div>
      <h2>{category}</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="search..."
        className="search-bar"
      ></input>
      <button onClick={onClick}>View Art</button>
    </div>
  );
};

export default CategoryComponent;
