import React from "react";

const NewStoryForm = () => {
  return (
    <div className="new-story-form">
      <form onSubmit={null}className="new-story">
        <input type="text" className="title" />
        <input type="text" className="author" />
      </form>
    </div>
  )
}

export default NewStoryForm