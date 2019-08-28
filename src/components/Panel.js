import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components/Panel.css';

// just a panel that can be resized horizontally by the top component

export default function Panel(props) {
  return (
    <div className='panel' style={{ width: `${props.width}%` }}>
      { props.children }
    </div>
  );
}

Panel.propTypes = {
  children: PropTypes.node,
  width: PropTypes.number
}
