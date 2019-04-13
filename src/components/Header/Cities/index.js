import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {withRouter} from "react-router-dom";
import {routesMap} from "../../../utils/variables";
import DailyView from "../../../containers/Daily";
import WeeklyView from "../../../containers/Weekly";

const CitiesWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

CitiesView.propTypes = {
    cities: PropTypes.object,
    location: PropTypes.object,
    onFind: PropTypes.func,
    setCities: PropTypes.func,
};

CitiesView.defaultProps = {};

function CitiesView(props) {
    const {cities, onFind, setCities, location} = props;

    const {
        data,
        activeCity,
    } = cities;

    function handleChange(e, index) {
        const city = data[index];

        if (city) {
            setCities({
                ...cities,
                activeCity: city
            });

            onFind({city: city.name})
        }
    }

    const activeCityIndex = () => {
        return data.findIndex(c => {
            return c.id === activeCity.id;
        })
    };

    const getTabView = (cityIndex) => {
        switch (location.pathname) {
            case routesMap.daily:
                return (
                    <DailyView
                        key={cityIndex}
                        cities={cities}
                    />
                );

            case routesMap.weekly:
                return (
                    <WeeklyView
                        key={cityIndex}
                        cities={cities}
                    />
                );
            default:
                return null;
        }
    };

    return !!data.length && (
        <CitiesWrap>
            <AppBar position="static">
                <Tabs
                    value={activeCityIndex()}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {data.map((city, cityIndex) => {
                        return (
                            <Tab
                                key={cityIndex}
                                label={city.name}
                            />
                        )
                    })}
                </Tabs>
            </AppBar>
            {data.map((city, cityIndex) => {
                return cityIndex === activeCityIndex()
                    && getTabView(cityIndex)
            })}
        </CitiesWrap>
    );
}

export default withRouter(CitiesView);