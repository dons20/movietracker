import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MovieCard from "./MovieCard";
import "./HomePage.scss";

function HomePage({ config, data }) {
    const [featured, setFeatured] = useState();

    const path = `${config.images.base_url}w300/`;

    useEffect(() => {
        async function getResult() {
            const result = await axios({
                method: "post",
                url: "/api/discover/"
            }).then(r => r.data.results);
            setFeatured(result);
        }
        getResult();
    }, []);

    return (
        <>
            <section>
                <h1>Featured Movies</h1>
                <div className="featuredContainer">
                    {featured &&
                        featured.length > 0 &&
                        featured.map(x => (
                            <MovieCard
                                image={`${path}${x.poster_path}`}
                                title={x.original_title}
                                rating={x.vote_average}
                                date={x.release_date}
                                key={x.id}
                            />
                        ))}
                </div>
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
