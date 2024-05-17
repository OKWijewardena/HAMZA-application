import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DeviceList from '../pages/deviceList'; // Changed to DeviceList
import PaymentList from '../pages/PaymentList';
import CustomerList from '../pages/customerList';
import AdminAndEmplaoyeeList from '../pages/admin&emplaoyeeList';

const ReportRoutes = () => {
  return (
    <Routes>
      <Route path="/payment-list" element={<PaymentList />} />
      <Route path="/device-list" element={<DeviceList />} /> 
     <Route path="/customer-list" element={<CustomerList />} />
     <Route path="/AdminEmoloyee-list" element={<AdminAndEmplaoyeeList />} />

    </Routes>
  );
};

export default ReportRoutes;
