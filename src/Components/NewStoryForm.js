import React, {useState, useEffect} from "react";
import FadeIn from 'react-fade-in'
import {storage} from '../base'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import ImagePopup from "./ImagePopup";
import Recording from './Recording';
import { useNavigate } from "react-router-dom";

const NewStoryForm = ({user, selStory}) => {
  const [imagePopup, setImagePopup] = useState(false)
  const [addedImage, setAddedImage] = useState({})
  const [audioUrl, setAudioUrl] = useState({});
  const [progresspercent, setProgresspercent] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
  })

  const [pages, setPages] = useState(
    [
      {
        audio: '',
        text: '',
        image: '',
      }
    ]
  )

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

  const handleImage = (e) => {
    setImagePopup(e.target.className)
  }

  const handleClick = () => {
    console.log(selStory)
    setPages([...pages, {
      audio: '',
      text: '',
      image: ''
    }])
  }

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newTale || formData.title) {
      const narratedPages = pages.map((elem, i) => {
        return audioUrl[i] ? (
          {
            ...elem,
            audio: audioUrl[i]
          }
        ) : (
          elem
        ) 
      })

      const newStory = {
        title: formData.title,
        author: formData.author,
        narrator: user,
        pages: narratedPages
      }

      fetch('http://localhost:8000/published-stories', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newStory)
      })
    
      setFormData({
        title: '',
        author: '',
      })
      setPages([{
        audio: '',
        text: '',
        image: ''
      }])
      alert('Story submitted!')
      navigate('/stories')
    } else if (!newTale) {
      const narratedPages = pages.map((elem, i) => {
        return audioUrl[i] ? (
          {
            ...elem,
            audio: audioUrl[i]
          }
        ) : (
          elem
        ) 
      })

      const newStory = {
        title: selStory.title,
        author: selStory.author,
        narrator: user,
        pages: narratedPages
      }

      fetch('http://localhost:8000/published-stories', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newStory)
      })

      setPages([{
        audio: '',
        text: '',
        image: ''
      }])
      alert('Story submitted!')
      navigate('/stories')
    } else {
      alert('Please enter a title!')
    }
  }

  const closeImgPopup = (v) => {
    setImagePopup()
  }

  const handleFile = (e, i) => {
    if (!newTale || formData.title) {
      const file = e.target.files[0]
      const storageRef = ref(storage, `${user}/${newTale ? formData.title : selStory.title}/audio/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed",
        (snapshot) => {
          const progress =
            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgresspercent(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setAudioUrl({
              ...audioUrl,
              [i]: downloadURL
            })
          });
        }
      )
      alert('Narration uploaded!')
    } else {
      alert('Please add a title before uploading narration!')
    }
  }

  const handleVarChange = (e, i) => {
    const newPages = pages.map((elem, index) => {
      return i == index ? (
          {
            audio: elem.audio,
            text: e.target.value,
            image: elem.image
          }
        ) : (
          elem
        )
    })
    console.log(newPages)
    setPages(newPages)
  }

  return (
    <div className="new-story-form">
      <h1>{newTale ? 'Write and narrate your own story!' : `Narrate ${selStory.title}!`}</h1>
      <p>WARNING: Progress does NOT save until the entire thing is submitted.</p>
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
          {pages.map((elem, i) => {
            return !newTale ? (
              <div key={i}>
                <label htmlFor={`page${i+1}`}>{`Page ${i+1}:`}</label> <br />
                <textarea name={`page${i+1}`} cols="30" rows="10" value={elem.text} readOnly></textarea> 
                <img src={elem.image ? elem.image : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'} /><br />
                <Recording title={selStory.title.replace(/\s+/g, '_')} i={i} />
                <input className='file-uploader' type="file" onChange={(e) => handleFile(e, i)} /> <br />
              </div>
            ) : (
              <div key={i}>
                <label htmlFor={`page${i+1}`}>{`Page ${i+1}:`}</label> <br />
                <textarea name={`page${i+1}`} className='text' cols="30" rows="10" value={pages[i].text} onChange={(e) => handleVarChange(e, i)}></textarea>
                <img className={i} src={pages[i].image ? pages[i].image : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'} onClick={handleImage}/><br />
                {imagePopup == i && <ImagePopup i={i} pages={pages} setPages={setPages} closeImgPopup={closeImgPopup}/>}
                <Recording title={formData.title.replace(/\s+/g, '_')} i={i} />
                <input className='file-uploader' type="file" onChange={(e) => handleFile(e, i)}/> <br />
              </div>
            )
          }
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