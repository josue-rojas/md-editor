import React, { useState } from 'react';
import SlidingPanels from './components/SlidingPanels';
import ToolBar from './components/ToolBar';
import CustomTextArea from './components/CustomTextArea';
import RenderMD from './components/RenderMD';
import './styles/App.css';

function TextPanel(props) {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <CustomTextArea
        val={props.val}
        onChange={props.onChange}
        renderText={props.renderText}/>
    </div>
  );
}

export default function App() {
  let [ panelWidth, setPanelWidth ] = useState(50);
  let [ textValue, setTextValue ] = useState("");

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

  function onChange(val) {
    setTextValue(val)
  }

  return (
    <div className="App">
      <ToolBar
        splitPanel={splitPanel}
        fullLeft={fullLeft}
        fullRight={fullRight}/>
      <SlidingPanels
        className='app-sliding-panels'
        leftChildren={<TextPanel
          val={textValue}
          onChange={onChange}/>}
        rightChildren={<TextPanel
          val={textValue}
          onChange={onChange}
          renderText={RenderMD}/>}
        initlPanelWidh={50}
        syncWidth={syncWidth}
        forcePanelWidth={panelWidth}/>
    </div>
  );
}
