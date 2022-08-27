import React from 'react';
import AppRouter from "./config/routers/AppRouter";
import {Provider} from "react-redux";
import store from "./redux/store";

const HStoreApp = () => {
  return (
    <Provider store={store}>
      <AppRouter/>
    </Provider>
  );
};

export default HStoreApp;
