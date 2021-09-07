import './App.css';
import NavigationBar from './components/NavigationBar'
import { Route, Router } from 'react-router-dom'

import history from './history'

import EditorPage from './pages/Editor'
import HomePage from './pages/Home';

import { useState, useMemo } from 'react';
import { useEffect } from 'react';

export default function App() {
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

