import React, { useState } from "react";
import axios from "axios";
import "./SearchBar.scss";

function SearchBar({ setData }) {
    const API_PATH = "/api";
    const [isOpen, setOpen] = useState(false);

    const handleFormSubmit = e => {
        e.preventDefault();
        axios({
            method: "post",
            url: API_PATH,
            headers: { "content-type": "application/json" },
            data: "123"
        }).then(result => {
            if (result.status === 200) {
                setData(result.data);
            }
        });
    };

    return (
        <div className={`searchbar ${isOpen ? "open" : ""}`}>
            <span className="searchButton" onClick={() => setOpen(!isOpen)}>
                <span className="searchIcon"></span>
            </span>
            <form action="/api/search" method="post" onSubmit={handleFormSubmit}>
                <input
                    type="search"
                    id="searchbox"
                    name="searchbox"
                    className="searchbox"
                    placeholder="Search movies..."
                    aria-label="Search movie database"
                />
            </form>
        </div>
    );
}

export default SearchBar;
