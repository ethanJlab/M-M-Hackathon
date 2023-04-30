import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { FancyButton } from "./utils/FancyButton";
//import FileReader from 'filereader';
const fileTypes = ["JPG", "PNG", "GIF","txt","PDF"];

export function FileUpload() {
  const [file, setFile] = useState(null);

  const handleChange = async (file) => {
    setFile(file);
    console.log(await file.text());
    await fetch('http://localhost:9000/vector/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        body: JSON.stringify({
          "content": await file.text()
        })
      })
  };

  useEffect(() => {
    // TODO: call endpoint to upload file here
  }, [file])

  return (
    <div className="bg-gradient-to-b from-zinc-950 to-zinc-800" style={{
      // display: 'flex',
      // justifyContent: 'center',
      // alignItems: 'center',
      paddingLeft: "8px",
      paddingRight: "8px",
      paddingTop: "8px",
      paddingBottom: "8px",
      height: '100%',
      width: "100%"
    }}>
      <FileUploader

        handleChange={handleChange}
        name="file"
        types={fileTypes}
        hoverTitle=""
        dropMessageStyle={{ display: "none" }}
        children={
          <Button

            style={{
              width: '100%',
              height: '50px',
              borderRadius: "10px",
              border: "2px solid #18181b",
              color: "#facc15"
            }}
          >
            <AddIcon className="text-yellow-400" /> Upload new File
          </Button>
        }
      />
    </div>
  );
}

