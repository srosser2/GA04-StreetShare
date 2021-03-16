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
import NavBar from './components/navbar'
import Footer from './components/footer'
import Item from './containers/item'

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

    <NavBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <FileUploadProvider token={token}>
        <Route exact path="/profile/:id" component={Profile} />
      </FileUploadProvider>
      <Route exact path="/items/:id" component={Item} />
      <Route exact path="/test/backend" component={TestBackend} />
      <Route exact path='/browse' component={Browse} />
      <SocketProvider id={loggedInUser.sub} token={token}>
        <ThreadProvider>                
          <Route exact path="/inbox" component={Inbox} />
        </ThreadProvider>
      </SocketProvider>
      

    </Switch>
    {/* <Footer /> */}
    
  </BrowserRouter>
)

const Home = () => <Link to={'/profile/1'}>
  Go to profile 1
</Link>

// ! Just a little component to test that you can talk to your flask server, check if it
// ! works in network tab.
const TestBackend = () => {
  useEffect(() => {
    // ? This is going to try localhost:5000/api
    axios.get('/api')
      .then(({ data }) => console.log(data))
  }, [])

  return <p>
    Hello World
  </p>
}

export default App