import React from "react";
import FadeIn from 'react-fade-in/lib/FadeIn';

const Home = () => {
  return (
    <FadeIn>
      <div className="home">
        <FadeIn>
          <h1>Welcome to Next Best Stories!</h1>
        </FadeIn>
        <p>If reading aloud, in person, is "the best", the next best is to read a
          story for someone to enjoy over and over again later on.</p>

        <p>You can do that with "Next Best Stories"!</p>

        <p>Just pick a title (or write your own story!)
          and read it through.</p>

        <p>You will create a timeless gift for your special friend.</p>

        <p>Now you can be close, even when you're far!</p>
      </div>
    </FadeIn>
  )
}

export default Home