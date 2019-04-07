import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {withFormik} from "formik";
import * as Yup from "yup";

const SearchWrap = styled.div`
    display: flex;
    justify-content: center;
    padding: 25px;
`;

const SearchForm = styled.form`
    display: flex;
    align-items: center;
`;

SearchView.propTypes = {};

SearchView.defaultProps = {};

function SearchView(props) {
    const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        classes,
        resetForm,
        setSubmitting,
        onChangeSearch
    } = props;

    const onChange = e => {
        const value = e.currentTarget.value;
        onChangeSearch(value);
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
                    error={errors.email && touched.email}
                />
                <Button
                    type={`submit`}
                >
                    Find
                </Button>
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
        console.log("values", values);
        onSubmit({
            city: values.city
        });

        setSubmitting(true);
    },
    displayName: 'SubscribeForm',
});

export default withForm(SearchView);