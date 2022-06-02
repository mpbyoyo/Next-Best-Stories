import React, {useState} from "react";
import Story from "./Story";
import FadeIn from 'react-fade-in/lib/FadeIn';

const Community = ({setSearchTerm, stories}) => {
  const [search, setSearch] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchTerm(search)
    setSearch('')
  }

  return (
    <FadeIn>
      <div className="community">
        <FadeIn>
        <h1>See What People Have Uploaded!</h1>
        <p>Come experince some of these amazing narrated short stories!</p>
        </FadeIn>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            className="story-search" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
          />
          <button type="submit">Search</button>
        </form>
        <div className="story-container">
          {stories.map((story, i) => (
            <Story key={i} story={story} />
          ))}
        </div>
      </div>
    </FadeIn>
  )
}

export default Community