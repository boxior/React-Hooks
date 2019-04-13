import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import moment from "moment";
import Divider from "@material-ui/core/Divider/Divider";
import _ from "lodash";
import Paper from "@material-ui/core/Paper/Paper";
import {forecastMap} from "../../utils/variables";

const DailyWrap = styled(Paper)`;
    margin: 15px;
`;

CityCardView.propTypes = {
    city: PropTypes.object,
    type: PropTypes.string
};

CityCardView.defaultProps = {};

function CityCardView(props) {
    const {city, type} = props;

    const cityMain = _.get(city, "main", {});
    
    const getDate = () => {
        switch (type) {
            case forecastMap.daily:
                return moment().format('MMMM Do YYYY, h:mm:ss a');
                
            case forecastMap.weekly:
                const cityDate = _.get(city, "dt_txt");
                return moment(cityDate).format('MMMM Do YYYY, h:mm:ss a');
            default:
                return moment().format('MMMM Do YYYY, h:mm:ss a');
        }
    };
    
    
    return city && (
        <DailyWrap>
            <List>
                <ListItem>
                    <ListItemText
                        primary={`Date:`}
                    />
                    <ListItemText
                        primary={getDate()}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={`Humidity:`}
                    />
                    <ListItemText
                        primary={cityMain.humidity}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={`Pressure:`}
                    />
                    <ListItemText
                        primary={cityMain.pressure}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={`Temp:`}
                    />
                    <ListItemText
                        primary={cityMain.temp}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={`Temp max:`}
                    />
                    <ListItemText
                        primary={cityMain.temp_max}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={`Temp min:`}
                    />
                    <ListItemText
                        primary={cityMain.temp_min}
                    />
                </ListItem>
            </List>
            <Divider/>
        </DailyWrap>
    );
}

export default CityCardView;