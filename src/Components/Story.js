import React from "react";
import {Link} from "react-router-dom";

const Story = ({story, setSelStory, isDisasterModeActive}) => {
  const {title, author, narrator} = story


  const handleClick = () => {
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
      {narrator && <p className="narrator-user">Narrated by: {narrator}</p>}
      {!narrator && <Link to="/newstory"><button onClick={handleClick}>Narrate This Story</button></Link>}
    </div>
  )
}

export default Story