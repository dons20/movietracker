import React, { useState, useEffect } from "react";
import useDebounce from "./useDebounce";
import axios from "axios";
import "./SearchBar.scss";

function SearchBar({ setData }) {
    const API_PATH = "/api/search/";

    /**
     * State Variables
     */
    const [isOpen, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchType, setSearchType] = useState("title");
    const [suggestions, setSuggestions] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const debouncedSearchTerm = useDebounce(searchQuery, 500);

    /**
     * Handles the submission of the search box
     * @param {HTMLElement} e Input that was triggered
     */
    const handleSearchSubmit = e => {
        e.preventDefault();
        setSearchType("title");
        axios({
            method: "post",
            url: API_PATH,
            data: {
                query: searchQuery,
                type: searchType
            }
        })
            .then(result => {
                if (result.status === 200) {
                    console.log(result.data);
                    //const { title,  } = result.data;
                }
            })
            .catch(e => {
                if (e.response) {
                    console.log(e.response.data);
                }
            });
    };

    /**
     * Handles debounced (delayed) searching while the user types, and returns suggestions
     */
    useEffect(() => {
        //Defined function within effect to work with effect dependencies (search)
        const searchCharacters = search => {
            setSearchType("keyword");
            return axios({
                method: "post",
                url: API_PATH,
                data: {
                    query: search,
                    type: searchType
                }
            })
                .then(result => result.data)
                .catch(e => {
                    if (e.response) {
                        console.error(e.response.data);
                    }
                });
        };

        if (debouncedSearchTerm) {
            setIsSearching(true);
            searchCharacters(debouncedSearchTerm).then(data => {
                setIsSearching(false);
                if (data) setSuggestions(data.results.map(r => r.name)); //setSuggestions(data.results);
            });
        } else {
            setSuggestions([]);
        }
    }, [debouncedSearchTerm, searchType]);

    return (
        <div className={`searchbar ${isOpen ? "open" : ""}`}>
            <span className="searchButton" onClick={() => setOpen(!isOpen)}>
                <span className="searchIcon"></span>
            </span>
            <form action="/api/search" method="post" onSubmit={handleSearchSubmit}>
                <input
                    type="search"
                    id="searchbox"
                    name="searchbox"
                    className="searchbox"
                    value={searchQuery}
                    onChange={e => {
                        setSearchQuery(e.target.value);
                    }}
                    placeholder="Search movies..."
                    autoComplete="off"
                    aria-label="Search movie database"
                    required
                />
            </form>
            {isSearching && <div>Searching ...</div>}
            {suggestions && <ul className="suggestions">{suggestions}</ul>}
        </div>
    );
}

export default SearchBar;
