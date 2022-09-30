import React from 'react';

function Value({value, unit}) {
  return (
    <span className='unit'>
        {!isNaN(value) ? value : '--'} {unit}
    </span>
  )
}

export default Value;