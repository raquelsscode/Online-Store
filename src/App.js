import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './Home';

function App() {
  return (
    <BrowserRouter>
      <main>
        <Switch>
          <Route exact patch="/" component={ Home } />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
