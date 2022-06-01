import React, {useState} from "react";
import Story from "./Story";

const Community = ({setSearchTerm, stories}) => {
  const [search, setSearch] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchTerm(search)
    setSearch('')
  }

  return (
    <div className="community">
      <h1>See What People Have Uploaded!</h1>
      <p>Come experince some of these amazing narrated short stories!</p>
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
  )
}

export default Community