import React from "react";
import FadeIn from "react-fade-in/lib/FadeIn";
import Page from "./Page";

const StoryNotSlides = ({story}) => {
  const {title, author, narrator, pages} = story

  return (
    <div className="story-not-slides">
      <FadeIn>
      <h1 className="story-not-slides-title">{title}</h1>
      </FadeIn>
      <FadeIn>
      <h2 className="story-not-slides-author">{author}</h2>
      </FadeIn>
      <FadeIn>
      <h2 className="story-not-slides-narrator">Narrated by {narrator}</h2>
      </FadeIn>
      {pages && pages.map((elem, i) => (
        <FadeIn delay={200 * i}>
          <Page key={i} page={elem}/>
        </FadeIn>
      ))}
    </div>
  )
}

export default StoryNotSlides