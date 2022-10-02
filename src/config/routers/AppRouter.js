import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Inicio from "../../components/views/Inicio";
import PublicRoute from "./PublicRoute";
import DashboardRoute from "./DashboardRoute";
import { useDispatch, useSelector } from "react-redux";
import { startChecking } from "../../redux/auth.slice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppRouter = () => {
  // const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.auth);

  // useEffect(() => {
    // dispatch(startChecking());
  // }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Inicio />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <DashboardRoute />
            </PrivateRoute>
          }
        />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
      {/*Toast global utility*/}
      <ToastContainer />
    </Router>
  );
};

export default AppRouter;
