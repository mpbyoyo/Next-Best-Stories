import React, {useState, useEffect} from 'react'
import PresetStories from './PresetStories'
import { Link } from 'react-router-dom'
import FadeIn from 'react-fade-in/lib/FadeIn';
import disaster_mode_button from '../disaster_mode_button.png'

const WriteStories = ({setSelStory}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [storyOptions, setStoryOptions] = useState([])
  const [isDisasterModeActive, setDisasterModeActive] = useState(false)

  useEffect(() => {
    fetch('http://localhost:8000/stories')
      .then(resp => resp.json())
      .then(data => setStoryOptions(data))
  }, [])

  const displayedStories = storyOptions.filter(elem => (
    elem.title.toLowerCase().includes(searchTerm.toLowerCase()) || elem.author.toLowerCase().includes(searchTerm.toLowerCase())
  ))

  const handleClick = () => {
    setSelStory('')
  }

  return (
    <FadeIn>
      <div className="write-stories">
        <PresetStories stories={displayedStories} setSearchTerm={setSearchTerm} setSelStory={setSelStory} isDisasterModeActive={isDisasterModeActive} /> <br />
        <Link to='/newstory'><button onClick={handleClick}>Or Create Your Own Story!</button></Link><br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <img src={disaster_mode_button} style={{'width': '100px'}} onClick={() => setDisasterModeActive(true)} />
      </div>
    </FadeIn>
  )
}

export default WriteStories