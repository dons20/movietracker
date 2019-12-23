import React from "react";
import { useHistory } from "react-router-dom";
import "./MovieCard.scss";

function MovieCard({ id, image, title, rating, date }) {
    const year = parseInt(date.substring(0, 4));
    const history = useHistory();

    return (
        <div className="movieCard" onClick={() => history.push(`/movie/${id}`)}>
            <div className="splash">
                <img src={image} alt={`Cover art for ${title}`} />
            </div>
            <div className="movieTitle">
                <div>{title}</div>
            </div>
            <div className="movieEtc">
                <div className="movieYear">({year})</div>
                <div className="rating">
                    <span role="img" aria-label="star">
                        ⭐
                    </span>
                    {rating} / 10
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
