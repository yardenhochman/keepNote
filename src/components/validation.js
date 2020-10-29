import { isLoginCorrect, isUsernameTaken } from '../api'

const validation = (formValues, skip) => ({
  verify_password: value => value === formValues?.password ? null : "passwords do not match",
  username: value => skip || !isUsernameTaken(value) ? null : "name is taken",
  password: value => skip || isLoginCorrect(formValues?.username, value) ? null : "wrong details"
})

export default validation