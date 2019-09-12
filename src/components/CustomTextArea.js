import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import '../styles/components/CustomTextArea.css';

// todo: improve rendering.
// right now it is laggy because when it rerenders it does splits of array multiple times (which is becomes slower when it is a lot of text)
// i think removing the split should make it faster. this might be hard to do since each line depends on the other to figure out the offset for the cursor.
// an idea i have is to figure out which line is changed and only update that one and the ones after. this way we render best case scenario 1 but worse is still n lines... still way better than n all the time.

// a cursor is that thing that blinks when you are typing...
function Cursor(props) {
  return (
    <div
      className='cursor'
       style={{ animationDuration: `${props.animationDuration | 450}ms` }}>
     </div>
  )
}

Cursor.propTypes = {
  animationDuration: PropTypes.number
}


// a CustomTextArea uses a textarea and a div to render a pseudo rich text editor.
// one of the porps is renderText which is a function that takes in a string and returns components or node that represents the rendered text
export default function CustomTextArea(props) {
  // let [ val, setVal ] = useState("");
  let [ cursorPos, setCursorPos ] = useState(0);
  let textAreaRef = useRef(null);

  // onchange function for textarea
  function onChange(e) {
    setCursorPos(document.activeElement.selectionStart);
    props.onChange(e.target.value);
    // setVal(e.target.value);
  }

  // special keys need special attention
  // TODO: need to change cause i forgot that the textbox width does or font size does not match div so it wraps differently
  function onKeyPress(e) {
    switch(e.charCode) {
      // to make it easier arrows keys collapse to the last one to set the cursor the same way
      case 37:
        // falls through
      case 38:
        // falls through
      case 39:
        // falls through
      case 40:
        setCursorPos(document.activeElement.selectionStart);
        break;
      default:
        // do nothing
    }
  }

  // focus the textarea to change the text
  // also move the cursor to it's clicked position
  function focusTextarea(e, i, offset) {
    e.stopPropagation();
    textAreaRef.current.focus();
    let cursorPos = getCursorPos(e) + offset;
    setCursorPos(cursorPos);
    document.activeElement.selectionStart = cursorPos;
    document.activeElement.selectionEnd = cursorPos;
  }

  // get cursor position (might need to figure out different way since it is not fully supported).
  // https://developer.mozilla.org/en-US/docs/Web/API/Document/caretRangeFromPoint
  function getCursorPos(e) {
    let range;
    let offset;
    if (document.caretPositionFromPoint) {
      range = document.caretPositionFromPoint(e.clientX, e.clientY);
      offset = range.offset;
    } else if (document.caretRangeFromPoint) {
      range = document.caretRangeFromPoint(e.clientX, e.clientY);
      offset = range.startOffset;
    }
    // console.table([e.clientX, e.clientY])
    // console.log('range', range);
    // console.log('offset', offset);
    return offset;
  }

  // function returns the how the text is suppose to be rendered
  // by default the render function is regular text with new lines being a new div
  // you can pass in a prop that renders the value differently.
  function renderText(val, cursorPos) {
    if(props.renderText) {
      // todo: should pass cursor position
      return props.renderText(val, focusTextarea);
    }
    val = val.split('\n');
    let offset = 0;
    let textComponent = val.map((el, i) => {
      // scoping the offset so the onclick function gets the right value
      let _offset = offset;
      // getting and placing a cursor is more troublesome than i thought.
      // let cursorPosInArr = cursorPos - offset;
      // let cursor = cursorPosInArr > -1 && cursorPosInArr < el.length+1 ? "" : '';
      offset += el.length+1;
      let component = (<div
        key={`text-render-${i}`}
        onClick={(e) => focusTextarea(e, i, _offset)}
        className='norm-text'>
        {el}
      </div>)
      return component;
    });
    return (
      <div
        onClick={focusTextarea}
        className='pseudo-textarea'>
        { textComponent }
      </div>
    );
  }

  return (
    <div
      className={`custom-text-area ${props.className || ''}`}>
      <textarea
        ref={textAreaRef}
        value={props.val}
        onChange={onChange}
        onKeyPress={onKeyPress}/>
      { renderText(props.val, cursorPos) }
    </div>
  );
}

CustomTextArea.propTypes = {
  renderText: PropTypes.func,
  onChange: PropTypes.func,
  val: PropTypes.string
}
