import React, { useState } from 'react';
import SlidingPanels from './components/SlidingPanels';
import ToolBar from './components/ToolBar';
import CustomTextArea from './components/CustomTextArea';
import './styles/App.css';

function Left() {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <CustomTextArea/>
    </div>
  );
}

function Right() {
  return (
    <div style={{ height: '100%', width: '100%', backgroundColor: 'red' }}>Right Panel stuff</div>
  );
}

export default function App() {
  let [ panelWidth, setPanelWidth ] = useState(50);

  function splitPanel() {
    setPanelWidth(50);
  }

  function fullLeft() {
    setPanelWidth(100);
  }

  function fullRight() {
    setPanelWidth(0);
  }

  function syncWidth(width) {
    setPanelWidth(width);
  }
  
  return (
    <div className="App">
      <ToolBar
        splitPanel={splitPanel}
        fullLeft={fullLeft}
        fullRight={fullRight}/>
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
