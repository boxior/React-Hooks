import React, {useEffect, useContext, useRef, useLayoutEffect} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import {withFormik} from "formik";
import * as Yup from "yup";
import _ from "lodash";
import {AppContext} from "../../../App/index";
import ReactDOM from "react-dom";
import FancyInput from "./FancyTextField";
import {withRouter} from "react-router-dom";

const SearchWrap = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 25px;
`;

const SearchForm = styled.form`
    display: flex;
    align-items: flex-start;
`;

SearchView.propTypes = {
    onSubmit: PropTypes.func,
    cities: PropTypes.object,
    value: PropTypes.string,
    location: PropTypes.object,
    render: PropTypes.func,
};

SearchView.defaultProps = {};

function SearchView(props) {

    const context = useContext(AppContext);

    const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
        setSubmitting,
        setFieldError,
        location,
        render
    } = props;

    const {
        cities
    } = context;

    const {
        isSendingGetDaily,
        isSendingGetWeekly,

        isSuccessGetDaily,
        isSuccessGetWeekly
    } = cities;

    const refInput = useRef(null);
    const fancyInputRef = useRef(null);

    useLayoutEffect(() => {
        if (fancyInputRef.current) {
            fancyInputRef.current.focus();
        }
    }, [location.pathname]);

    useEffect(() => {
        if (refInput.current) {
            ReactDOM.findDOMNode(refInput.current).getElementsByTagName(`input`)[0].focus();
        }

    }, []);

    useEffect(() => {

        if (!isSendingGetDaily && !isSendingGetWeekly) {
            setSubmitting(false);
        }

        if ((!isSuccessGetDaily && !isSendingGetDaily)
            || (!isSuccessGetWeekly && !isSendingGetWeekly)) {
            const citiesErrorMessage = _.get(cities, "error.message");

            if (citiesErrorMessage) {
                setFieldError("city", citiesErrorMessage)
            }
        }

    }, [isSendingGetDaily, isSendingGetWeekly]);

    useEffect(() => {
        if (isSuccessGetDaily && isSuccessGetWeekly) {
            resetForm();
        }
    }, [isSuccessGetDaily, isSuccessGetWeekly]);

    const getHelperText = (error, touched) => {
        switch (true) {
            case error && touched:
                return error;

            default:
                return null;
        }
    };

    function renderInput(type) {
        if (type === `fancy`) {
            return (
                <FancyInput
                    ref={fancyInputRef}
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    getHelperText={getHelperText}
                />
            )
        }

        return (
            <TextField
                name="city"
                id="city"
                variant="outlined"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                label={`City`}
                error={errors.city && touched.city}
                helperText={getHelperText(errors.city, touched.city)}
                ref={refInput}
            />
        )
    }

    return (
        <SearchWrap>
            <SearchForm
                onSubmit={handleSubmit}
            >
                {renderInput('')}

                {render({
                    isSubmitting,
                    title: "Search"
                })}
            </SearchForm>
        </SearchWrap>
    );
}

const withForm = withFormik({
    mapPropsToValues: (props) => ({
        city: props.value
    }),
    validationSchema: Yup.object().shape({
        city: Yup.string()
            .required(`Required`),
    }),
    handleSubmit: (values, {props, setSubmitting}) => {
        const {onSubmit} = props;
        onSubmit({
            city: values.city
        });

        setSubmitting(true);
    },
    displayName: 'findCity',
});

export default withRouter(withForm(SearchView));