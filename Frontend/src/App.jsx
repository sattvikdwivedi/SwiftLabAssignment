import React from "react"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css' 
import Add from "./Add"
import Read from "./Read";
import Update from "./Update";

function App() {

  return (
    <BrowserRouter>
      <Routes>  
        <Route path="/" element={<Home/>}/>
        <Route path="/Add" element={<Add/>}/>
        <Route path="/read/:id" element={<Read />} />
        <Route path="/edit/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
