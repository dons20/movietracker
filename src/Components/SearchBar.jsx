import React, { useState, useEffect } from "react";
import useDebounce from "./useDebounce";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./SearchBar.module.scss";

function SearchBar({ setData }) {
    const API_PATH = "/api/search/";
    const MAX_SUGGESTIONS = 5;

    /**
     * State Variables
     */
    const [page] = useState(1);
    const [isOpen, setOpen] = useState(false);
    const [focused, setFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const debouncedSearchTerm = useDebounce(searchQuery, 500);

    /**
     * Handles the submission of the search box
     * @param {HTMLElement} e Input that was triggered
     */
    const handleSearchSubmit = async e => {
        e.preventDefault();
        axios({
            method: "post",
            url: API_PATH,
            data: {
                page: 1,
                query: searchQuery,
                type: "title"
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
            return axios({
                method: "post",
                url: API_PATH,
                data: {
                    page: page,
                    query: search,
                    type: "keyword"
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
                if (Object.entries(data).length > 0) setSuggestions(data.results.map(r => r.name)); //setSuggestions(data.results);
            });
        } else {
            setSuggestions([]);
        }
    }, [debouncedSearchTerm, page]);

    return (
        <div className={`${styles.searchbar} ${isOpen ? styles.open : ""}`}>
            <span className={styles.searchButton} onClick={() => setOpen(!isOpen)}>
                <span className={styles.searchIcon}></span>
            </span>
            {isOpen && (
                <form action="/api/search" method="post" onSubmit={handleSearchSubmit}>
                    <input
                        type="search"
                        id="searchbox"
                        name="searchbox"
                        className={`${styles.searchbox}`}
                        value={searchQuery}
                        onFocus={() => setFocused(true)}
                        onChange={e => {
                            setSearchQuery(e.target.value);
                        }}
                        placeholder="Search movies..."
                        autoComplete="off"
                        aria-label="Search movie database"
                        onBlur={() => {
                            setTimeout(() => setFocused(false), 100);
                        }}
                        required
                    />
                </form>
            )}

            {suggestions && focused && (
                <ul className={styles.suggestions}>
                    {suggestions.length === 0 && searchQuery && !isSearching && (
                        <div className={styles.suggestedItem}>No results found...</div>
                    )}
                    {isSearching && <div className={styles.suggestedItem}>Searching ...</div>}
                    {suggestions[0] &&
                        suggestions.map((s, i) =>
                            i < MAX_SUGGESTIONS ? (
                                <div key={i} className={styles.suggestedItem} onClick={() => setSearchQuery(s)}>
                                    {s}
                                </div>
                            ) : null
                        )}
                    <Link className={styles.advancedItem} to="/search">
                        Advanced Search...
                    </Link>
                </ul>
            )}
        </div>
    );
}

export default SearchBar;
