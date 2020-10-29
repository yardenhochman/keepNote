import React from 'react'
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import styled from 'styled-components';
import OutlinedInput from '@material-ui/core/OutlinedInput';

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
      <label>{props.name}</label>
      <OutlinedInput 
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
  label {
    text-transform: capitalize;
    font-weight: bold;
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
