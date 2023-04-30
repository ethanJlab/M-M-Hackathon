import './App.css';
import React, { useState, useEffect } from 'react';
import './index.css';
import { CaseList } from './components/CaseList';
import { FileUpload } from './components/FileUpload';
import { Relatedness } from './components/Relatedness';
import { Chat } from './components/Chat';
import Grid from '@mui/material/Grid';
import { VoiceRecordDialog } from './components/VoiceRecordDialog'
import axios from "axios";


function App() {

  const baseURL = "http://localhost:9000";
  useEffect(() => {
    console.log("Fetching all files");
    // TODO: fetch all case files here
    // http://localhost:9000/vectors/getAll
    (async () => {
      console.log(await axios.get(`${baseURL}/vector/getAll`))
    })();

  }, []);


  return (
    <div className="App bg-gradient-to-b from-black to-gray-300" style={{ height: '100vh', }}>
      {/* <HeaderBar/> */}
      <div className='w-full h-10 bg-black flex justify-center text-center pb-14'>
        <span className='font-mono text-xl mt-3 text-yellow-400'>Better Call GPT</span>
      </div>
      <Grid container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
          <Grid container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{ width: "100%", }}>
              <FileUpload />

            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{ width: "100%", height: "100%" }}>
              <CaseList cases={[1, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]} />

            </Grid>
          </Grid>
        </Grid>

        <Grid item xl={9} lg={9} md={9} sm={9} xs={9}>
          <Chat />

        </Grid>
      </Grid>

      <VoiceRecordDialog />

      {/* <Relatedness /> */}

    </div>
  );
}

export default App;
