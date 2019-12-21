import React, { useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import "./SearchPage.scss";

function SearchPage({ data }) {
    const [showFilters, setShowFilters] = useState(false);

    return (
        <>
            <header className="searchHeader">
                <Link to="/">⬅ Back</Link>
                <h2 className="title">Search</h2>
                <div className="showFilters" onClick={() => setShowFilters(!showFilters)}>
                    Advanced Filters
                </div>
            </header>
            {showFilters && (
                <form className="filters show">
                    <label>
                        Search By:
                        <select defaultChecked={1}>
                            <option value="Actor">Actor</option>
                            <option value="Publisher">Publisher/Director</option>
                            <option value="Genre">Genre</option>
                        </select>
                    </label>
                </form>
            )}
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
