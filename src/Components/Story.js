import React from "react";
import {Link} from "react-router-dom";

const Story = ({story, setSelStory, isDisasterModeActive}) => {
  const {title, author, narrator, id} = story

  const handleNarrate = () => {
    if (isDisasterModeActive) {
      fetch('http://localhost:8000/published-stories', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(story)
    })
      .then(alert('Disaster Mode Activated'))
    } else {
      setSelStory(story)
    }
  }

  return (
    <div className="story">
      <h1 className="story-title">{title}</h1>
      <p className="author-name">Written by: {author}</p>
      {narrator && <p className="narrator-user">Narrated by: {narrator}</p>} <br />
      {narrator && <Link to={`/readstory/${id}`}><button>Click here to read this story</button></Link>}
      {!narrator && <Link to="/newstory"><button onClick={handleNarrate}>Narrate This Story</button></Link>}
    </div>
  )
}

export default Story