import React, {useState, useEffect} from 'react'
import PresetStories from './PresetStories'
import { Link } from 'react-router-dom'
import FadeIn from 'react-fade-in/lib/FadeIn';

const WriteStories = ({setSelStory}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [storyOptions, setStoryOptions] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/stories')
      .then(resp => resp.json())
      .then(data => setStoryOptions(data))
  }, [])

  const displayedStories = storyOptions.filter(elem => (
    elem.title.toLowerCase().includes(searchTerm.toLowerCase()) || elem.author.toLowerCase().includes(searchTerm.toLowerCase())
  ))

  return (
    <FadeIn>
      <div className="write-stories">
        <PresetStories stories={displayedStories} setSearchTerm={setSearchTerm} setSelStory={setSelStory} />
        <Link to='/newstory'><button onClick={() => setSelStory('')}>Or Create Your Own Story!</button></Link>
      </div>
    </FadeIn>
  )
}

export default WriteStories