import React, {useState, useEffect} from 'react'
import PresetStories from './PresetStories'
import { Link } from 'react-router-dom'

const WriteStories = ({user}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [storyOptions, setStoryOptions] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/stories')
      .then(resp => resp.json())
      .then(data => setStoryOptions(data))
  }, [])

  const displayedStories = storyOptions.filter(elem => (
    elem.title.includes(searchTerm) || elem.author.includes(searchTerm)
  ))

  return (
    <div className="write-stories">
      <PresetStories stories={displayedStories} setSearchTerm={setSearchTerm} />
      <Link to='/newstory'><button>Or Create Your Own Story!</button></Link>
    </div>
  )
}

export default WriteStories