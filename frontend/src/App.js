
import logo from "./logo.svg";
import "./App.css";

import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/admin pages/Home/Home";
import Customer from "./pages/admin pages/Customer/Customer";
import Device from "./pages/admin pages/Device/Device";
import Employee from "./pages/admin pages/Employee/Employee";
import Payment from "./pages/admin pages/Payment/Payment";
import Selling from "./pages/admin pages/Selling/Selling";


function App() {
  return (
    <div>
      {/* <UpdateItems/> */}

      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/customer" element={<Customer/>} />
        <Route exact path="/device" element={<Device/>} />
        <Route exact path="/employee" element={<Employee/>} />
        <Route exact path="/payment" element={<Payment/>} />
        <Route exact path="/selling" element={<Selling/>} />

      </Routes>
    </div>
  );
}

export default App;
