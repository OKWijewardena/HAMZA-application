
//import logo from "./logo.svg";
import "./App.css";

import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

import Home from "./pages/admin pages/Home/Home";
import Customer from "./pages/admin pages/Customer/Customer";
import Device from "./pages/admin pages/Device/Device";
import { Login } from "./pages/Login/Login";




function App() {
  return (
    <div>
      {/* <UpdateItems/> */}

      <Routes>
     
      <Route exact path="/" element={<Login/>}/>
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/customer" element={<Customer/>} />
        <Route exact path="/device" element={<Device/>} />
       
      </Routes>
    </div>
  );
}

export default App;
