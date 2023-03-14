import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import './index.css';
import '../styles/_main.scss';

import {RouterProvider} from "react-router-dom";
import router from "./router";

import {ContextProvider} from "./contexts/ContextProvider";
import { ThemeProvider} from "./contexts/ThemeContext";
import mobileRouter from "./mobile-router";

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {
    /* your code here */
}
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      {isMobile ? (
              <ContextProvider>
                  <ThemeProvider>
                      <RouterProvider router={router}/>
                  </ThemeProvider>
              </ContextProvider>
      )
          : (
            <ContextProvider>
                  <ThemeProvider>
                      <RouterProvider router={router}/>
                  </ThemeProvider>
            </ContextProvider>
          )}

  </React.StrictMode>,
)

