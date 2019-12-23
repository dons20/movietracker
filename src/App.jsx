import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import "./App.scss";
import axios from "axios";
import ReactNotification from "react-notifications-component";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const Header = React.lazy(() => import("./Components/Header"));
const Content = React.lazy(() => import("./Components/Content"));
const Footer = React.lazy(() => import("./Components/Footer"));

function App() {
    const [userData, setUserData] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [errorDisplayed, setErrorDisplayed] = useState(false);
    const [maxFails, setMaxFails] = useState(0);
    const [API_CONFIG, setConfig] = useState(JSON.parse(localStorage.getItem("api_config")));
    const [API_GENRES, setGenres] = useState(JSON.parse(localStorage.getItem("api_genres")));

    async function getOtherAPI(type) {
        return await axios({
            method: "post",
            url: "/api/other/",
            data: {
                type: type
            }
        });
    }

    useEffect(() => {
        async function checkAPIVars() {
            if (maxFails < 5) {
                if (!API_CONFIG || API_CONFIG === null) {
                    setMaxFails(m => m + 1);
                    getOtherAPI("config")
                        .then(result => {
                            localStorage.setItem("api_config", JSON.stringify(result.data));
                            setConfig(result.data);
                        })
                        .catch(e => setErrorMessage(e.toString()));
                }
                if (!API_GENRES || API_CONFIG === null) {
                    setMaxFails(m => m + 1);
                    getOtherAPI("genres")
                        .then(result => {
                            localStorage.setItem("api_genres", JSON.stringify(result.data));
                            setGenres(result.data);
                        })
                        .catch(e => setErrorMessage(e.toString()));
                }
            }
            if (errorMessage && !errorDisplayed) {
                store.addNotification({
                    title: "An error has occured!",
                    message: errorMessage,
                    type: "danger",
                    insert: "bottom",
                    container: "bottom-center",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 3000,
                        onScreen: true
                    },
                    onRemoval: () => {
                        setErrorDisplayed(false);
                    }
                });
                setErrorDisplayed(true);
                setErrorMessage("");
            }
        }
        checkAPIVars();
    }, [API_CONFIG, API_GENRES, errorMessage, maxFails, errorDisplayed]);

    return (
        <Router>
            <ReactNotification />
            <Suspense
                fallback={
                    <div className="pulseContainer">
                        <PulseLoader size={20} margin={5} color="#337ab4" loading={true} />
                    </div>
                }
            >
                <div className="App">
                    <Header setData={setUserData} />
                    {API_CONFIG != null && API_GENRES != null && (
                        <Content data={userData} genres={API_GENRES} config={API_CONFIG} errorDisplay={store} />
                    )}
                    <Footer />
                </div>
            </Suspense>
        </Router>
    );
}

export default App;
