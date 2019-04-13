import React from "react";
import PropTypes from "prop-types";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {forecastMap, routesMap} from "../../../utils/variables";
import styled from "styled-components";
import {withRouter} from "react-router-dom";

const SwitchForecastRadioGroup = styled(RadioGroup)`
    && {
      display: flex;
      align-items: center;
      flex-direction: row;
    }
`;


SwitchForecastView.propTypes = {
    location: PropTypes.object,
    history: PropTypes.object,
};

SwitchForecastView.defaultProps = {};

function SwitchForecastView(props) {
    const {
        history,
        location,
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

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">SwitchForecast</FormLabel>
            <SwitchForecastRadioGroup
                name={`forecast`}
                value={getValue()}
                onChange={handleChange}
            >
                <FormControlLabel value={forecastMap.daily} control={<Radio color={`primary`}/>} label="Daily"/>
                <FormControlLabel value={forecastMap.weekly} control={<Radio color={`primary`}/>} label="Weekly"/>
            </SwitchForecastRadioGroup>
        </FormControl>
    );
}

export default withRouter(SwitchForecastView);