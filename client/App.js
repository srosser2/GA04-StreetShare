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
import RegisterAndLogin from './containers/registerAndLogIn'
import Home from './containers/home'
// import Register from './containers/register'
import Inbox from './containers/inbox'
import Item from './containers/item'
import Booking from './containers/booking'
import NavBar from './components/navbar'
// import Footer from './components/footer'

import { ThreadProvider } from './contexts/ThreadProvider'
import { SocketProvider } from './contexts/SocketProvider'
import { FileUploadProvider } from './contexts/FileUploadProvider'
import { LocationProvider } from './contexts/LocationProvider'
// import history from './lib/history'

import { useHistory } from "react-router-dom";

import { getLoggedInUser } from './lib/auth'
const token = localStorage.getItem('token')



const loggedInUser = getLoggedInUser()

const App = () => {

 return<BrowserRouter history={history}>
      <LocationProvider>

        <FileUploadProvider token={token}>
          <NavBar history={history} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={RegisterAndLogin} />
            <Route exact path="/items/:id" component={Item} />
            {/* <Route exact path="/profile/:id" component={Profile} /> */}
            <Route exact path="/booking" component={Booking} />
            <Route exact path='/browse' component={Browse} history={history} />
            <SocketProvider id={loggedInUser.sub} token={token}>
              <ThreadProvider history={history}>
                <Route exact path="/inbox" component={Inbox} />
                <Route exact path="/profile/:id" component={(routerProps) => <Profile {...routerProps}/>} />
              </ThreadProvider>
            </SocketProvider>
          </Switch>
          {/* <Footer /> */}
        </FileUploadProvider>
      </LocationProvider>
        
  </BrowserRouter>
}


export default App