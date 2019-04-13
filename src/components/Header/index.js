import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import SearchView from "./Search";
import ForecastView from "./SwitchForecast";
import Paper from "@material-ui/core/Paper";

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
                />
                <ForecastView/>
            </HeaderTop>
        </HeaderWrap>
    );
}

export default HeaderView;