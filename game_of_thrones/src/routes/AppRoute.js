import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home.js";
import Houses from "../pages/Houses/Houses.js";
import Characters from "../pages/Characters/Characters.js";
import Character from "../pages/Character/Character.js";

export default function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Home />} />
      <Route path="/characters" element={<Characters />} />
      <Route path="/characters/:ID" element={<Character />} />
      <Route path="/Houses" element={<Houses />} />
    </Routes>
  );
}
