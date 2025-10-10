import React from 'react'
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Userlogin from "./Components/User/userlogin";


function App() {
  return (
   <BrowserRouter>
   <div>
    <Routes>
      <Route path='/userlogin' element ={<Userlogin/>}/>
    </Routes>
   </div>
   </BrowserRouter>
  );
}

export default App;
