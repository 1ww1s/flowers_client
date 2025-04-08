import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { router } from './app/router/router';
import { Provider } from 'react-redux';
import store from './app/store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const browserRouter = createBrowserRouter(router)
 

root.render(
  <Provider store={store}>
    <RouterProvider router={browserRouter} /> 
  </Provider>
);

