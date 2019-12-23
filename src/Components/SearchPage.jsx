import React, { useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import styles from "./SearchPage.module.scss";
import axios from "axios";

function SearchPage({ data, config, errorDisplay }) {
    const [showFilters, setShowFilters] = useState(false);
    const [searchType, setSearchType] = useState("Title");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchData, setSearchData] = useState({});

    const path = config.images ? `${config.images.base_url}w300/` : null;

    const handleSearchSubmit = e => {
        e.preventDefault();
        if (searchType === "Title") {
            axios({
                method: "post",
                url: "/api/search/",
                data: {
                    query: searchQuery,
                    type: "title",
                    page: 1
                }
            })
                .then(result => setSearchData(result.data.results))
                .catch(e => {
                    errorDisplay.addNotification({
                        title: "An error has occured!",
                        message: e.toString(),
                        type: "danger",
                        insert: "bottom",
                        container: "bottom-center",
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 3000,
                            onScreen: true
                        }
                    });
                });
        } else if (searchType === "Actor") {
        } else if (searchType === "Publisher") {
        } else if (searchType === "Genre") {
        }
    };

    return (
        <>
            <header className={styles.header}>
                <Link to="/">⬅ Back</Link>
                <h2 className="title">Search</h2>
                <div className={styles.showFilters} onClick={() => setShowFilters(!showFilters)}>
                    {showFilters ? "Close" : "Advanced Filters"}
                </div>
            </header>
            {showFilters && (
                <form className={`${styles.filters} ${styles.show}`}>
                    <label>
                        <span>Search By:</span>
                        <select defaultChecked={1} onChange={e => setSearchType(e.target.value)} value={searchType}>
                            <option value="Title">Movie Title</option>
                            <option value="Actor">Actor</option>
                            <option value="Publisher">Publisher/Director</option>
                            <option value="Genre">Genre</option>
                        </select>
                    </label>
                </form>
            )}
            <form onSubmit={handleSearchSubmit}>
                <label className={styles.search}>
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Start searching..."
                        autoComplete="off"
                        required
                    />
                    <button type="submit">
                        <span role="img" aria-label="Search Icon">
                            🔍
                        </span>
                    </button>
                </label>
            </form>
            {searchData && searchData.length > 0 && (
                <>
                    <h3>Results</h3>
                    <div className={styles.searchResults}>
                        {searchData.map(m => (
                            <MovieCard
                                image={`${path}${m.poster_path}`}
                                title={m.title}
                                rating={m.vote_average}
                                summary={m.overview}
                                date={m.release_date}
                                id={m.id}
                                key={m.id}
                            />
                        ))}
                    </div>
                </>
            )}
        </>
    );
}

export default SearchPage;
