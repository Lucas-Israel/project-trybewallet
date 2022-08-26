import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Wallet from './pages/Wallet';

const URL = '';

function App() {
  return (
    <Switch>
      <Route exact path={ `${URL}/` } component={ Login } />
      <Route exact path={ `${URL}/carteira` } component={ Wallet } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}

export default App;
