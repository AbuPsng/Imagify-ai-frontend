import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { AppContextProvider } from "./context/AppContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AppContextProvider children={<App />} />
  </BrowserRouter>
);
