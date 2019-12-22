import React, { useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import styles from "./SearchPage.module.scss";

function SearchPage({ data }) {
    const [showFilters, setShowFilters] = useState(false);
    const [searchType, setSearchType] = useState("Actor");

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
                            <option value="Actor">Actor</option>
                            <option value="Publisher">Publisher/Director</option>
                            <option value="Genre">Genre</option>
                        </select>
                    </label>
                </form>
            )}
            <label className={styles.search}>
                <input type="search" placeholder="Start searching..." />
                <button type="submit">
                    <span role="img" aria-label="Search Icon">
                        🔍
                    </span>
                </button>
            </label>
            {data && Object.entries(data).length > 0 && (
                <>
                    <h3>Results</h3>
                    {data.map(m => (
                        <MovieCard
                            image={m.poster_path}
                            title={m.title}
                            rating={m.vote_average}
                            summary={m.overview}
                            date={m.release_date}
                        />
                    ))}
                </>
            )}
        </>
    );
}

export default SearchPage;
