import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Form from '../components/form'

const Register = () => {

  const [loginForm, updateLoginForm] = useState({
    firstName: {
      label: 'First Name',
      element: 'input',
      classes: ['input'],
      type: 'text',
      placeholder: '',
      value: '',
      validation: {
        required: true
      },
      dirty: false
    },
    lastName: {
      label: 'Last Name',
      element: 'input',
      classes: ['input'],
      type: 'text',
      placeholder: '',
      value: '',
      validation: {
        required: true
      },
      dirty: false
    },
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
    },
    address1: {
      label: 'Address Line 1',
      element: 'input',
      classes: ['input', 'm-r-5'],
      type: 'text',
      placeholder: 'Enter your address',
      value: '',
      validation: {
        required: true
      },
      dirty: false
    },
    address2: {
      label: 'Address Line 2',
      element: 'input',
      classes: ['input', 'm-r-5'],
      type: 'text',
      placeholder: 'Enter your address',
      value: '',
      validation: {
        required: false
      },
      dirty: false
    },
    city: {
      label: 'City',
      element: 'input',
      classes: ['input', 'm-r-5'],
      type: 'text',
      placeholder: 'Enter your city',
      value: '',
      validation: {
        required: true
      },
      dirty: false
    },
    postcode: {
      label: 'Postcode',
      element: 'input',
      classes: ['input', 'm-r-5'],
      type: 'text',
      placeholder: 'Enter Postcode',
      value: '',
      validation: {
        required: true
      },
      dirty: false
    },
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
      label: 'Sign Up',
      handler: async () => {
        const formData = {}
        for (const field in loginForm) {
          formData[field] = loginForm[field].value
          loginForm[field].dirty = true
        }
        await axios.post('/api/register', formData)
          .then(({ data }) => {
            console.log(data)
          })
          .catch(err => console.log(err.response))
      },
      classes: ['button is-success addOn']
    }
  }

  return <div>
    <Form
      config={loginForm}
      controls={formControls}
      onChange={e => handleChange(e)}
      onSelectChange={handleSelectChange}
    />
  </div>
}

export default Register