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
import FadeIn from 'react-fade-in/lib/FadeIn';


function App() {
  const [userStories, setUserStories] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState('')
  const [selStory, setSelStory] = useState('')

  useEffect(() => updateDb(), [])

  const updateDb = () => {
    fetch('http://localhost:8000/published-stories')
      .then(resp => resp.json())
      .then(data => setUserStories(data))
  }

  const displayedStories = userStories.filter(elem => (
      elem.title.toLowerCase().includes(searchTerm.toLowerCase()) || elem.author.toLowerCase().includes(searchTerm.toLowerCase()) || elem.narrator.toLowerCase().includes(searchTerm.toLowerCase())
  ))

  return (
    <div className="App">
      <Router>
        <Header setLoggedIn={setLoggedIn} setUser={setUser}/>
        <div className='main'>
          <FadeIn>
            <Routes>
              <Route path="/stories" element={<Community stories={displayedStories} setSearchTerm={setSearchTerm}/>} />
              {loggedIn ? <Route path="/yourstories" element={<WriteStories setSelStory={setSelStory} />} /> : null}
              <Route path="/" element={<Home />} />
              {loggedIn ? <Route path="/newstory" element={<NewStoryForm user={user} selStory={selStory} />} /> : null}
            </Routes>
          </FadeIn>
        </div>
      </Router>
    </div>
  );
}

export default App;