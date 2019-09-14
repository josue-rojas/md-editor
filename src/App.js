import React, { useState } from 'react';
import SlidingPanels from './components/SlidingPanels';
import ToolBar from './components/ToolBar';
import CustomTextArea from './components/CustomTextArea';
import RenderMD from './render_functions/RenderMD';
import './styles/App.css';

function TextPanel(props) {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <CustomTextArea
        val={props.val}
        onChange={props.onChange}
        renderText={props.renderText}
        syncCursorPos={props.syncCursorPos}/>
    </div>
  );
}

export default function App() {
  let [ panelWidth, setPanelWidth ] = useState(50);
  let [ cursorPos, setCursorPos ] = useState(0);
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

  function onChange(_textValue) {
    setTextValue(_textValue)
  }

  function syncCursorPos(_cursorPos) {
    setCursorPos(_cursorPos);
  }

  // function injectText(text, pos) {
  //
  // }

  // bad idea, but it is suppose to find the closest \n and inject text there...
  function injectTextBeg(text, pos) {
    let val = textValue.split('\n');
    let ending = 0;
    // let start = 0;
    for(let i in val) {
      ending += val[i].length;
      if(ending - pos >= 0) {
        // start = i;
        val[i] = text + val[i];
        // console.log(val[i]);
        // ending -= val[i].length;
        break;
      }
    }
    // console.log(val);
    setTextValue(val.join('\n'));
  }

  return (
    <div className="App">
      <ToolBar
        splitPanel={splitPanel}
        fullLeft={fullLeft}
        fullRight={fullRight}
        h1={()=> injectTextBeg('# ', cursorPos)}/>
      <SlidingPanels
        className='app-sliding-panels'
        leftChildren={<TextPanel
          val={textValue}
          onChange={onChange}
          syncCursorPos={syncCursorPos}/>}
        rightChildren={<TextPanel
          val={textValue}
          onChange={onChange}
          syncCursorPos={syncCursorPos}
          renderText={RenderMD}/>}
        initlPanelWidh={50}
        syncWidth={syncWidth}
        forcePanelWidth={panelWidth}/>
    </div>
  );
}
