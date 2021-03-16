import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom'
import './styles/reset.css'
import './styles/style.scss'
import './styles/blocks.scss'
import './styles/elements.scss'
import './styles/modifiers.scss'
import axios from 'axios'


//importing Components
import Browse from './containers/browse'
import Profile from './containers/profile'
import Login from './containers/login'
import Register from './containers/register'
import Inbox from './containers/inbox'
import Item from './containers/item'
import Booking from './containers/booking'
import NavBar from './components/navbar'
import Footer from './components/footer'

import { ThreadProvider } from './contexts/ThreadProvider'
import { SocketProvider } from './contexts/SocketProvider'
import { FileUploadProvider } from './contexts/FileUploadProvider'

import { getLoggedInUser } from './lib/auth'
const token = localStorage.getItem('token')


// ! Some starter code for your frontend, change this
// ! however you like.
const loggedInUser = getLoggedInUser()

const App = () => (
  <BrowserRouter>

    <SocketProvider id={loggedInUser.sub} token={token}>
      <ThreadProvider>
        <FileUploadProvider token={token}>   
          <NavBar />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/items/:id" component={Item} />
            <Route exact path='/browse' component={Browse} />
            <Route exact path="/inbox" component={Inbox} />
            <Route exact path="/profile/:id" component={Profile} />
            <Route exact path="/booking" component={Booking} />
          </Switch>
          {/* <Footer /> */}
        </FileUploadProvider>
      </ThreadProvider>
    </SocketProvider>
  </BrowserRouter>
)


export default App