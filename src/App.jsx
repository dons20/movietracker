import React, { useState, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import "./App.scss";

const Header = React.lazy(() => import("./Components/Header"));
const Content = React.lazy(() => import("./Components/Content"));
const Footer = React.lazy(() => import("./Components/Footer"));

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
                    <Content data={userData} />
                    <Footer />
                </div>
            </Suspense>
        </Router>
    );
}

export default App;
