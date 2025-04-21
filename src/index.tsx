import ReactDOM from 'react-dom/client';
import './index.css';
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

