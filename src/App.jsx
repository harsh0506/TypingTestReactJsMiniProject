import React from 'react'
import "./App.css"
import TypingFinal from "./Typing/TypingFinal"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage"


function app() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<TypingFinal/>} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default app