import React from 'react';
import './App.css';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';

function App() {
  return (
    <div>
      {console.log(getCategories(),
        getProductsFromCategoryAndQuery('MLB5672', 'Acessórios para Veículos'))}
    </div>
  );
}

export default App;
