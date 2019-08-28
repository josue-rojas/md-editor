import React from 'react';
import SlidingPanels from './components/SlidingPanels';
import './styles/App.css';

function Left() {
  return (
    <div style={{ height: '100%', width: '100%', backgroundColor: 'blue' }}>Left panel stuff</div>
  );
}

function Right() {
  return (
    <div style={{ height: '100%', width: '100%', backgroundColor: 'red' }}>Right Panel stuff</div>
  );
}

function App() {
  return (
    <div className="App">
      <SlidingPanels
        className='app-sliding-panels'
        leftChildren={<Left />}
        rightChildren={<Right />}
        initlPanelWidh={50}/>
    </div>
  );
}

export default App;
