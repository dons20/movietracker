import React from "react";
import "./MovieCard.scss";

function MovieCard({ image, title, rating, date }) {
    const year = parseInt(date.substring(0, 4));

    return (
        <div className="movieCard">
            <div className="splash">
                <img src={image} alt={`Cover art for ${title}`} />
            </div>
            <div>
                <div className="title">{title}</div>
            </div>
            <div>
                <div className="rating">{rating} / 10</div>
                <div className="year">{year}</div>
            </div>
        </div>
    );
}

export default MovieCard;
