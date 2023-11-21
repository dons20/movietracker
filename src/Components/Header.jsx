import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import "./Header.scss";

function Header() {
    const navigate = useNavigate();

    return (
        <header className="header">
            <h2 className="headerTitle" onClick={() => navigate(".")}>
                Movie Lovers Watchlist
            </h2>
            <SearchBar />
        </header>
    );
}

export default Header;
