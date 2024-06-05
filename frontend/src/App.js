
//import logo from "./logo.svg";
import "./App.css";

import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

import Home from "./pages/admin pages/Home/Home";
import Customer from "./pages/admin pages/Customer/Customer";
import Device from "./pages/admin pages/Device/Device";
import { Login } from "./pages/Login/Login";
import {Forget_password}  from "./pages/Login/Forget_password";
import CustomerList from "./pages/admin pages/List/customerList";
import DeviceList from "./pages/admin pages/List/DeviceList"
import EmployeeList from"./pages/admin pages/List/EmployeeList"


function App() {
  return (
    <div>
      {/* <UpdateItems/> */}

      <Routes>
     
      <Route exact path="/" element={<Login/>}/>
      <Route exact path ="/CustomerList"element={<CustomerList/>}/>
      <Route exact path ="/EmployeeList"element={<EmployeeList/>}/>
      <Route exact path ="/DeviceList"element={<DeviceList/>}/>
      <Route exact path="/Forget_password" element={<Forget_password/>}/>
      <Route exact path="/home" element={<Home/>} />
      <Route exact path="/customer" element={<Customer/>} />
      <Route exact path="/device" element={<Device/>} />
       
      </Routes>
    </div>
  );
}

export default App;
