import './App.css';
import NavigationBar from './components/NavigationBar'
import { Route, Router } from 'react-router-dom'

import history from './history'

import EditorPage from './pages/Editor'
import HomePage from './pages/Home';
import ModelsPage from './pages/Models';
import StatePage from './pages/State';
import PalettePage from './pages/Palette';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router history={history}>
          <Route path='/' exact component={HomePage} />
          <Route path='/models' exact component={ModelsPage} />
          <Route path='/state' exact component={StatePage} />
          <Route path='/palette' exact component={PalettePage} />
          <Route path='/editor' component={EditorPage} />
        </Router>
        <NavigationBar />
      </header>
    </div>
  );
}

