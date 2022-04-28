/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.css';
import NavigationBar from './components/NavigationBar'
import { Routes, Route } from "react-router-dom";
import EditorPage from './pages/Editor'
import HomePage from './pages/Home';
import ModelsPage from './pages/Models';
import TransformationsPage from './pages/Transformations';
import ManualPage from './pages/Manual';
import SettingsPage from './pages/Settings';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes >
          <Route path='/mdd4/' element={<HomePage />} />
          <Route path='/mdd4/models' element={<ModelsPage />} />
          <Route path='/mdd4/transformations' element={<TransformationsPage />} />
          <Route path='/mdd4/manual' element={<ManualPage />} />
          <Route path='/mdd4/editor' element={<EditorPage />} />
          <Route path='/mdd4/settings' element={<SettingsPage />} />
        </Routes>
        <NavigationBar />
      </header>
    </div>
  );
}

