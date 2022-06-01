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
import WriteStories from './WriteStories';
import NewStoryForm from './NewStoryForm'

function App() {
  const [userStories, setUserStories] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState('')

  useEffect(() => updateDb(), [])

  const updateDb = () => {
    fetch('http://localhost:8000/published-stories')
      .then(resp => resp.json())
      .then(data => setUserStories(data))
  }

  const displayedStories = userStories.filter(elem => (
      elem.title.includes(searchTerm) || elem.author.includes(searchTerm) || elem.narrator.includes(searchTerm)
  ))

  return (
    <div className="App">
      <Router>
        <Header setLoggedIn={setLoggedIn} setUser={setUser}/>
        <div className='main'>
          <Routes>
            <Route path="/community" element={<Community stories={displayedStories} setSearchTerm={setSearchTerm}/>} />
            {loggedIn ? <Route path="/yourstories" element={<WriteStories user={user}/>} /> : null}
            <Route path="/" element={<Home />} />
            <Route path="/newstory" element={<NewStoryForm />}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
