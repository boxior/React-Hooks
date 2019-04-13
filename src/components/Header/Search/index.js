import React, {useEffect, useContext} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {withFormik} from "formik";
import * as Yup from "yup";
import _ from "lodash";
import {AppContext} from "../../../App/index";

const SearchWrap = styled.div`
    display: flex;
    justify-content: center;
    padding: 25px;
`;

const SearchForm = styled.form`
    display: flex;
    align-items: flex-start;
`;

const SearchButton = styled(Button)`
    && {
        padding: 0 15px;
        text-transform: capitalize;
        height: 55px;
    }
`;

SearchView.propTypes = {
    onSubmit: PropTypes.func,
    cities: PropTypes.object,
    value: PropTypes.string
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

    return (
        <SearchWrap>
            <SearchForm
                onSubmit={handleSubmit}
            >
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
                />
                <SearchButton
                    type={`submit`}
                    variant={"contained"}
                    color={`primary`}
                    disabled={isSubmitting}
                >
                    Find
                </SearchButton>
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

export default withForm(SearchView);