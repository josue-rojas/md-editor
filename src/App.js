import React, { useState } from 'react';
import SlidingPanels from './components/SlidingPanels';
import ToolBar from './components/ToolBar';
import './styles/App.css';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

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

export default function App() {
  let [ panelWidth, setPanelWidth ] = useState(50);

  function togglePanel() {
    setPanelWidth(getRandomInt(0, 101));
  }

  function syncWidth(width) {
    setPanelWidth(width);
  }


  return (
    <div className="App">
      <ToolBar
        togglePanel={togglePanel}/>
      <SlidingPanels
        className='app-sliding-panels'
        leftChildren={<Left />}
        rightChildren={<Right />}
        initlPanelWidh={50}
        syncWidth={syncWidth}
        forcePanelWidth={panelWidth}/>
    </div>
  );
}
