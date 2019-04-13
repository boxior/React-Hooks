import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import CityCardView from "../../components/CityCard";
import {forecastMap} from "../../utils/variables";

WeeklyView.propTypes = {
    cities: PropTypes.object
};

WeeklyView.defaultProps = {};

function WeeklyView(props) {
    const {
        cities
    } = props;

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
}

export default WeeklyView;