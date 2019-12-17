import React from "react";
import "./SearchBar.scss";

function SearchBar() {
    return (
        <div className="searchbar">
            <label htmlFor="searchbar">
                <span role="img" aria-label="Search Icon">
                    🔎
                </span>
            </label>
            <input type="text" id="searchbar" name="searchbar" />
        </div>
    );
}

export default SearchBar;
