import React from "react";
import {Link} from "react-router-dom";

const Story = ({story}) => {
  const {title, author, narrator} = story

  return (
    <div className="story">
      <h1 className="story-title">{title}</h1>
      <p className="author-name">Written by: {author}</p>
      {narrator && <p className="narrator-user">Narrated by: {narrator}</p>}
      {!narrator && <Link to="/home"><button>Narrate This Story</button></Link>}
    </div>
  )
}

export default Story