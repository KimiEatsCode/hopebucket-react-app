
import * as React from 'react';
import ReactDOM from 'react-dom/client';
//css
import "./styles/index.css";
//bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";

//components
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(<App />);
