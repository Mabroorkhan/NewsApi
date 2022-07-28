import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Header from "../Header/Header"
import NewsSettings from "../Home/NewsSettings";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/home" element={<><Home /><Header /></>} />
      <Route path="/settings" element={<><NewsSettings /><Header /></>} />
      <Route path="/" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default Router;
