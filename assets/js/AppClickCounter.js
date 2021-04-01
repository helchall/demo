import React from 'react';
// import '../css/AppClickCounter.css';
// import Button from './components/Button';
import ClickCounter from './components/ClickCounter';
import HoverCounter from './components/HoverCounter';

function AppClickCounter() {
 return (
    <div className="App-click-counter">
      <header className="App-click-counter-header">
        <ClickCounter />
        <HoverCounter />
      </header>
    </div>
  );
}
export default AppClickCounter;
