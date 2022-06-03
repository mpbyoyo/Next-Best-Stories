import React from "react";
import FadeIn from "react-fade-in/lib/FadeIn";

const Page = ({page}) => {
  const {text, image, audio} = page

  console.log(page)

  return (
    <FadeIn>
      <div className="not-slide-page">
        {text && <p className="not-slide-page-text">{text}</p>}
        {image && <img className="not-slide-page-img" src={image} alt={text}></img>} <br />
        {audio && <audio src={audio} className="not-slide-page-audio" controls></audio>}
      </div>
    </FadeIn>
  )
}

export default Page