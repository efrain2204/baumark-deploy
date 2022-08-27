import React from 'react';
import {Navigate} from "react-router-dom";

const PrivateRoute = ({children}) => {
  const userLogged = localStorage.getItem("user_logged");
  return (
    (userLogged)
      ? children
      : <Navigate to="/"/>
  );
};

export default PrivateRoute;
