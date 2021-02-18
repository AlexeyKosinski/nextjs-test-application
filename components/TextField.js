import MUITextField from '@material-ui/core/TextField';
import React from 'react';
import { useFormText } from '../hooks/useForm'

export const TextField = (props) => {
  const {
    InputProps = {},
    inputProps = {},
    errorText,
    helperText,
    error,
    label = null,
    fullWidth = true,
    disableBrowserAutoComplete = true,
    ...rest
  } = useFormText(props);

  return (
    <MUITextField
      InputProps={InputProps}
      inputProps={inputProps}
      variant="outlined"
      helperText={helperText}
      error={!!errorText || !!error}
      label={errorText || label}
      hiddenLabel={!(errorText || label)}
      fullWidth={fullWidth}
      {...rest}
    />
  );
};

export default TextField
