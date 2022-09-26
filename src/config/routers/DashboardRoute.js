import React from 'react';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Dashboard from '../../components/views/Dashboard/Dashboard';

const DashboardRoute = () => {
  const userLogged = JSON.parse(localStorage.getItem("user_logged"));
  return (
    <>
      <Routes>
        {/*<Route path='/'  element={userLogged[0].type_user === 'cliente' ? <HeaderUser/> : <HeaderAdmin/> }>*/}
        <Route path='/' >
          <Route index element={<Dashboard/>}/>
          {/*<Route  path='crearusuario' element={ <CrearUsuarioAdmin/> }/>*/}

          {/*<Route path='*' element={ <Navigate replace to='/'/> }/>*/}
        </Route>
      </Routes>
    </>
  );
};

export default DashboardRoute;
