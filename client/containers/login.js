import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Form from '../components/form'

import { getLoggedInUser } from '../lib/auth'

const Login = ({ history }) => {

  const [loginForm, updateLoginForm] = useState({
    email: {
      label: 'Email',
      element: 'input',
      classes: ['input'],
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
      classes: ['input'],
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
  const [invalidlogin, updateInvalidLogin] = useState(false)
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
        await axios.post('/api/login', formData)
          .then(({ data }) => {
            if (!localStorage) return updateInvalidLogin(true)
            if (!data.token) return updateInvalidLogin(true)
            localStorage.setItem('token', data.token)
            const currentUser = getLoggedInUser()
            history.push(`/profile/${currentUser.sub}`)
            location.reload()

          })
          .catch(err => updateInvalidLogin(true))
      },
      classes: ['button is-success addOn']
    }
  }
  return <div >
    <Form
      config={loginForm}
      controls={formControls}
      onChange={e => handleChange(e)}
      onSelectChange={handleSelectChange}
    />
    {invalidlogin && <small className="has-text-danger">Incorrect Login Details, Please Try Again</small>}

  </div>
}

export default Login