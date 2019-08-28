import React, { useState, useEffect, useCallback } from 'react';
import Panel from './Panel';
import Divider from './Divider';
import PropTypes from 'prop-types';
import '../styles/components/SlidingPanels.css';

// a component that handles sliding 2 panels to resize in a set width
// there should be a set height using classNames in css
// slider code by https://www.w3schools.com/howto/howto_js_image_comparison.asp with some modifications to fit react
// TODO: make responsive (need to set width when window changes or this changes)
export default function SlidingPanels(props) {
  let [ lPanelWidth, setLPanelWidth ] = useState((props.initlPanelWidh || 50));
  let [ isClicked, setClicked ] = useState(false);
  let [ thisWidth, setWidth ] = useState(0);

  useEffect(() => {
    window.addEventListener('mouseup', slideDone);
    return () => window.removeEventListener('mouseup', slideDone);
  })

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  // slide the panels only if clicked (mousedown)
  function slideMove(e) {
    let percent = null;
    if(!isClicked) return false;
    percent = getCursorPos(e);
    setLPanelWidth(percent);
  }

  // set clicked to true to make the panel slideable
  function slideReady(e) {
    e.preventDefault();
    setClicked(true);
  }

  // returns a percent of where the cursor is in this box
  function getCursorPos(e) {
    e = e || window.event;
    return (e.pageX / thisWidth) * 100;
  }

  // set clicked to false to stop from sliding (when mouseup)
  function slideDone(e) {
    e.preventDefault();
    setClicked(false);
  }

  // the divider is set in middle by having starting in the width of the lPanel
  return (
    <div
      className={`sliding-panels ${props.className || ''}`}
      ref={measuredRef}
      onMouseMove={slideMove}>
      <Panel width={ lPanelWidth }>{ props.leftChildren }</Panel>
      <Divider
        left={lPanelWidth}
        onMouseDown={slideReady}
        onMouseUp={slideDone}
        isSlideable={true}/>
      <Panel width={ 100 - lPanelWidth }>{ props.rightChildren }</Panel>
    </div>
  );
}

SlidingPanels.propTypes = {
  className: PropTypes.string,
  initlPanelWidh: PropTypes.number,
  leftChildren: PropTypes.node,
  rightChildren: PropTypes.node
}
