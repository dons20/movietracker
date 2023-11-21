import React from "react";
import { useNavigate } from "react-router-dom";
import "./MovieCard.scss";

function MovieCard({ id, image, title, rating, date }) {
    const year = date ? parseInt(date.substring(0, 4)) : "unknown";
    const navigate = useNavigate();

    return (
        <div className="movieCard" onClick={() => navigate(`movie/${id}`)}>
            <div className="splash">
                <img src={image} alt={`Cover art for ${title}`} loading="lazy" width={300} />
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
