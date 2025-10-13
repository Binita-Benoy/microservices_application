import React from 'react'
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Userlogin from "./Components/User/userlogin";
import UserRegistration from './Components/User/Userregistration';
import BirthApplication from './Components/User/BirthApplication';
import VRegister from './Components/User/VehicleRegistration';
import SubmittedPage from './Components/User/SubmittedPage';

function App() {
  return (
   <BrowserRouter>
   <div>
    <Routes>
      <Route path='/userlogin' element ={<Userlogin/>}/>
      <Route path='/ureg' element={<UserRegistration/>}/>
      <Route path='/bapp' element={<BirthApplication/>}/>
      <Route path='/vreg' element={<VRegister/>}/>
      <Route path='/submitted' element={<SubmittedPage />}/>
    </Routes>
   </div>
   </BrowserRouter>
  );
}

export default App;
