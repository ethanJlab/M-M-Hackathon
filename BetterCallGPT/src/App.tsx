import React from 'react';
import logo from './logo.svg';
import './App.css';
import Relatedness from './Relatedness'
import { CaseList } from './components/CaseList';


function App() {
  return (
    <>
    
   {/* <Relatedness></Relatedness> */}
    <div style={{height:"200px"}}>
      <CaseList cases={[1, 2, 3]}/>
    </div>
    </>
  );
}

export default App;
