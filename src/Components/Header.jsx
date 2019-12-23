import React from "react";
import { useHistory } from "react-router-dom";
import SearchBar from "./SearchBar";
import "./Header.scss";

function Header() {
    const history = useHistory();

    return (
        <header className="header">
            <h2 className="headerTitle" onClick={() => history.push("/")}>
                Movie Lovers Watchlist
            </h2>
            <SearchBar />
        </header>
    );
}

export default Header;
