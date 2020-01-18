import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Ratings from "react-ratings-declarative";
import axios from "axios";
import styles from "./MoviePage.module.scss";

function MoviePage({ config, data, errorDisplay }) {
    const { id } = useParams();
    const [movieData, setMovieData] = useState({});
    const [rating, setRating] = useState(0);

    const path = config.images ? `${config.images.secure_base_url}w500/` : null;

    useEffect(() => {
        axios({
            method: "post",
            url: "api/search/",
            data: {
                movie_id: id,
                type: "movie"
            }
        })
            .then(r => setMovieData(r.data))
            .catch(e => {
                console.error(e.response.data.error.message);
                errorDisplay.addNotification({
                    title: "An error has occured!",
                    message:
                        "Refresh the page to try again or try again later. Details have been logged to the console.",
                    type: "danger",
                    insert: "bottom",
                    width: 300,
                    container: "bottom-center",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 3000,
                        onScreen: true,
                        pauseOnHover: true
                    },
                    slidingExit: {
                        timingFunction: "ease-in-out"
                    }
                });
            });
    }, [errorDisplay, id]);

    const changeRating = rating => {
        if (window.confirm(`Do you want to rate this move ${rating} stars? (Cannot be undone)`)) {
            setRating(rating);
            /*axios({
                method: "post",
                url: "/api/store/",
                data: {
                    id: id,
                    title: movieData.title,
                    rating: rating,
                    date: movieData.release_date,
                    image: movieData.poster_path
                }
            }).catch(e => {
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
            });*/
        }
    };

    return (
        <>
            <Link to="">⬅ Back</Link>
            <div className={styles.container}>
                {movieData && Object.keys(movieData).length > 0 && (
                    <>
                        <div className={styles.image}>
                            <img src={`${path}${movieData.poster_path}`} alt={`Poster for ${movieData.title}`} />
                        </div>
                        <div className={styles.title}>{movieData.title}</div>
                        <div className={styles.date}>{movieData.release_date.substr(0, 4)}</div>
                        <div className={styles.rating}>IMDb Rating: {movieData.vote_average} / 10</div>
                        <div className={styles.userRating}>
                            Personal Rating: &nbsp;
                            <Ratings
                                rating={data.rating || rating}
                                changeRating={changeRating}
                                name="rating"
                                widgetRatedColors="gold"
                                widgetDimensions="30px"
                                widgetSpacings="5px"
                            >
                                <Ratings.Widget />
                                <Ratings.Widget />
                                <Ratings.Widget />
                                <Ratings.Widget />
                                <Ratings.Widget />
                                <Ratings.Widget />
                                <Ratings.Widget />
                                <Ratings.Widget />
                                <Ratings.Widget />
                                <Ratings.Widget />
                            </Ratings>
                        </div>
                        {movieData.homepage && (
                            <div className="homepage">
                                <a href={movieData.homepage}>Movie Homepage</a>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

export default MoviePage;
