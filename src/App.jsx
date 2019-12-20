import React, { useState } from "react";
import "./App.scss";
import Header from "./Components/Header";
import Content from "./Components/Content";
import Footer from "./Components/Footer";

function App() {
    const [userData, setUserData] = useState({ moviesWatched: ["sample movie"] });
    return (
        <div className="App">
            <Header setData={setUserData} />
            <Content data={userData} />
            <Footer />
        </div>
    );
}

export default App;
