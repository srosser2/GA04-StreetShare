import React from 'react'
import Register from './register'
import Login from './login'
import Footer from '../components/footer'
import 'bulma'

const RegisterAndLogin = ({ history }) => {
  return (
    <>
      <div className="section">
        <center> <h1 style={{ fontSize: '20px' }}>Register if you don't have an account&nbsp;&nbsp;&nbsp;&nbsp; <b style={{ color: '#FF8C00', fontSize: '22px', fontFamily: 'italic' }}>OR</b>&nbsp;&nbsp;&nbsp;&nbsp; Login if you already registered</h1></center>
        <div style={{ width: '60vw', margin: 'auto' }} className="box columns">
          <div className="column">
            {Register()}
          </div>
          <div className="column is-half">
            {Login(history)}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default RegisterAndLogin