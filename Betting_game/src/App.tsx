import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainPage } from "./pages";
import { PATH } from "./consts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.MAIN} element={<MainPage />}></Route>
        <Route path="*" element={<Navigate to={PATH.MAIN} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
