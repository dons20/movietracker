import React, { useState, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import "./App.scss";
import axios from "axios";

const Header = React.lazy(() => import("./Components/Header"));
const Content = React.lazy(() => import("./Components/Content"));
const Footer = React.lazy(() => import("./Components/Footer"));

const API_CONFIG = JSON.parse(localStorage.getItem("api_config")) || getOtherAPI("config", "api_config");
const API_GENRES = JSON.parse(localStorage.getItem("api_genres")) || getOtherAPI("genres", "api_genres");

function App() {
    const [userData, setUserData] = useState({});

    return (
        <Router>
            <Suspense
                fallback={
                    <div className="pulseContainer">
                        <PulseLoader size={20} margin={5} color="#337ab4" loading={true} />
                    </div>
                }
            >
                <div className="App">
                    <Header setData={setUserData} />
                    <Content data={userData} genres={API_GENRES} config={API_CONFIG} />
                    <Footer />
                </div>
            </Suspense>
        </Router>
    );
}

export default App;

async function getOtherAPI(type, storageKey) {
    let configData = await axios({
        method: "post",
        url: "/api/other/",
        data: {
            type: type
        }
    });

    localStorage.setItem(storageKey, JSON.stringify(configData.data));
    return configData.data;
}
