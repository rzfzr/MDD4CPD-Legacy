import './App.css';
import NavigationBar from './components/NavigationBar'
import {
  Route,
  Router
} from 'react-router-dom'
import history from './history'
import HomePage from './pages/Home'
import EditorPage from './pages/Editor'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router history={history}>
          <Route path='/' exact component={HomePage} />
          <Route path='/editor' component={EditorPage} />
        </Router>
        <NavigationBar />
      </header>
    </div>
  );
}

export default App;