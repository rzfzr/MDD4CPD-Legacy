import './App.css';
import NavigationBar from './components/NavigationBar'
import { Route, Router } from 'react-router-dom'

import history from './history'
import { GlobalContext } from './GlobalContext';

import EditorPage from './pages/Editor'
import HomePage from './pages/Home';
import { useMemo, useState } from 'react';
import ModelsPage from './pages/Models';
import StatePage from './pages/State';
import PalettePage from './pages/Palette';

export default function App() {
  const [model, setModel] = useState({})
  const providerValue = useMemo(() => ({
    model, setModel
  }), [model])

  return (
    <div className="App">
      <header className="App-header">
        <Router history={history}>
          <Route path='/' exact component={HomePage} />
          <Route path='/models' exact component={ModelsPage} />
          <Route path='/state' exact component={StatePage} />
          <Route path='/palette' exact component={PalettePage} />
          <GlobalContext.Provider value={providerValue}>
            <Route path='/editor' component={EditorPage} />
          </GlobalContext.Provider>
        </Router>
        <NavigationBar />
      </header>
    </div>
  );
}

