import React from 'react'
import styled from 'styled-components'
import { Form, InputText } from '../components/formElements'
import Switch from '../components/switch';
import { Page } from './styles'
import Button from '@material-ui/core/Button';
import { useRecoilState } from 'recoil';
import { userState } from '../state'
import { registerUser, getUser } from '../api'


const AuthPage = () => {

  const [isLogin, setIsLogin] = React.useState(true);

  const setUser = useRecoilState(userState)[1]
  const submitFields = ({ username, password }) => {

    if (!isLogin) {
      registerUser(username, password)
      console.log('user registered')
    }
    setUser(getUser(username))
    console.log('login success')

  }
  return (
    <AuthPageWrapper>
    <Switch 
      optionA="Login"   
      optionB="Register"
      name="isLogin"
      checked={!isLogin}
      onChange={()=>setIsLogin(state=>!state)}
     />
      <Form onSubmit={submitFields}>
        <InputText name='username' required skipVerification={isLogin}/>
        <InputText name='password' type='password' required skipVerification={!isLogin}/>
        {!isLogin && <InputText label="Verify Password" name='verify_password' type='password' required />}
        <SubmitButton isLogin={isLogin}>Submit</SubmitButton>
      </Form>
    </AuthPageWrapper>
  )
}

export default AuthPage




const AuthPageWrapper = styled(Page)`
    padding-top: 30vh;
`

const SubmitButton = styled(Button).attrs(({ isLogin })=>({
  type: 'submit',
  variant: 'outlined',
  color: isLogin ?  'primary' : 'secondary'
}))``
