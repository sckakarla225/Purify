import React from 'react';
import './App.css';
import { BrowserRouter as Router, Redirect, Switch, Route} from 'react-router-dom'; 
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// PAGES
import { Home } from './pages/Home';
import { InteractiveMap } from './pages/InteractiveMap';
import { LocationWaterData } from './pages/LocationWaterData';

// CONTEXT
import { WaterContextProvider } from './context/WaterContext';

// ROUTES
const routes = [
    { path: '/', name: 'Home', Component: Home },
    { path: '/map', name: 'Interactive Map', Component: InteractiveMap },
    { path: '/data/:locationID', name: 'Location Data', Component: LocationWaterData },
]

function App() {
    return (
        <WaterContextProvider>
            <Router>
                <div className="App">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/map" component={InteractiveMap} />
                        <Route exact path="/data/:locationID" component={LocationWaterData} />
                    </Switch>
                    {/* {routes.map(({ path, Component }) => (
                      <Route key={path} exact path={path}>
                        {({ match }) => (
                          <CSSTransition
                            in={match != null}
                            timeout={400}
                            classNames="page"
                            unmountOnExit
                          >
                            <div className="page">
                              <Component />
                            </div>
                          </CSSTransition>
                        )}
                      </Route>
                    ))} */}
                    {/* <TransitionGroup>
                        <CSSTransition
                            timeout={2000}
                            classNames="fade"
                        >
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/map" component={InteractiveMap} />
                                <Route exact path="/data/:locationID" component={LocationWaterData} />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup> */}
                </div>
            </Router>
        </WaterContextProvider>
    );
}

export default App;
