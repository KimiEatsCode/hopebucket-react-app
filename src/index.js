
import { createRoot } from 'react-dom/client';
//css
import "./styles/index.css";
//bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";

//components
import App from "./App";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
