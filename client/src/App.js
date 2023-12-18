
import React from 'react-dom';
import Navbar from "./Components/Navbar";
import Register from "./Components/Register";
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Home from './Components/Home';
import AboutMe from './Components/AboutMe';
import Login from './Components/Login';
import Erorr from './Components/Erorr';
import Logout from './Components/logout';
import Contact from './Components/Contact';


function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route exact path="/" Component={Home}></Route>
      <Route exact path="/contact" Component={Contact}></Route>
      <Route exact path="/login" Component={Login}></Route>
      <Route exact path="/aboutme" Component={AboutMe}></Route>
      <Route exact path="/register" Component={Register}></Route>
      <Route exact path="/logout" Component={Logout}></Route>
      <Route  Component={Erorr}></Route>
    </Routes>

    </BrowserRouter>
   

    </>
    
  );
}

export default App;
