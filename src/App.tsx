/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.css';
import NavigationBar from './components/NavigationBar'
import { Routes, Route } from "react-router-dom";
import EditorPage from './pages/Editor'
import HomePage from './pages/Home';
import ModelsPage from './pages/Models';
import StatePage from './pages/State';
import PalettePage from './pages/Palette';
import SettingsPage from './pages/Settings';
export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes >
          <Route path='/mdd4/' element={<HomePage />} />
          <Route path='/mdd4/models' element={<ModelsPage />} />
          <Route path='/mdd4/state' element={<StatePage />} />
          <Route path='/mdd4/palette' element={<PalettePage />} />
          <Route path='/mdd4/editor' element={<EditorPage />} />
          <Route path='/mdd4/settings' element={<SettingsPage />} />
        </Routes>
        <NavigationBar />
      </header>
    </div>
  );
}

