import React, {useMemo, useDebugValue} from "react";
import PropTypes from "prop-types";
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {forecastMap, routesMap} from "../../../utils/variables";
import {withRouter} from "react-router-dom";

SwitchForecastView.propTypes = {
    location: PropTypes.object,
    history: PropTypes.object,
    children: PropTypes.node,
};

SwitchForecastView.defaultProps = {};

function SwitchForecastView(props) {
    const {
        history,
        location,
        children,
    } = props;

    function getValue() {
        switch (location.pathname) {
            case routesMap.daily:
                return forecastMap.daily;

            case routesMap.weekly:
                return forecastMap.weekly;

            default:
                return forecastMap.daily
        }
    }

    function handleChange(event) {
        const value = event.target.value;
        let route = routesMap.daily;

        switch (value) {
            case forecastMap.weekly:
                route = routesMap.weekly;
                break;

            default:
                route = routesMap.daily;
        }
        history.push(route);
    }

    const memoizedValue = useMemo(() => getValue(), [location.pathname]);

    useDebugValue(memoizedValue === forecastMap.daily ? "D" : "W");

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">SwitchForecast</FormLabel>
            {children({
                memoizedValue,
                handleChange
            })}
        </FormControl>
    );
}

export default withRouter(SwitchForecastView);