import * as React from 'react';
import { useState, useRef } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';


export function VoiceRecordDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={"sm"}
        fullWidth={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Ask a Question"}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description" style={{textAlign:"center"}}>
              <Button style={{height:"100px", width:"100px"}}>
                <MicIcon style={{height:"100px", width:"100px"}}/>
                <StopIcon style={{height:"100px", width:"100px"}}/> 
              </Button>
          </DialogContentText> */}
          <AudioRecorder/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


const mimeType = "audio/webm";

function AudioRecorder( props ) {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const [audioText, setAudioText] = useState("testing");

  const startRecording = async () => {
    setRecordingStatus("recording");
    //create new Media recorder instance using the stream
    const media = new MediaRecorder(stream, { type: mimeType });
    //set the MediaRecorder instance to the mediaRecorder ref
    mediaRecorder.current = media;
    //invokes the start method to start the recording process
    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
       if (typeof event.data === "undefined") return;
       if (event.data.size === 0) return;
       localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const getMicrophonePermission = async () => {
      if ("MediaRecorder" in window) {
          try {
              const streamData = await navigator.mediaDevices.getUserMedia({
                  audio: true,
                  video: false,
              });
              setPermission(true);
              setStream(streamData);
          } catch (err) {
              alert(err.message);
          }
      } else {
          alert("The MediaRecorder API is not supported in your browser.");
      }
  };

  const stopRecording = () => {
    setRecordingStatus("inactive");
    //stops the recording instance
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      //creates a blob file from the audiochunks data
       const audioBlob = new Blob(audioChunks, { type: "webm" });
      //creates a playable URL from the blob file.
       const audioUrl = URL.createObjectURL(audioBlob);
       setAudio(audioUrl);
       console.log(audioUrl)
       setAudioChunks([]);

       // TODO: send blob to end point here and save response to useState
    };
  };


  async function saveAudioBlobToFile(audioBlob, filePath) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: "recording.webm",
        types: [
          {
            description: "WebM audio file",
            accept: {
              "audio/webm": [".webm"],
            },
          },
        ],
      });

      console.log("showing handle");
      console.log(handle);
  
      const writable = await handle.createWritable();
      await writable.write(audioBlob);
      await writable.close();
  
      console.log("Audio saved to file: " + handle.name);
    } catch (err) {
      console.error(err);
    }
  }

  console.log(audio)
  return (
      <>
          <div className="audio-controls" style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
          }}>
            {!permission ? (
                <Button onClick={getMicrophonePermission} type="button">
                    Allow Audio Recording {typeof(audio)}
                </Button>
              ) : null}
              {permission && recordingStatus === "inactive" && !audio ? (
                <Button onClick={startRecording} style={{height:"100px", width:"100px"}}>
                  <MicIcon style={{height:"100px", width:"100px"}}/>
                </Button>
              ) : null}
              {recordingStatus === "recording" ? (

                <Button onClick={stopRecording} style={{height:"100px", width:"100px"}}>
                  <StopIcon style={{height:"100px", width:"100px"}}/> 
                </Button>
              
            ) : null}
        </div>
        {audio ? (
          <>
          <div 
            className="audio-container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
          }}>
            <OutlinedInput 
              value={audioText}
              rows={4}
              multiline
              size="large"
              style={{width:"100%"}}
              onChange={(event) => {
                setAudioText(event.target.value);
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormHelperText>Verify/update response</FormHelperText>
          </div>
          </>
        ) : null}

      </>
  );
};