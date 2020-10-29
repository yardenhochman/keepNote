import React from 'react'
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

export const Form = ({ children, onSubmit, defaultValues, ...props }) => {
  const methods = useForm({defaultValues});

  const submit = (formData, e) => {
    e.preventDefault();
    onSubmit(formData, e);
  };

  return (
    <form {...props} onSubmit={methods.handleSubmit(submit)}>
      <FormProvider {...methods}>{children}</FormProvider>
    </form>
  )
}

export const InputText = ({required, innerRef, ...props}) => {
  const { register } = useFormContext()

  return (
    <InputArea>
      <TextField
      variant="outlined"  
      label={props.label ?? props.name}
        {...props} 
        inputRef={e=>{
          register({ required })(e)
          if (innerRef) {
            innerRef.current = e
          }
        }
        } 
      />
    </InputArea>
  )
}

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  label {
    text-transform: capitalize;
    font-weight: bold;
    margin-bottom: 15px;
  }

`


const ErrorMessage = styled.span`
  color: red;
`

export const Error = ({type, message}) => {
  const { errors } = useFormContext()

    if (errors?.content?.type === type ) {
    return <ErrorMessage>{message}</ErrorMessage>
    }
    return null
  }
