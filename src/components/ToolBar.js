import React from 'react';
import '../styles/components/Toolbar.css';
import PropTypes from 'prop-types';

// a component representing a toolbar for an editor

export default function ToolBar(props) {
  return (
    <div className={`toolbar ${props.className || ''}`}>
      <div className='toggle-panel-icon' onClick={props.togglePanel}>Random Width</div>
    </div>
  );
}

ToolBar.propTypes = {
  className: PropTypes.string,
  togglePanel: PropTypes.func
}
