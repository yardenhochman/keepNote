import { v4 as uuidv4 } from 'uuid';

export const registerUser = (username,password) => {
  localStorage.setItem(username, JSON.stringify({ name: username, password, id: uuidv4() }))
}

export const getUser = username => JSON.parse(localStorage.getItem(username))

export const isUsernameTaken = username => {
  const user = localStorage.getItem(username);
  return !!user
}

export const isLoginCorrect = (username, password) => {
  const user = localStorage.getItem(username);
  if (!user) return false;
  return JSON.parse(user).password === password;
}