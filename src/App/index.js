import React, {useEffect, useReducer} from 'react';
import {Switch, Route} from "react-router-dom";
import {MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import mainTheme from "../themes/index";
import {routesMap} from "../utils/variables";
import styled from "styled-components";
import DailyView from "../containers/Daily/Loadable";
import WeeklyView from "../containers/Weekly/Loadable";
import {getDaily, getWeekly} from "../requests/index";
import _ from "lodash";
import {withRouter} from "react-router-dom";
import HeaderView from "../components/Header/index";
import {
    getDailyError,
    getDailyStart,
    getDailySuccess,
    getWeeklyError,
    getWeeklyStart,
    getWeeklySuccess, setCities
} from "./actions";
import reducer, {initialState} from "./reducer";

const AppWrap = styled.div`
    
`;

export const AppContext = React.createContext();

function App(props) {
    const {
        location
    } = props;

    const [state, dispatch] = useReducer(reducer, initialState);
    
    useEffect(() => {
        const activeCity = _.get(state, "activeCity", {});

        if (activeCity.name) {
            onFind({
                city: activeCity.name
            })
        }
    }, [location.pathname]);

    function onFind({city}) {

        if (location.pathname === routesMap.daily) {

            dispatch(getDailyStart());

            getDaily(city)
                .then(res => {
                    
                    dispatch(getDailySuccess(res));

                    return res;
                })
                .catch(err => {
                    const errRes = _.get(err, "response.data", null);

                    dispatch(getDailyError(errRes));
                    
                    throw err;
                });
        }

        if (location.pathname === routesMap.weekly) {

            dispatch(getWeeklyStart());

            getWeekly(city)
                .then(res => {
                    
                    dispatch(getWeeklySuccess(res));

                    return res;
                })
                .catch(err => {
                    
                    
                    const errRes = _.get(err, "response.data", null);
                    dispatch(getWeeklyError(errRes));
                    
                    throw err;
                });
        }
    }
    
    const setCitiesFunc = cities => {
        dispatch(setCities(cities));
    };

    return (
        <MuiThemeProvider theme={mainTheme}>
            <CssBaseline/>
            <AppWrap>
                <AppContext.Provider
                    value={{
                        cities: state,
                        onFind
                    }}
                >
                    <HeaderView
                        onFind={onFind}
                        cities={state}
                    />
                    <Switch>
                        <Route
                            exact
                            path={routesMap.daily}
                            render={props => <DailyView
                                {...props}
                                cities={state}
                                onFind={onFind}
                                setCities={setCitiesFunc}
                            />}
                        />
                        <Route
                            exact
                            path={routesMap.weekly}
                            render={props => <WeeklyView
                                {...props}
                                cities={state}
                                onFind={onFind}
                                setCities={setCitiesFunc}
                            />}
                        />
                    </Switch>
                </AppContext.Provider>
            </AppWrap>
        </MuiThemeProvider>
    );
}

export default withRouter(App);
