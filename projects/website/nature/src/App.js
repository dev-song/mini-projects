import React from 'react';
import './App.css';

import NatureHeader from './components/NatureHeader';
import NatureMain from './components/NatureMain';
import NatureFooter from './components/NatureFooter';

function App() {
  return (
    <div className="App">
      <NatureHeader />
      <NatureMain />
      <NatureFooter />
    </div>
  );
}

export default App;
