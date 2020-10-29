import React from 'react'
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

const isUsernameTaken = username => {
  const user = localStorage.getItem(username);
  return !!user
}

const isLoginCorrect = (username, password) => {
  const user = localStorage.getItem(username);
  if (!user) return false;
  return JSON.parse(user).password === password;
}

export const Form = ({ children, onSubmit, defaultValues, ...props }) => {
  const methods = useForm({defaultValues, criteriaMode: 'all', reValidateMode: 'onBlur'});

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

const validation = (formValues, skip) => ({
  verify_password: value => value === formValues?.password ? null : "passwords do not match",
  username: value => skip || !isUsernameTaken(value) ? null : "name is taken",
  password: value => skip || isLoginCorrect(formValues?.username, value) ? null : "wrong details"
})

export const InputText = ({ required, innerRef, isLogin, skipVerification,...props }) => {
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
            validate: validation(getValues(), skipVerification)?.[props.name] })(e)
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