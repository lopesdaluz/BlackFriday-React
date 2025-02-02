import React from "react";

const CategoryComponent = ({ category, onClick }) => {
  return (
    <div>
      <h2>{category}</h2>
      <button onClick={onClick}>View Art</button>
    </div>
  );
};

export default CategoryComponent;
