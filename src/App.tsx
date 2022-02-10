/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.css';
import NavigationBar from './components/NavigationBar'
import { Routes, Route } from "react-router-dom";
import EditorPage from './pages/Editor'
import HomePage from './pages/Home';
import ModelsPage from './pages/Models';
import StatePage from './pages/State';
import PalettePage from './pages/Palette';

import { useMemo, useState } from "react";
export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <EditorPage />
        {/* <Routes >
          <Route path='/' element={<HomePage />} />
          <Route path='/models' element={<ModelsPage />} />
          <Route path='/state' element={<StatePage />} />
          <Route path='/palette' element={<PalettePage />} />
          <Route path='/editor' element={<EditorPage />} />
        </Routes> */}
        {/* <NavigationBar /> */}
      </header>
    </div>
  );
}

