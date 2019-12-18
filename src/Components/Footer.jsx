import React from "react";
import "./Footer.scss";
import tmdb from "../movie-db-logo-light.svg";

function Footer() {
    return (
        <footer className="footer">
            <div>Copyright &copy; {new Date().getFullYear()} Keno Clayton</div>
            <sub>
                <a href="https://www.themoviedb.org" rel="noopener noreferrer" target="_blank">
                    <img src={tmdb} alt="TMDB logo" className="tmdb" />
                </a>
                This product uses the TMDb API but is not endorsed or certified by TMDb.
            </sub>
        </footer>
    );
}

export default Footer;
