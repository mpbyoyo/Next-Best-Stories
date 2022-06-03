import React, {useState, useEffect} from "react";
import FadeIn from 'react-fade-in'
import {storage} from '../base'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import ImagePopup from "./ImagePopup";
import Recording from './Recording';

const NewStoryForm = ({user, selStory}) => {
  const [imagePopup, setImagePopup] = useState(false)
  const [addedImage, setAddedImage] = useState({})
  const [formData, setFormData] = useState({
    title: '',
    author: '',
  })

  const [disasterPages, setDisasterPages] = useState([])

  const [page, setPage] = useState({
    audio: '',
    text: '',
    image: ''
  })

  const [pages, setPages] = useState([1])

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
    setPages([...pages, 1])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let refrence;
    if (newTale || formData.title) {
      const narratedPages = pages.map((elem, i) => {
        const url = `https://firebasestorage.googleapis.com/v0/b/nbs-storage.appspot.com/o/${user}%2F${formData.title.replace(/\s+/g, '%20')}%2Faudio%2F${formData.title.replace(/\s+/g, '_')}_${i}.mp3?alt=media`
        return ({
          text: '',
          image: '',
          audio: url, 
        }) 
      })

      console.log(formData)
      const newStory = {
        title: formData.title,
        author: formData.author,
        narrator: user,
        pages: []
      }
      console.log(newStory)
      console.log(newTale)
      setFormData({
        title: '',
        author: '',
      })
    } else if (!newTale) {
      const narratedPages = pages.map( async (elem, i) => {
        const audioRef = ref(storage, `${user}/${selStory.title}/audio/${selStory.title.replace(/\s+/g, '_')}_${i}.mp3`)
        return await getDownloadURL(audioRef)
          .then(url => url)
      })

      console.log(narratedPages)

      const newStory = {
        title: selStory.title,
        author: selStory.author,
        narrator: user,
        pages: narratedPages
      }

      console.log(newStory)
    } else {
      alert('Please enter a title!')
    }
  }

  const closeImgPopup = (v) => {
    setImagePopup()
  }

  const handleFile = (e) => {
    if (!newTale || formData.title) {
      const file = e.target.files[0]
      const storageRef = ref(storage, `${user}/${newTale ? formData.title : selStory.title}/audio/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file);
      alert('Narration uploaded!')
    } else {
      alert('Please add a title before uploading narration!')
    }
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
          {pages.map((elem, i) => (
            !newTale ? (
              <div key={i}>
                <label htmlFor={`page${i+1}`}>{`Page ${i+1}:`}</label> <br />
                <textarea name={`page${i+1}`} cols="30" rows="10" value={elem.text} readOnly></textarea> 
                <img src={elem.image ? elem.image : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'} /><br />
                <Recording title={selStory.title.replace(/\s+/g, '_')} i={i} />
                <input className='file-uploader' type="file" onChange={handleFile}/> <br />
              </div>
            ) : (
              <div key={i}>
                <label htmlFor={`page${i+1}`}>{`Page ${i+1}:`}</label> <br />
                <textarea name={`page${i+1}`} cols="30" rows="10"></textarea>
                <img className={i} src={addedImage[i] ? addedImage[i] : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'} onClick={handleImage}/><br />
                {imagePopup == i && <ImagePopup i={i} setAddedImage={setAddedImage} closeImgPopup={closeImgPopup}/>}
                <Recording title={formData.title.replace(/\s+/g, '_')} i={i} />
                <input className='file-uploader' type="file" onChange={handleFile}/> <br />
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