import React from "react";
import { Link } from "react-router-dom";

function HomePage({ data }) {
    return (
        <>
            <section>
                <h1>Featured Movies</h1>
                <div>{data.featured}</div>
            </section>
            <section>
                <h1>Your Watchlist</h1>
                <div>{data.moviesWatched}</div>
            </section>
            <Link to="/search">Advanced Search ➡</Link>
        </>
    );
}

export default HomePage;
