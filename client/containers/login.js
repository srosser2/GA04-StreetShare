import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Form from '../components/form'

const Login = ({ history }) => {

  const [loginForm, updateLoginForm] = useState({
    email: {
      label: 'Email',
      element: 'input',
      type: 'text',
      placeholder: 'Enter your email',
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      dirty: false
    },
    password: {
      label: 'Password',
      element: 'input',
      type: 'password',
      placeholder: 'Enter your password',
      value: '',
      validation: {
        required: true,
        minLength: 6
      },
      dirty: false
    }
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    const updatedForm = { ...loginForm }
    updatedForm[name].value = value
    updateLoginForm(updatedForm)
  }

  const handleSelectChange = (e, name) => {
    const updatedForm = { ...loginForm }
    updatedForm[name].value = e.value
    updateLoginForm(updatedForm)
  }

  const formControls = {
    submit: {
      label: 'Sign In',
      handler: async () => {
        const formData = {}
        for (const field in loginForm) {
          formData[field] = loginForm[field].value
          loginForm[field].dirty = true
        }
        const { data } = await axios.post('/api/login', formData)
          .then(({ data }) => {
            if (!localStorage) return
            if (!data.token) return
            localStorage.setItem('token', data.token)
            console.log(localStorage)
            location.reload()
            history.push('/profile/1')
          })
          .catch(err => console.log(err.response))
      },
      classes: []
    }
  }

  return <div>
    <h1>test</h1>
    <Form
      config={loginForm}
      controls={formControls}
      onChange={e => handleChange(e)}
      onSelectChange={handleSelectChange}
    />
  </div>
}

export default Login