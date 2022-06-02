import React, {useState} from "react";
import Story from "./Story";

const PresetStories = ({setSearchTerm, stories, setSelStory}) => {
  const [search, setSearch] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchTerm(search)
    setSearch('')
  }

  return (
    <div className="preset-stories">
      <div className="select-story">
        <label className='ps-search'>Search by title, author, or narrator!</label>
        <form onSubmit={handleSubmit}>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
          <input type="submit" />
        </form>
        {stories.map((story, i) => {
          return <Story key={i} story={story} setSelStory={setSelStory}/>
        })}
      </div>
    </div>
  )
}

export default PresetStories