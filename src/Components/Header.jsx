import React from "react";
import SearchBar from "./SearchBar";
import "./Header.scss";

function Header() {
    return (
        <header className="header">
            <h2 className="title">Movie Lovers Watchlist</h2>
            <SearchBar />
        </header>
    );
}

export default Header;
