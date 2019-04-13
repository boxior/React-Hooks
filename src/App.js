import React, {useState, useEffect} from 'react';
import {Switch, Route} from "react-router-dom";
import {MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import mainTheme from "./themes";
import {routesMap} from "./utils/variables";
import styled from "styled-components";
import DailyView from "./containers/Daily/Loadable";
import WeeklyView from "./containers/Weekly/Loadable";
import {getDaily, getWeekly} from "./requests";
import _ from "lodash";
import {withRouter} from "react-router-dom";
import HeaderView from "./components/Header";

const AppWrap = styled.div`
    
`;

function App(props) {
    const {
        location
    } = props;
    
    const [cities, setCities] = useState({
        data: [],
        activeCity: {},
        isSendingGetDaily: false,
        isSendingGetWeekly: false,
        isSuccessGetDaily: true,
        isSuccessGetWeekly: true,
        error: null
    });
    
    useEffect(() => {
        const activeCity = _.get(cities, "activeCity", {});

        if(activeCity.name) {
            onFind({
                city: activeCity.name
            })
        }
    }, [location.pathname]);
    
    function onFind({city}) {

        if (location.pathname === routesMap.daily) {

            setCities({
                ...cities,
                isSendingGetDaily: true,
                isSuccessGetDaily: false
            });
            
            getDaily(city)
                .then(res => {
                    const citiesData = _.get(cities, "data", []);
                    const cityRes = _.get(res, "data", null);

                    const existCity = citiesData.find(city => city.id === cityRes.id);
                    const existCityIndex = citiesData.findIndex(city => city.id === cityRes.id);

                    if (existCity) {
                        
                        const newCitiesData = citiesData.map((c, cIndex) => {
                            if(cIndex === existCityIndex) {
                                return cityRes;
                            }
                            
                            return c;
                        });

                        setCities({
                            ...cities, 
                            data: newCitiesData,
                            activeCity: cityRes,
                            isSendingGetDaily: false,
                            isSuccessGetDaily: true
                        })
                    } else {
                        setCities({
                            ...cities, 
                            data: [...citiesData, cityRes],
                            activeCity: cityRes,
                            isSendingGetDaily: false,
                            isSuccessGetDaily: true
                        })
                    }
                    
                    return res;
                })
                .catch(err => {
                    const errRes = _.get(err, "response.data", null);

                    setCities({
                        ...cities, 
                        error: errRes,
                        isSendingGetDaily: false,
                        isSuccessGetDaily: false
                    });
                    throw err;
                });
        }

        if (location.pathname === routesMap.weekly) {

            setCities({
                ...cities,
                isSendingGetWeekly: true,
                isSuccessGetWeekly: false
            });
            
            getWeekly(city)
                .then(res => {
                    const citiesData = _.get(cities, "data", []);
                    const cityRes = _.get(res, "data", null);
                    const city = _.get(cityRes, "city", {});

                    const existCity = citiesData.find(c => c.id === city.id);
                    const existCityIndex = citiesData.findIndex(c => c.id === city.id);
                    
                    if (existCity) {
                        
                        const newExistCity = {
                            ...existCity,
                            ...city,
                            list: cityRes.list,
                        };
                        
                        const newCitiesData = citiesData.map((c, cIndex) => {
                            if(cIndex === existCityIndex) {
                                return newExistCity
                            }
                            
                            return c;
                        });

                        setCities({
                            ...cities, 
                            data: newCitiesData,
                            activeCity: newExistCity,
                            isSendingGetWeekly: false,
                            isSuccessGetWeekly: true
                        })
                    } else {
                        
                        const newCity = {
                            ...city,
                            list: cityRes.list
                        };
                        
                        setCities({
                            ...cities, 
                            data: [...citiesData, newCity],
                            activeCity: newCity,
                            isSendingGetWeekly: false,
                            isSuccessGetWeekly: true
                        })
                    }
                    
                    return res;
                })
                .catch(err => {
                    const errRes = _.get(err, "response.data", null);

                    setCities({
                        ...cities, 
                        error: errRes,
                        isSendingGetWeekly: false,
                        isSuccessGetWeekly: false
                    });
                    throw err;
                });
        }
    };

    return (
        <MuiThemeProvider theme={mainTheme}>
            <CssBaseline/>
            <AppWrap>
                <HeaderView
                    onFind={onFind}
                    cities={cities}
                    setCities={setCities}
                />
                <Switch>
                    <Route exact path={routesMap.daily} component={DailyView}/>
                    <Route exact path={routesMap.weekly} component={WeeklyView}/>
                </Switch>
            </AppWrap>
        </MuiThemeProvider>
    );
}

export default withRouter(App);
