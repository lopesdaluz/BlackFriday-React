import React from "react";
import "../Styles/Category.css";

const CategoryComponent = ({
  category,
  onClick,
  searchQuery,
  handleserachChange,
}) => {
  return (
    <div>
      <h2>{category}</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={handleserachChange}
        placeholder="search..."
        className="search-bar"
      ></input>
      <button onClick={onClick}>View Art</button>
    </div>
  );
};

export default CategoryComponent;
