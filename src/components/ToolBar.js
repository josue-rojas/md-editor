import React from 'react';
import '../styles/components/Toolbar.css';
import PropTypes from 'prop-types';

// a component representing a toolbar for an editor

export default function ToolBar(props) {
  return (
    <div className={`toolbar ${props.className || ''}`}>
      <div className='toggle-panel-icon' onClick={props.splitPanel}>Split</div>
      <div className='toggle-panel-icon' onClick={props.fullLeft}>Full Left</div>
      <div className='toggle-panel-icon' onClick={props.fullRight}>Full Right</div>
    </div>
  );
}

ToolBar.propTypes = {
  className: PropTypes.string,
  splitPanel: PropTypes.func,
  fullLeft: PropTypes.func,
  fullRight: PropTypes.func
}
