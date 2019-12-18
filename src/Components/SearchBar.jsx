import React, { useState } from "react";
import "./SearchBar.scss";

function SearchBar() {
    const [isOpen, setOpen] = useState(false);

    return (
        <div className={`searchbar ${isOpen ? "open" : ""}`}>
            <span className="searchButton" onClick={() => setOpen(!isOpen)}>
                <span className="searchIcon"></span>
            </span>
            <input
                type="search"
                id="searchbox"
                name="searchbox"
                className="searchbox"
                placeholder="Search movies..."
                aria-label="Search movie database"
            />
        </div>
    );
}

export default SearchBar;
