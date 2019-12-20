import React from "react";
import "./Content.scss";

function Content({ data }) {
    return (
        <main role="main">
            <section>
                <h1>Featured Movies</h1>
                <div>{data.featured}</div>
            </section>
            <section>
                <h1>Your Watchlist</h1>
                <div>{data.moviesWatched}</div>
            </section>
        </main>
    );
}

export default Content;
