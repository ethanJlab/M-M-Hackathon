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

const fileTypes = ["JPG", "PNG", "GIF"];

export function FileUpload() {
  const [file, setFile] = useState(null);

  const handleChange = (file) => {
    setFile(file);
  };

  useEffect(() => {
    // TODO: call endpoint to upload file here
  }, [file])
  
  return (
    <div  style={{width:"100%", height:"100px", '&:hover': {
        backgroundColor: 'inherit',
    },
    '&:active': {
        backgroundColor: 'inherit',
    },
    '&:focus': {
        backgroundColor: 'inherit',
    },}}> 
        {/* <FancyButton/> */}
        <FileUploader handleChange={handleChange} name="file" types={fileTypes} hoverTitle=""
        dropMessageStyle = {
            {display:"none"}
        }
        children={
            <Button
                style={{
                    width: '100%',
                    height: '100px',
                    '&:hover': {
                        backgroundColor: 'inherit',
                    },
                    '&:active': {
                        backgroundColor: 'inherit',
                    },
                    '&:focus': {
                        backgroundColor: 'inherit',
                    },
                }}
            >
                <AddIcon />
            </Button>
        }/>
    </div>
  );
}

