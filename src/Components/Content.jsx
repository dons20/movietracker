import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SearchPage from "./SearchPage";
import "./Content.scss";

function Content({ data }) {
    return (
        <main role="main" className="content">
            <Switch>
                <Route path="/" exact>
                    <HomePage data={data} />
                </Route>
                <Route path="/search" exact>
                    <SearchPage data={data} />
                </Route>
            </Switch>
        </main>
    );
}

export default Content;
