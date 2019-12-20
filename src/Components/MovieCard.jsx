import React from "react";
import "./MovieCard.scss";

function MovieCard({ image, title, rating, summary, year }) {
    return (
        <div className="movieCard">
            <div className="splash">
                <img src={image} alt={`Cover art for ${title}`} />
            </div>
            <div>
                <div className="title"></div>
                <div className="summary">{summary}</div>
            </div>
            <div>
                <div className="rating">{rating} / 10</div>
                <div className="year">{year}</div>
            </div>
        </div>
    );
}

export default MovieCard;
