import React, {useState} from "react";
import FadeIn from "react-fade-in/lib/FadeIn";

const ImagePopup = ({i, pages, setPages, closeImgPopup}) => {
  const [url, setUrl] = useState('')

  const handleClick = (e) => {
    if (e.target.className === 'add-image') {
      if (validateUrl(url)) {
        const newPages = pages.map((elem, index) => {
          return i == index ? (
              {
                audio: elem.audio,
                text: elem.text,
                image: url
              }
            ) : (
              elem
            )
        })
        console.log(newPages)
        setPages(newPages)

        closeImgPopup(false)
        setUrl('')
        alert('Image added!')
      } else {
        alert('Please enter a valid url!')
      }
    } else {
      closeImgPopup(false)
    }
  } 

  const validateUrl = (url) => {
    try {
      new URL(url)
    } catch (e) {
      console.error(e)
      return false
    }
    return true
  }

  const handleChange = (e) => {
    setUrl(e.target.value)
  }

  return (
    <FadeIn>
      <div className="image-popup">
        <label htmlFor="asd" className="url-popup-label" style={{'fontSize': '14px'}}>Please enter the URL of the image you'd like displayed</label> <br />
        <input type="url" name="dd" id="asd" value={url} onChange={handleChange}/> 
        <div className="add-image" onClick={handleClick}>Add Image</div> 
        <div className="close-img-popup" onClick={handleClick}>Close Popup</div>
      </div>
    </FadeIn>
  )
}

export default ImagePopup