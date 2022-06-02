import React from "react";
import FadeIn from 'react-fade-in/lib/FadeIn';

const Home = () => {
  return (
    <FadeIn>
      <div className="home">
        <FadeIn>
          <h1>Welcome to the Next Best Story!</h1>
        </FadeIn>
        <p>NBS is a platform that allows parents and grandparents to easily record and share 
          heartwarming and engaging stories with their significant young ones. Reading really
          is an experience best shared with someone close. Now you can be close, even when you're far!</p>
      </div>
    </FadeIn>
  )
}

export default Home