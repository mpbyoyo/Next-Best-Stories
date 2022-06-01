import React from "react";
import {Link} from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
// import axios from 'axios'

const Header = ({setLoggedIn, setUser}) => {
  const {loginWithRedirect, logout, user, isAuthenticated, /*getAccessTokenSilently*/} = useAuth0()
  
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
      <h1>Next Best Stories</h1>
      {/* <button onClick={callApi}>api</button>
      <button onClick={callProtectedApi}>protected</button> */}
      <div className="navigation">
        <nav>
          <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/community">Stories</Link>
              </li>
            {isAuthenticated ? (
              <li>
                <Link to="/yourstories">Publish Story</Link>
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