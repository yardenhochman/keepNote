import React from 'react'
import styled from 'styled-components'
import { Form, InputText, Errors } from '../components/formElements'
import Switch from '../components/switch';
import { Page } from './styles'
import Button from '@material-ui/core/Button';
import { v4 as uuidv4 } from 'uuid';

const isUsernameTaken = username => {
  const user = localStorage.getItem(username);
  return !!user
}

const checkLogin = (username, password) => {
  const user = localStorage.getItem(username);
  if (!user) return false;
  return JSON.parse(user).password === password;
}

const registerUser = (username,password) => {
  localStorage.setItem(username, JSON.stringify({ name: username, password, id: uuidv4() }))
}

const LoginPage = () => {

  const [isLogin, setIsLogin] = React.useState(true);

  const submitFields = (fieldsData) => {
    console.log(fieldsData)

  }


  return (
    <AuthPage>
    <Switch 
      optionA="Login"   
      optionB="Register"
      name="isLogin"
      checked={!isLogin}
      onChange={()=>setIsLogin(state=>!state)}
     />
      <Form onSubmit={submitFields}>
        <InputText name='username' required />
        <InputText name='password' type='password' required />
        {!isLogin && <InputText label="Verify Password" name='verify_password' type='password' required />}
        <SubmitButton isLogin={isLogin}>Submit</SubmitButton>
      </Form>
    </AuthPage>
  )
}

export default LoginPage




const AuthPage = styled(Page)`
    padding-top: 30vh;
`

const SubmitButton = styled(Button).attrs(({ isLogin })=>({
  type: 'submit',
  variant: 'outlined',
  color: isLogin ?  'primary' : 'secondary'
}))``
