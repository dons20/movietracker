import React, { useState, useEffect, Suspense, useRef } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { Link } from "react-router-dom";
import axios from "axios";
import "./HomePage.scss";

const MovieCard = React.lazy(() => import("./MovieCard"));

function HomePage({ config, data }) {
    const [featured, setFeatured] = useState(JSON.parse(sessionStorage.getItem("discoverResults")) || null);
    const [maxPages, setMaxPages] = useState(parseInt(sessionStorage.getItem("discoverPages")) || 0);
    const [discoverPage, setDiscoverPage] = useState(1);
    const lastPage = useRef(0);
    const loaded = useRef(false);

    const path = config.images ? `${config.images.secure_base_url}w300/` : null;

    /**
     * Set the max number of pages that can be loaded
     */
    useEffect(() => {
        async function getMaxPages() {
            await axios({
                method: "post",
                url: "api/discover/",
                data: {
                    page: 0
                }
            })
                .then(r => {
                    if (r.data.total_pages) {
                        setMaxPages(r.data.total_pages);
                        sessionStorage.setItem("discoverPages", r.data.total_pages);
                    }
                    if (r.data.results) {
                        setFeatured(r.data.results);
                        sessionStorage.setItem("discoverResults", JSON.stringify([r.data.results]));
                    }
                    loaded.current = true;
                })
                .catch(e => console.error(e));
        }
        if (!loaded.current && maxPages === 0) getMaxPages();
        else loaded.current = true;
    }, [loaded, maxPages]);

    /**
     * Loads new pages from the discover section
     */
    useEffect(() => {
        async function getResult() {
            let discoverResults = JSON.parse(sessionStorage.getItem("discoverResults"));
            //Check session for cached results
            if (discoverResults && discoverResults[discoverPage - 1]) {
                setFeatured(discoverResults[discoverPage - 1]);
            } else if (discoverPage !== lastPage.current) {
                await axios({
                    method: "post",
                    url: "api/discover/",
                    data: {
                        page: discoverPage
                    }
                })
                    .then(r => {
                        if (r.data.results) {
                            setFeatured(r.data.results);
                        }
                    })
                    .catch(e => console.error(e));
            }
            lastPage.current = discoverPage;
        }
        if (loaded.current) getResult();
    }, [discoverPage, loaded]);

    /**
     * Syncs the session with loaded data for caching
     */
    useEffect(() => {
        if (maxPages > 0) {
            let discoverPages = JSON.parse(sessionStorage.getItem("discoverPages"));
            if (!discoverPages) sessionStorage.setItem("discoverPages", maxPages);
        }

        if (featured && featured[0]) {
            let discoverResults = JSON.parse(sessionStorage.getItem("discoverResults"));
            //Check if latest loaded page is in session storage
            if (discoverResults && !discoverResults[discoverPage - 1] && lastPage.current === discoverPage) {
                discoverResults.push(featured);
                sessionStorage.setItem("discoverResults", JSON.stringify(discoverResults));
            } else if (!discoverResults) {
                sessionStorage.setItem("discoverResults", JSON.stringify([featured]));
            }
        }
    }, [featured, maxPages, discoverPage]);

    return (
        <>
            <section>
                <h1>Your Watchlist</h1>
                <div className="watchedContainer">
                    {data &&
                        data[0] &&
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
                            featured[0] &&
                            featured.map((x, y) => (
                                <MovieCard
                                    image={`${path}${x.poster_path}`}
                                    title={x.original_title}
                                    rating={x.vote_average}
                                    date={x.release_date}
                                    id={x.id}
                                    key={y * 2}
                                />
                            ))}
                    </Suspense>
                </div>
                <button
                    onClick={() => {
                        if (discoverPage > 1) setDiscoverPage(discoverPage - 1);
                    }}
                >
                    Previous Page
                </button>
                <button
                    onClick={() => {
                        if (discoverPage < maxPages) setDiscoverPage(discoverPage + 1);
                    }}
                >
                    Next Page
                </button>
            </section>

            <br />
            <Link to="search">Advanced Search ➡</Link>
        </>
    );
}

export default HomePage;
