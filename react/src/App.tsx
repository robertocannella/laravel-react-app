import '../styles/_main.scss'
import {useState} from "react";
import {Outlet} from "react-router-dom";
import * as React from "react";


const App: React.FC = () => {
    const [theme, setTheme] = useState("light");
    return (

              <div className="App" id={theme}>
                  <h1>Hello World</h1>
                  <Outlet/>
              </div>

  )
}

export default App
