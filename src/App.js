import React from 'react';
import './App.css';
import { getCategories } from './services/api';

function App() {
  return (
    <div>
      {console.log(getCategories())}
    </div>
  );
}

export default App;
