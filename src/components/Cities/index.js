import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const CitiesWrap = styled.div`
    
`;

const City = styled.div`
  
`;

CitiesView.propTypes = {};

CitiesView.defaultProps = {};

function CitiesView(props) {
    const {cities} = props;
    
    return (
        <CitiesWrap>
            {cities.map(city => {
                return (
                    <City>
                        {city.name}
                    </City>
                )
            })}
        </CitiesWrap>
    );
}

export default CitiesView;