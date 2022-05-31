import React from "react";
import Reveal from 'reveal.js'
import Slide from "./Slide";
import '../../node_modules/reveal.js/dist/reset.css';
import '../../node_modules/reveal.js/dist/reveal.css';
import '../../node_modules/reveal.js/dist/theme/black.css';

const StorySlides = ({userStory}) => {
   
  const renderSlides = () => {
      Reveal.initialize({
        width: 500,
        height: 500,
        embedded: true,
        autoPlayMedia: true
      })
  }
  
  return (
    <div className='slides'>
      <div className="reveal">
        <div className="slides">
          <section>{userStory.title}</section>
          {userStory !== undefined ? userStory.pages.map((elem) => (
            <Slide key={userStory.pages.indexOf(elem)} text={elem.text} audio={elem.audio} img={elem.image} />
          )) : null}
        </div>
      </div>
      <button onClick={renderSlides}>Click to render</button>
      <button onClick={() => Reveal.destroy()}>Click to destroy</button>
    </div>
  )
}

export default StorySlides