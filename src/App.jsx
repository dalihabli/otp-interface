import React from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Challenge41 from './Components/Challenge/Challenge41'



const App = () => {
  return (
    <Routes>
      

      <Route path='/challenge41' element={<Challenge41/>}/>
    

    </Routes>
  )
}

export default App