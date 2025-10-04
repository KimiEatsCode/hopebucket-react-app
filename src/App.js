import React from "react";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
//css

import "./styles/index.css";
// I use this React Bootstrap for grid https://react-bootstrap.netlify.app/docs/layout/grid/
//bootstrap react components
import "bootstrap-icons/font/bootstrap-icons.css";
//components
import List from "./components/List";
import Nav from "./components/Nav";
import Bucket from "./components/Bucket";

//context
import { ListContextProvider } from "./contexts/ListContext";
import { ExpContextProvider } from "./contexts/ExpContext";

function App() {
  return (
    <>      
    <ExpContextProvider>
      <ListContextProvider>
        <BrowserRouter>

          <div className="container">
               <div class="row"  xs={2} md={4} lg={6}>
                     
            <Link to="/">
              <h1 className="logoName mb-2 mt-4">HopeBucket</h1>
            </Link>

            <Routes>
              <Route path="/" element={<Bucket/>} />
              <Route path="/bucket" element={<Bucket />} />
              <Route path="/list" element={<List />} />
            </Routes>
         
        </div>

            <Nav></Nav>
          </div>
        </BrowserRouter>
        <Outlet />
      </ListContextProvider>
    </ExpContextProvider>
    </>
  );
}

export default App;
