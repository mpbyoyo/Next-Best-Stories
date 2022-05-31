import '../App.css';
import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Header from './Header';
import StorySlides from './StorySlides';
import Home from './Home'
import Community from './Community';

function App() {
  const [userStories, setUserStories] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    fetch('http://localhost:8000/user-stories')
      .then(resp => resp.json())
      .then(data => setUserStories(data))
  }, [])

  return (
    <div className="App">
      <Router>
        <Header setLoggedIn={setLoggedIn} />
        <div className='main'>
          <Routes>
            <Route path="/community" element={<Community />} />
            {loggedIn ? <Route path="/storyslides" element={userStories[0] ? <StorySlides userStory={userStories[0]} /> : null}/> : null}
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
