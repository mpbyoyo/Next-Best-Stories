import React from "react";
import {Link} from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

const Header = ({setLoggedIn}) => {
  const {loginWithRedirect, logout, user, isAuthenticated} = useAuth0()

  setLoggedIn(isAuthenticated)

  return (
    <div className="header">
      <h1>Next Best Story</h1>
      <div className="navigation">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/community">Community</Link>
            </li>
            {isAuthenticated ? (
              <li>
                <Link to="/storyslides">Story Slides</Link>
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