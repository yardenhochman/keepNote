import React from 'react'
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import validation from './validation'

export const Form = ({ children, onSubmit, defaultValues, ...props }) => {
  const methods = useForm({ defaultValues, criteriaMode: 'all', reValidateMode: 'onBlur' });

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



export const InputText = ({ required, innerRef, isLogin, skipVerification = false,...props }) => {
  const { register, getValues } = useFormContext()
  if (props.type === 'password') {
    console.log(skipVerification)
  }



  return (
    <InputArea>
      <TextField
      autocomplete="off"
      variant="outlined"  
      label={props.label ?? props.name}
        {...props} 
        inputRef={e=>{
          register({ 
            required: required ? `Please fill in the ${props.name} field` : null, 
            validate: value => {
              const validationMethod = validation(getValues(), skipVerification)?.[props.name]
            if (validationMethod) {
              return validationMethod(value)
            }
              return null
            }
            })(e)
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
      {errors?.[name]?.message?.replaceAll(/_/g, " ")}
  </ErrorMessage>
  )
}