import React, { useState } from 'react'
import '../styles/LoginForm.css'
import axios from 'axios'
import TextField from '@mui/material/TextField'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { API_URL } from '../proxy'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginflag] = useState(false)
  const cookies = new Cookies(null, { path: '/' })

  const navigate = useNavigate()

  const loginClick = (event) => {
    event.preventDefault()
    axios
      .get(`${API_URL}/login`, {
        params: {
          username,
          password
        }
      })
      .then((response) => {
        const test1 = JSON.parse(JSON.stringify(response.data))
        if (response.status === 200) {
          cookies.set('userID', test1.data)
          navigate('/home')
        }
      })
      .catch(function (error) {
        console.log(error)
        alert(
          'Username already exists or Password is too short (must be length 5)'
        )
      })
  }

  const SignUpClick = (event) => {
    event.preventDefault()
    axios
      .get(`${API_URL}/signup`, {
        params: {
          username,
          password
        }
      })
      .then((response) => {
        const test1 = JSON.parse(JSON.stringify(response.data))
        if (response.status === 200) {
          cookies.set('userID', test1.data)
          navigate('/home')
        }
      })
      .catch(function (error) {
        console.log(error)
        alert(
          'Username already exists or Password is too short (must be length 5)'
        )
      })
  }

  if (!loginflag) {
    return (
      <div className='form-container'>
        <h1 className='h1'> Bookshelf</h1>
        <form>
          <TextField
            class='TextField1'
            type='text'
            placeholder='Username'
            onChange={(event) => {
              setUsername(event.target.value)
            }}
            required
          />
          <TextField
            class='TextField2'
            type='password'
            placeholder='Password'
            onChange={(event) => {
              setPassword(event.target.value)
            }}
            required
          />
          <div class='flex'>
            <form class='flex-item'>
              <button class='button2' onClick={loginClick}>
                Log In
              </button>
            </form>
            <form class='flex-item'>
              <button class='button2' onClick={SignUpClick}>
                Sign Up
              </button>
            </form>
          </div>
        </form>
      </div>
    )
  }
}
export default LoginForm
