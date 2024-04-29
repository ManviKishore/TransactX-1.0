/*!

=========================================================
* Now UI Dashboard React - v1.5.2
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useContext } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.scss?v1.5.0";
import "assets/css/demo.css";

import AdminLayout from "layouts/Admin.js";
import Login from "views/Login";
import UserContext, { UserProvider } from "views/Auth/UseContext";
import UserDashboard from "views/UserDashboard";
import ProtectedRoute from "views/Auth/ProtectedRoute";


function App() {
  // const { role } = useContext(UserContext);

  // const root = ReactDOM.createRoot(document.getElementById("root"));

  // const setUserContext = (user) => {
  //   setUser(user);
  // };

  return (

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user" element={<UserDashboard />} />
          {/* <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute 
                element={<AdminLayout />} 
                roles={['admin']} 
              />
            }
          /> */}

          <Route path="/admin/*" element={<AdminLayout />} />
          
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </BrowserRouter>

  );
}

export default App;


