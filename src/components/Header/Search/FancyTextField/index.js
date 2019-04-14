import React, {forwardRef, useImperativeHandle, useRef} from "react";
import ReactDOM from "react-dom";
import TextField from "@material-ui/core/TextField/TextField";

function FancyInput(props, ref) {
    const {
        values,
        handleChange,
        handleBlur,
        errors,
        touched,
        getHelperText,
    } = props;
    
    const inputRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => {
            if (inputRef.current) {
                ReactDOM.findDOMNode(inputRef.current).getElementsByTagName(`input`)[0].focus();
            }
        }
    }));

    return (
        <TextField
            name="city"
            id="city"
            variant="outlined"
            value={values.city}
            onChange={handleChange}
            onBlur={handleBlur}
            label={`Fancy example`}
            error={errors.city && touched.city}
            helperText={getHelperText(errors.city, touched.city)}
            ref={inputRef}
        />
    )
}

export default forwardRef(FancyInput);