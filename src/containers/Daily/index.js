import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import CityCardView from "../../components/CityCard";
import {forecastMap} from "../../utils/variables";


DailyView.propTypes = {
    cities: PropTypes.object
};

DailyView.defaultProps = {};

function DailyView(props) {
    const {
        cities
    } = props;

    const activeCity = _.get(cities, "activeCity", null);

    return activeCity && (
        <CityCardView
            city={activeCity}
            type={forecastMap.daily}
        />
    );
}

export default DailyView;