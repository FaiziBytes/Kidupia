// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom'
// import CreateUserProvider from '../contexts/createUserProvider.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//     <CreateUserProvider>
//     <App />
//     </CreateUserProvider>
//     </BrowserRouter>
//   </StrictMode>,
// )


// ✅ main.jsx or index.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import CreateUserProvider from "./contexts/createUserProvider.jsx";


// 🔹 Add curly braces if it's a named export

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CreateUserProvider>
        <App />
      </CreateUserProvider>
    </BrowserRouter>
  </StrictMode>
);

