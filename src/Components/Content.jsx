import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import "./Content.scss";

const HomePage = React.lazy(() => import("./HomePage"));
const SearchPage = React.lazy(() => import("./SearchPage"));
const MoviePage = React.lazy(() => import("./MoviePage"));

function Content(props) {
    return (
        <Suspense
            fallback={
                <div className="pulseContainer">
                    <PulseLoader size={20} margin={5} color="#337ab4" loading={true} />
                </div>
            }
        >
            <main role="main" className="content">
                <Switch>
                    <Route path="/" exact>
                        <HomePage {...props} />
                    </Route>
                    <Route path="/search">
                        <SearchPage {...props} />
                    </Route>
                    <Route path="/movie/:id">
                        <MoviePage {...props} />
                    </Route>
                </Switch>
            </main>
        </Suspense>
    );
}

export default Content;
