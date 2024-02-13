import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Mynavbar from "./Components/navbar/Navbar";
import Signin from "./Components/pages/signinPage";
import LoginPage from './Components/pages/loginPage';
import ListingPage from "./Components/listingPage/ListingPage";
import HomePage from "./Components/homePage/HomePage";
const App = () => {
  return (
    <div>
      <Mynavbar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/signinpage" element={<Signin />} />
        <Route path="/book/list" element={<ListingPage />} />

        <Route />
      </Routes>
    </div>
  );
};

export default App;
