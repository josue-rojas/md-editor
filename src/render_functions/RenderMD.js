import React from 'react';
// import PropTypes from 'prop-types';

// const types = {
//   '#': 'heading-1',
//   '##': 'heading-2',
//   '###': 'heading-3',
//   '####': 'heading-4',
//   '#####': 'heading-5',
//   '######': 'heading-6',
// }

export default function RenderMD(text, focusTextarea) {
  let val = text.split('\n');
  let offset = 0;
  let textComponent = val.map((el, i) => {
    let type = '';
    let className='';
    let specialChars = 0;
    // so this should only check the first letter first so it won't waste time checking the rest
    // this is assuming we only care for the md things that are at the start
    for(let i in el) {
      type += el[i];
      let isBreakOut = false;
      switch(type) {
        case '# ':
          specialChars = 2;
          className = 'heading-1';
          break;
        case '## ':
          specialChars = 3;
          className = 'heading-2';
          break;
        case '### ':
          specialChars = 4;
          className = 'heading-3';
          break;
        case '#### ':
          specialChars = 5;
          className = 'heading-4';
          break;
        case '##### ':
          specialChars = 6;
          className = 'heading-5';
          break;
        case '###### ':
          specialChars = 47;
          className = 'heading-6';
          break;
        default:
          isBreakOut = true;
        if(isBreakOut) break;
      }
    }
    let _offset = offset + specialChars;
    offset += el.length + 1;
    return (
      <div
        className={className}
        key={`text-render-${i}`}
        onClick={(e) => focusTextarea(e, i, _offset)}>
      {el.substring(specialChars)}
      </div>
    );
  });
  return (
    <div
      onClick={focusTextarea}
      className='pseudo-textarea'>
      {textComponent}
    </div>
  );
}


// RenderMD.propTypes = {
//   text: PropTypes.string
// }
