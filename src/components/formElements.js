import React from 'react'
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import styled from 'styled-components';
import OutlinedInput from '@material-ui/core/OutlinedInput';


export const Form = ({ children, onSubmit, ...props }) => {
  const methods = useForm();

  const submit = (formData, e) => {
    e.preventDefault();
    onSubmit(formData, e);
  };

  return (
    <form {...props} onSubmit={methods.handleSubmit(submit)}>
    {methods.errors?.content?.type === "required" && <ErrorMessage>Note is Empty</ErrorMessage>}
      <FormProvider {...methods}>{children}</FormProvider>
    </form>
  )
}

export const InputText = ({required, ...props}) => {
  const { register } = useFormContext()

  return <OutlinedInput {...props} inputRef={register({ required })} />
}


const ErrorMessage = styled.span`
  color: red;
`