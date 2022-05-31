import React from "react";

const Slide = ({text, audio, img}) => {
  return (
      <section>
        <section><p style={{'font-size': '20px'}}>{text}</p></section>
        {img ? <section><img src={img}></img></section> : null}
      </section>
  )
}

export default Slide