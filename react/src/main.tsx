import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {RouterProvider} from "react-router-dom";
import router from "./router";
import {ContextProvider} from "./contexts/ContextProvider";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <ContextProvider>

         <RouterProvider router={router}/>

      </ContextProvider>
  </React.StrictMode>,
)
