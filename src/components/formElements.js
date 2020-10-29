import React from 'react'
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

export const Form = ({ children, onSubmit, defaultValues, ...props }) => {
  const methods = useForm({defaultValues, criteriaMode: 'all'});

  const submit = (formData, e) => {
    e.preventDefault();
    onSubmit(formData, e);
    // console.log(formData)
  };

  return (
    <form {...props} onSubmit={methods.handleSubmit(submit)}>
      <FormProvider {...methods}>{children}</FormProvider>
    </form>
  )
}

const validation = formValues => ({
  verify_password: value => value !== formValues?.password ? "passwords do not match" : null
})

export const InputText = ({ required, innerRef, ...props }) => {
  const { register, getValues } = useFormContext()

  return (
    <InputArea>
      <TextField
      variant="outlined"  
      label={props.label ?? props.name}
        {...props} 
        inputRef={e=>{
          register({ 
            required: required ? `Please fill in the ${props.name} field` : null, 
            validate: validation(getValues())?.[props.name] })(e)
          if (innerRef) {
            innerRef.current = e
          }
        }
        } 
      />
      <Error name={props.name}/>
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
  span {
    text-transform: capitalize;
  }
`

export const Error = ({ name='content' }) => {
  const { errors } = useFormContext()

  if (!errors?.[name]) return null
  return (
  <ErrorMessage>
    <span>
      {errors?.[name]?.message?.replaceAll(/_/g, " ")}
    </span>
  </ErrorMessage>)
  

  }

export const Errors = () => {
  const { errors } = useFormContext()
  console.log(errors)
  return <ErrorMessage errors={errors} name="verify_password" render={({ message }) => <p>{message}</p>} />
}