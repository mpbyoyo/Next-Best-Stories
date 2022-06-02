import React from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import FadeIn from "react-fade-in/lib/FadeIn";

const Recording = ({title, i}) => {
  return (
    <div className="recording">
      {title ? (
        <FadeIn>
          <ReactMediaRecorder 
            audio
            render={({status, startRecording, stopRecording, mediaBlobUrl}) => (
              <div className="recording">
                <div className="start-recording" onClick={startRecording} style={{'cursor': 'pointer'}}>Start recording</div>
                <div className="stop-recording" onClick={stopRecording} style={{'cursor': 'pointer'}}>Stop recording</div> <br />
                {mediaBlobUrl && <a href={mediaBlobUrl} className='download-narration' download={`${title}_${i}.mp3`} >Download narration</a>} <br />
                <audio className='audio-playback' src={mediaBlobUrl} controls></audio>
              </div>
            )}
          />
        </FadeIn>
      ) : null}
      
    </div>
    
    
  )
}

export default Recording