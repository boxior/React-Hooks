import React from 'react';
import {Switch, Route} from "react-router-dom";
import {MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import mainTheme from "./themes";
import {routesMap} from "./utils/variables";
import styled from "styled-components";
import DailyView from "./containers/Daily/Loadable";
import WeeklyView from "./containers/Weekly/Loadable";
import SearchView from "./components/Search/Loadable";
import {getDaily, getWeekly} from "./requests";
import _ from "lodash";

const AppWrap = styled.div`
    
`;

function App() {
    
    const onFind = ({city}) => {
        getDaily(city)
            .then(res => {
                const data = _.get(res, "data", null);
                return res;
            })
            .catch(err => {
                const data = _.get(err, "response.data", null);
                throw err;
            });

        // getWeekly(city)
        //     .then(res => {
        //         const data = _.get(res, "data", null);
        //         return res;
        //     })
        //     .catch(err => {
        //         const data = _.get(err, "response.data", null);
        //         throw err;
        //     });
    };

    return (
        <MuiThemeProvider theme={mainTheme}>
            <CssBaseline/>
            <AppWrap>
                <SearchView
                    value={`def`}
                    onSubmit={onFind}
                />
                <Switch>
                    <Route exact path={routesMap.daily} component={DailyView}/>
                    <Route exact path={routesMap.weekly} component={WeeklyView}/>
                </Switch>
            </AppWrap>
        </MuiThemeProvider>
    );
}

export default App;
