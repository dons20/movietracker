import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import "./Content.scss";

const HomePage = React.lazy(() => import("./HomePage"));
const SearchPage = React.lazy(() => import("./SearchPage"));

function Content({ data }) {
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
                        <HomePage data={data} />
                    </Route>
                    <Route path="/search" exact>
                        <SearchPage data={data} />
                    </Route>
                </Switch>
            </main>
        </Suspense>
    );
}

export default Content;
