import React, {useState, useEffect} from "react";
import FadeIn from 'react-fade-in'

const NewStoryForm = ({user, selStory}) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    pages: []
  })

  const [page, setPage] = useState({
    audio: '',
    text: '',
    image: ''
  })

  const [pages, setPages] = useState([1])

  const [isRecording, setIsRecording] = useState(false)

  const newTale = !selStory

useEffect(() => {
  if (!newTale) {
    setPages(selStory.pages)
    setFormData({
      ...formData,
      pages: selStory.pages
    })
  }
}, [])
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleClick = () => {
    console.log(selStory)
    setPages([...pages, 1])
  }

  const handleAudioClick = (e) => {
    console.log(e.target.id)
    if (e.target.className == 'recording') {
      setIsRecording(true)
      const newPages = pages.map((elem, i) => {
        if (i == e.target.id) {
          return {audio: `url${0}`, image: `${elem.image}`, text: `${elem.text}`}
        } else {
          return elem
        }
      })
      console.log(newPages)
      // setPages(newPages)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target)
    if (e.target.value) {
      console.log(formData)
      console.log(newTale)
      setFormData({
        title: '',
        author: '',
      })
    }
  }

  return (
    <div className="new-story-form">
      <h1>{newTale ? 'Write and narrate your own story!' : `Narrate ${selStory.title}!`}</h1>
      <p>WARNING: Writing/Recording progress does NOT save until the entire thing is submitted.</p>
      <form onSubmit={handleSubmit} className="new-story">
        <label htmlFor="title">Title:</label><br />
        {newTale ? (
          <input type="text" name='title' className="title" onChange={handleChange} value={formData.title} /> 
        ) : (
          <input type="text" name='title' className="title" value={selStory.title} readOnly/>
        )} <br />
        <label htmlFor="author">Author:</label><br />
        {newTale ? (
          <input type="text" name='author' className="author" onChange={handleChange} value={formData.author} />
        ) : (
          <input type="text" name='title' className="title" value={selStory.author} readOnly/>
        )} <br />
        <label htmlFor="narrator">Narrator:</label><br />
        <input type="text" className="narrator" value={user} readOnly/> <br />
        <FadeIn>
          {pages.map((elem, i) => (
            !newTale ? (
              <div key={i}>
                <label htmlFor={`page${i+1}`}>{`Page ${i+1}:`}</label> <br />
                <textarea name={`page${i+1}`} cols="30" rows="10" value={elem.text} readOnly></textarea> <img src={elem.image ? elem.image : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'} /><br />
                {!isRecording ? (
                  <div>
                    <div 
                    id={`${i}`} 
                    className='recording' 
                    onClick={handleAudioClick} 
                    style={{backgroundColor: 'red', cursor: 'pointer'}}>
                    Record
                    </div><br />
                  </div>
                ) : (
                  <div></div>
                  )}
              </div>
            ) : (
              <div key={i}>
                <label htmlFor={`page${i+1}`}>{`Page ${i+1}:`}</label> <br />
                <textarea name={`page${i+1}`} cols="30" rows="10"></textarea> <br />
              </div>
            )
          )
          )} <br />
        </FadeIn>
        {newTale && <div><img 
        className='add-page' 
        onClick={handleClick} 
        src="https://icons-for-free.com/download-icon-create+cross+math+new+plus+sign+icon-1320184123539846316_512.png"
        /><br /></div>}
        <input type="submit" value={newTale ? `Click to submit your story!` : `Click to submit your narration!`} />
      </form>
    </div>
  )
}

export default NewStoryForm