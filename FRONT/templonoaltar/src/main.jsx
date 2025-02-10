import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/home/index.jsx"; // Página inicial
import Culto_Oracao from "./pages/Culto_Oracao/Culto_Oracao.jsx"; // Página Culto de Oração
import Execucao from "./pages/Execucao/Execucao.jsx";
import HeaderComponent from "./components/Header/HeaderComponent.jsx";
import FooterComponent from "./components/Footer/FooterComponent.jsx";
import ContentComponent from "./components/Content/ContentComponet.jsx";
import Login from "./pages/Login/Login.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>

      <HeaderComponent />
      <ContentComponent />
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Culto_Oracao" element={<Culto_Oracao />} />
        <Route path="/Execucao" element={<Execucao />} />
        <Route path="/Login" element={<Login />} />

      </Routes>

      <FooterComponent />

    </Router>
  </StrictMode>
);
