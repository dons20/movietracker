import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.scss";
import Header from "./Components/Header";
import Content from "./Components/Content";
import Footer from "./Components/Footer";

function App() {
    const [userData, setUserData] = useState({});
    return (
        <Router>
            <div className="App">
                <Header setData={setUserData} />
                <Content data={userData} />
                <Footer />
            </div>
        </Router>
    );
}

export default App;
