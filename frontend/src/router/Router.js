// src/router/Router.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReportRoutes from './reportRoutes';

const AppRouter = () => {
  return (
    <Router>
      {/* Other routes here */}
      <ReportRoutes />
    </Router>
  );
};

export default AppRouter;
