import React, { useState, useEffect, Suspense } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { Link } from "react-router-dom";
import axios from "axios";
import "./HomePage.scss";

const MovieCard = React.lazy(() => import("./MovieCard"));

function HomePage({ config, data }) {
    const [featured, setFeatured] = useState({});

    const path = config.images ? `${config.images.secure_base_url}w300/` : null;

    useEffect(() => {
        async function getResult() {
            const result = await axios({
                method: "post",
                url: "api/discover/"
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
                    <Suspense
                        fallback={
                            <div className="pulseContainer">
                                <PulseLoader size={20} margin={5} color="#337ab4" loading={true} />
                            </div>
                        }
                    >
                        {featured &&
                            featured.length > 0 &&
                            featured.map(x => (
                                <MovieCard
                                    image={`${path}${x.poster_path}`}
                                    title={x.original_title}
                                    rating={x.vote_average}
                                    date={x.release_date}
                                    id={x.id}
                                    key={x.id}
                                />
                            ))}
                    </Suspense>
                </div>
            </section>
            <section>
                <h1>Your Watchlist</h1>
                <div className="watchedContainer">
                    {data &&
                        data.length > 0 &&
                        data.map(m => (
                            <MovieCard
                                image={`${path}${m.Image}`}
                                title={m.Title}
                                rating={m.Rating}
                                date={m.Date}
                                id={m.ID}
                                key={m.ID}
                            />
                        ))}
                    {(!data || data.length === 0) && (
                        <span>"Whoops! It looks like you don't have any movies on your watchlist yet..."</span>
                    )}
                </div>
            </section>
            <br />
            <Link to="search">Advanced Search ➡</Link>
        </>
    );
}

export default HomePage;
