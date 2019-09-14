import React from 'react';
import '../styles/components/Toolbar.css';
import PropTypes from 'prop-types';

// a component representing a toolbar for an editor

export default function ToolBar(props) {
  return (
    <div className={`toolbar ${props.className || ''}`}>
      <div className='toggle-panel-icon icon icon-darkmode' onClick={props.toggleDarkmode}></div>
      <div className='toggle-panel-icon icon icon-half' onClick={props.splitPanel}></div>
      <div className='toggle-panel-icon icon icon-lhalf' onClick={props.fullLeft}></div>
      <div className='toggle-panel-icon icon icon-rhalf' onClick={props.fullRight}></div>
      <div className='toggle-panel-icon h1' onClick={props.h1}>H1</div>
      <div className='toggle-panel-icon h2' onClick={props.h2}>H2</div>
      <div className='toggle-panel-icon h3' onClick={props.h3}>H3</div>
      <div className='toggle-panel-icon h4' onClick={props.h4}>H4</div>
      <div className='toggle-panel-icon h5' onClick={props.h5}>H5</div>
      <div className='toggle-panel-icon h6' onClick={props.h6}>H6</div>
    </div>
  );
}

ToolBar.propTypes = {
  className: PropTypes.string,
  splitPanel: PropTypes.func,
  fullLeft: PropTypes.func,
  fullRight: PropTypes.func,
  toggleDarkmode: PropTypes.func,
  h1: PropTypes.func,
  h2: PropTypes.func,
  h3: PropTypes.func,
  h4: PropTypes.func,
  h5: PropTypes.func,
  h6: PropTypes.func
}
