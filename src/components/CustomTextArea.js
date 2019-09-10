import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import '../styles/components/CustomTextArea.css';

// todo: improve rendering.
// right now it is laggy because when it rerenders it does splits of array multiple times (which is becomes slower when it is a lot of text)
// i think removing the split should make it faster. this might be hard to do since each line depends on the other to figure out the offset for the cursor.

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
  let [ val, setVal ] = useState("");
  let [ cursorPos, setCursorPos ] = useState(0);
  let textAreaRef = useRef(null);

  // onchange function for textarea
  function onChange(e) {
    setCursorPos(document.activeElement.selectionStart);
    setVal(e.target.value);
  }

  // special keys need special attention
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
        // console.log('down');
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

  // get cursor position we use this. (might need to figure out different way since it is not fully supported).
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
      return props.renderText(val, cursorPos);
    }
    val = val.split('\n');
    let offset = 0;
    let textComponent = val.map((el, i) => {
      // scoping the offset so the onclick function gets the right value
      let _offset = offset;
      let component = (<div
        key={`text-render-${i}`}
        onClick={(e) => focusTextarea(e, i, _offset)}
        className='norm-text'>
        {el}
      </div>)
      offset += el.length+1;
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
        val={val}
        onChange={onChange}
        onKeyPress={onKeyPress}/>
      { renderText(val, cursorPos) }
    </div>
  );
}

CustomTextArea.propTypes = {
  renderText: PropTypes.func
}




// this is just a regular textArea but it is needed to create a bunch in CustomTextArea. the idea is for each textArea to handle their own state but have a callback to sync text to parent component. this would allow to style text.
// function TextArea(props) {
//   let [ value, setValue ] = useState("");
//
//   function changeValue(e) {
//     setValue(e.target.value);
//     if(props.changeValueSync) props.changeValueSync(e.target.value);
//   }
//
//   return (
//     <textArea onChange={changeValue} />
//   )
// }

// todo make textarea that increase or decrease height according to contnent
// function TextArea({ ,...rest }) {
//   return (
//     <textarea />
//   )
// }

// // this component represents a textarea that allows the text to be styled
// export default function CustomTextArea(props) {
//   // keep track of how many textarea we have
//   // first we start with one text area
//   // we also keep track of their state (or text) so i used an array. each index represents the textarea in order
//
//   let [ textAreasTexts, setTextAreasTexts ] = useState(() => {
//     let initValues = [];
//     for(let i = 0; i < 1; i++) {
//       initValues.push("");
//     }
//     return initValues;
//   });
//   let [ textareaRefs, setTextAreasRefs ] = useState(() => {
//     let initValues = [];
//     for(let i = 0; i < 1; i++) {
//       initValues.push(createRef());
//     }
//     return initValues;
//   })
//   let [ currentEditing, setCurrentEditing ] = useState(0);
//   let [ keyState, setkeyState ] = useState(null);
//
//   // useEffect to change focus after render only if key is enter, delete or..
//   // useEffect(() => {
//   //   if(keyState === 13)
//   //     textareaRefs[currentEditing + 1].current.focus();
//   //   else if(keyState === 8 && currentEditing !== 0)
//   //     textareaRefs[currentEditing - 1].current.focus();
//   // }, [textareaRefs.length, keyState])
//
//   function makeTextAreas(count) {
//     let textarea = [];
//     // let values = [];
//     console.log('making textArea')
//     console.log('-------------------')
//     for(let i = 0; i < count; i++) {
//       // values.push("");
//       console.log(i, textAreasTexts[i]);
//       textarea.push(
//         <textarea
//           placeholder={i}
//           className={`textarea`}
//           ref={textareaRefs[i]}
//           key={`textarea-${i}`}
//           val={textAreasTexts[i]}
//           onChange={(e) => onChange(e, i)}
//           onKeyDown={(e) => onKeyDown(e, i)}/>
//       );
//     }
//     return textarea;
//   }
//
//   // when adding a textarea we add
//   // - state for value
//   // - state for ref to focus on click
//   function onKeyDown(e, i) {
//     setCurrentEditing(i);
//     switch(e.keyCode) {
//       case 8:
//         // e.preventDefault();
//         removeTextArea(e, i);
//         setkeyState(8);
//         break;
//       case 13:
//         e.preventDefault();
//         addTextArea(i);
//         setkeyState(13);
//         break
//       default:
//         setkeyState(null);
//     }
//   }
//
//   function addTextArea(i) {
//     let textAreasPrev = [ ...textAreasTexts ];
//     console.log('splicebef', textAreasPrev);
//     textAreasPrev.splice(i+1, 0, "");
//     console.log('spliceaft', textAreasPrev);
//     setTextAreasTexts(textAreasPrev);
//     let textAreaRefPrev = [ ...textareaRefs ];
//     textAreaRefPrev.splice(i+1, 0, createRef());
//     setTextAreasRefs(textAreaRefPrev);
//     // switch focus to the next text area
//     // textareaRefs[i+1].current.focus();
//     // useEffect(() => {
//     //   textareaRefs[i+1].current.focus();
//     // })
//     // let timeout = setTimeout(() => {
//     //   console.log(textareaRefs)
//     //   // textareaRefs[i+1].current.focus();
//     // }, 1)
//   }
//
//   function removeTextArea(e, i) {
//     // if(i !== 0 && e.target.value !== "") {
//     console.log('e.target.value', e.target.value);
//     if(e.target.value === "") {
//       let textAreasPrev = [ ...textAreasTexts ];
//       textAreasPrev.splice(i, 1);
//       setTextAreasTexts(textAreasPrev);
//       let textAreaRefPrev = [ ...textareaRefs ];
//       textAreaRefPrev.splice(i, 1);
//       setTextAreasRefs(textAreaRefPrev);
//     }
//   }
//
//   function onChange(e, i) {
//     let values = [ ...textAreasTexts ];
//     values[i] = e.target.value;
//     setCurrentEditing(i);
//     setTextAreasTexts(values)
//   }
//
//   // focus the last text area when clicking outside any textarea
//   function focusTextarea(e) {
//     if(e.target.className === 'custom-text-area')
//       textareaRefs[textareaRefs.length - 1].current.focus();
//   }
//
//   return(
//     <div
//       className='custom-text-area'
//       onClick={focusTextarea}>
//       {makeTextAreas(textAreasTexts.length)}
//     </div>
//   )
// }

// function Cursor() {
//   return (
//     <div className='cursor' >
//     </div>
//   )
// }

// export default function CustomTextArea(props) {
//   let [ text, setText ] = useState("");
//   let [ isClicked, setIsClicked ] = useState(false);
//   let [ cursorPos, setCursorPos ] = useState(0);
//   let textareaRef = useRef(null);
//
//   function pseudoTextFocus(e) {
//     textareaRef.current.focus();
//     setIsClicked(true);
//     getCursorPos(e);
//   }
//
//   function getCursorPos(e) {
//     let range;
//     let textNode;
//     let offset;
//     if (document.caretPositionFromPoint) {
//       range = document.caretPositionFromPoint(e.pageX, e.pageY);
//       textNode = range.offsetNode;
//       offset = range.offset;
//     } else if (document.caretRangeFromPoint) {
//       range = document.caretRangeFromPoint(e.pageX, e.pageY);
//       textNode = range.startContainer;
//       offset = range.startOffset;
//     }
//     setCursorPos(offset);
//     console.log('x', e.clientX);
//     console.log('y', e.clientY);
//     console.log('range', range);
//     // console.log('textNode', textNode);
//     console.log('offset', offset);
//   }
//
//   function renderText(text) {
//     let returnText = text;
//     console.log(text);
//     console.log(text.slice(0, cursorPos));
//     if(isClicked) {
//       // let splitText = text.splitText(offset);
//       returnText = (
//         <div>
//           {text.slice(0, cursorPos)}
//             <Cursor />
//           {text.slice(cursorPos)}
//         </div>
//       )
//     }
//     return returnText;
//   }
//
//   return(
//     <div className={`custom-text-area ${props.className || ''}`}>
//       <textarea
//         ref={textareaRef}
//         onChange={(e) => setText(e.target.value)}/>
//       <div
//         className='pseudo-text-area'
//         onClick={pseudoTextFocus}>
//         {renderText(text)}
//       </div>
//     </div>
//   )
// }
