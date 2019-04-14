import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import SearchView from "./Search";
import ForecastView from "./SwitchForecast";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import {forecastMap} from "../../utils/variables";
import Radio from "@material-ui/core/Radio/Radio";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";

const SwitchForecastRadioGroup = styled(RadioGroup)`
    && {
      display: flex;
      align-items: center;
      flex-direction: row;
    }
`;

const HeaderWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const HeaderTop = styled(Paper)`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 0;
    margin-bottom: 15px;
`;

const SearchButton = styled(Button)`
    && {
        padding: 0 15px;
        text-transform: capitalize;
        height: 55px;
    }
`;

HeaderView.propTypes = {
    onFind: PropTypes.func,
    cities: PropTypes.object
};

HeaderView.defaultProps = {};

function HeaderView(props) {
    const {
        onFind,
        cities,
    } = props;

    return (
        <HeaderWrap>
            <HeaderTop>
                <SearchView
                    onSubmit={onFind}
                    value={``}
                    cities={cities}

                    render={props => {
                        const {
                            isSubmitting,
                            title
                        } = props;

                        return (
                            <SearchButton
                                type={`submit`}
                                variant={"contained"}
                                color={`primary`}
                                disabled={isSubmitting}
                            >
                                {title}
                            </SearchButton>
                        )
                    }}
                />
                <ForecastView>
                    {props => {
                        const {
                            memoizedValue,
                            handleChange,
                        } = props;
                        
                        return (
                            <>
                                <SwitchForecastRadioGroup
                                    name={`forecast`}
                                    value={memoizedValue}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel
                                        value={forecastMap.daily}
                                        control={<Radio color={`primary`}/>}
                                        label="Daily"
                                    />
                                    <FormControlLabel
                                        value={forecastMap.weekly}
                                        control={<Radio color={`primary`}/>}
                                        label="Weekly"
                                    />
                                </SwitchForecastRadioGroup>
                            </>
                        )
                    }}
                </ForecastView>
            </HeaderTop>
        </HeaderWrap>
    );
}

export default HeaderView;