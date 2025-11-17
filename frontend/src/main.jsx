// main.jsx or index.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import CreateUserProvider from "./contexts/createUserProvider.jsx";
import { CartProvider } from "./contexts/cartcontext.jsx";
import { SearchProvider } from "./contexts/SearchContext.jsx"; // ⬅️ ADD THIS

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CreateUserProvider>
        <CartProvider>
          <SearchProvider>       {/* ⬅️ FIX: Wrap your entire app */}
            <App />
          </SearchProvider>
        </CartProvider>
      </CreateUserProvider>
    </BrowserRouter>
  </StrictMode>
);