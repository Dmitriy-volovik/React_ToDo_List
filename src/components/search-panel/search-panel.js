import React from "react";
import "./search-panel.css";

const SearchPanel = ({ onSort }) => {
  const searchText = "type something";
  return (
    <input
      className="form-control search-input"
      placeholder={searchText}
      onChange={onSort}
    />
  );
};

export default SearchPanel;
