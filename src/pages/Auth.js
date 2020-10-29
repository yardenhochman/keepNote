import React from 'react'
import styled from 'styled-components'
import { Form, InputText } from '../components/formElements'
import Switch from '../components/switch';
import { Page } from './styles'



const LoginPage = () => {

  const [isLogin, setIsLogin] = React.useState(true);


  return (
    <AuthPage>
    <Switch 
      optionA="Login"   
      optionB="Register"
      name="isLogin"
      checked={!isLogin}
      onChange={()=>setIsLogin(state=>!state)}
     />
      <Form onSubmit={console.log}>
        <InputText name='username' />
        <InputText name='password' type='password' />
      </Form>
    </AuthPage>
  )
}

export default LoginPage




const AuthPage = styled(Page)`
    padding-top: 30vh;
`