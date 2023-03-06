import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import './index.css';
import '../styles/_main.scss';
import {RouterProvider} from "react-router-dom";
import router from "./router";
import {ContextProvider} from "./contexts/ContextProvider";
import { ThemeProvider} from "./contexts/ThemeContext";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
          <ContextProvider>
              <ThemeProvider>
                      <RouterProvider router={router}/>
              </ThemeProvider>
          </ContextProvider>
  </React.StrictMode>,
)

