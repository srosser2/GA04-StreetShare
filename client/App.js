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

// ! Some starter code for your frontend, change this
// ! however you like.
const App = () => (
  <BrowserRouter>
    <NavBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/profile/:id" component={Profile} />
      <Route exact path="/inbox" component={Inbox} />
      <Route exact path="/test/backend" component={TestBackend} />
      <Route exact path='/browse' component={Browse} />

    </Switch>
    
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