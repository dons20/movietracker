import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Ratings from "react-ratings-declarative";
import axios from "axios";
import styles from "./MoviePage.module.scss";

function MoviePage({ data, errorDisplay }) {
    const { id } = useParams();
    const [movieData, setMovieData] = useState({});
    const [rating, setRating] = useState(4);

    useEffect(() => {
        axios({
            method: "post",
            url: "/api/search/",
            data: {
                movie_id: id,
                type: "movie"
            }
        })
            .then(r => setMovieData(r.data))
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
    }, [errorDisplay, id]);

    const changeRating = rating => {
        if (window.confirm(`Do you want to rate this move ${rating} stars? (Cannot be undone)`)) {
            setRating(rating);
            axios({
                method: "post",
                url: "/api/store/",
                data: {
                    id: id,
                    title: movieData.title,
                    rating: rating,
                    date: movieData.release_date,
                    image: movieData.poster_path
                }
            });
        }
    };

    return (
        <div className={styles.container}>
            {movieData && (
                <>
                    <div className="title">{movieData.title}</div>
                    <div className="date">{movieData.release_date}</div>
                    <div className="rating">{movieData.vote_average}</div>
                    <div className="userRating">
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
    );
}

export default MoviePage;
