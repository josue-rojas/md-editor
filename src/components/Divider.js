import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components/Divider.css';

// this component is just a divider for to 2 side by side components
// it is meant to be used with SlidingPanels for showing a slider for 2 panels which should resize the panels

export default function Divider(props) {
  return (
    <div
      className={ `divider ${props.isSlideable ? 'slideable' : ''} ${props.className || ''}` }
      style={{left: `${props.left}%`}}
      onMouseDown={ props.onMouseDown}
      onMouseUp={ props.onMouseUp}>
    </div>
  );
}

Divider.propTypes = {
  isSlideable: PropTypes.bool,
  className: PropTypes.string,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  left: PropTypes.number
}
