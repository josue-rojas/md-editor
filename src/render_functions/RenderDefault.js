import React from 'react';

export default function RenderDefault(text, focusTextarea) {
  let val = text.split('\n');
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
