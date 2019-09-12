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
        default:
          isBreakOut = true;
        if(isBreakOut) break;
      }
    }
    let _offset = offset;
    offset += el.length + 1;
    console.log(offset);
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
