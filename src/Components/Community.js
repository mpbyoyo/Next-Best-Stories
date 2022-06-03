import React, {useState, useEffect} from "react";
import Story from "./Story";
import FadeIn from 'react-fade-in/lib/FadeIn';

const Community = ({setSearchTerm, stories, updateDb}) => {
  const [search, setSearch] = useState('')
  useEffect(() => updateDb(), [])
  

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
        <p>Come experience some of these amazing narrated short stories!</p>
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
  // Maybe this is related to your note that creating your own
  // story isn't a thing yet?:
  // Story runs as: const Story = ({story, setSelStory})
  // so do we need to include param of 'setSelStory' above?
}

export default Community
