import React from "react";
import {Link, useLocation} from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import FadeIn from 'react-fade-in/lib/FadeIn';
// import axios from 'axios'

const Header = ({setLoggedIn, setUser}) => {
  const {loginWithRedirect, logout, user, isAuthenticated, /*getAccessTokenSilently*/} = useAuth0()

  const location = useLocation()


  setLoggedIn(isAuthenticated)

  if (isAuthenticated) {
    setUser(user.nickname)
  }

  // const callApi = () => {
  //   axios.get('http://localhost:4000/')
  //     .then(resp => console.log(resp.data))
  //     .catch(error => console.log(error.message))
  // }

  // async function callProtectedApi() {
  //   try {
  //     const token = await getAccessTokenSilently()
  //     const response = await axios.get('http://localhost:4000/protected', {
  //       headers: {
  //         authorization: `Bearer ${token}`
  //       }
  //     })
  //   console.log(response.data)
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }

  
  return (
    
      <div className="header">
        <FadeIn transitionDuration={200}>
          <h1>Next Best Stories</h1>
        </FadeIn>
        {/* <button onClick={callApi}>api</button>
        <button onClick={callProtectedApi}>protected</button> */}
        <div className="navigation">
          <nav>
            <ul>
                <li className={location.pathname == '/' ? 'active' : ''} >
                  <div><Link to="/" name='home'>Home</Link></div>
                </li>
                <li className={location.pathname == '/stories'? 'active' : ''} >
                  <div><Link to="/stories" name='stories'>Stories</Link></div>
                </li>
              {isAuthenticated ? (
                <li className={location.pathname == '/yourstories'? 'active' : ''} >
                  <div><Link to="/yourstories" name='yourstories'>Publish Story</Link></div>
                </li>
              ) : (
                null
              )}
            </ul>
          </nav>
        </div>
        <div className="login">
          <div>{isAuthenticated ? `Welcome, ${user.nickname}!` : 'Welcome, Guest!'}</div>
          {isAuthenticated ? <button onClick={logout}>Logout</button> : <button onClick={loginWithRedirect}>Login or Sign-up!</button> }
        </div>
      </div>
  )
}

export default Header