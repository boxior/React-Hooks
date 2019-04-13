import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {forecastMap} from "../../../utils/variables";
import _ from "lodash";
import CityCardView from "../../CityCard";

const CitiesWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

CitiesView.propTypes = {
    cities: PropTypes.object,
    location: PropTypes.object,
    onFind: PropTypes.func,
    setCities: PropTypes.func,
    type: PropTypes.string,
};

CitiesView.defaultProps = {};

function CitiesView(props) {
    const {
        cities, 
        onFind, 
        setCities, 
        type
    } = props;

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
        switch (type) {
            case forecastMap.daily:
                const activeCity = _.get(cities, "activeCity", null);

                return activeCity && (
                    <CityCardView
                        key={cityIndex}
                        city={activeCity}
                        type={forecastMap.daily}
                    />
                );

            case forecastMap.weekly:
                const list = _.get(cities, "activeCity.list", []);

                return list.map((c, cIndex) => {
                    return (
                        <CityCardView
                            key={cIndex}
                            city={c}
                            type={forecastMap.weekly}
                        />
                    )
                });
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

export default CitiesView;