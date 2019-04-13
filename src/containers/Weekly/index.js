import React from "react";
import PropTypes from "prop-types";
import CitiesView from "../../components/Header/Cities";
import {forecastMap} from "../../utils/variables";

WeeklyView.propTypes = {
    cities: PropTypes.object,
    setCities: PropTypes.func,
    onFind: PropTypes.func
};

WeeklyView.defaultProps = {};

function WeeklyView(props) {
    const {
        cities,
        setCities,
        onFind
    } = props;
    
    return (
        <CitiesView
            setCities={setCities}
            cities={cities}
            onFind={onFind}
            type={forecastMap.weekly}
        />
    );
}

export default WeeklyView;