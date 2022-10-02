import React from 'react';

function Value({name, value, unit}) {
  return (
    <span className='unit'>
       {name} {!isNaN(value) ? value : '--'} {unit}
    </span>
  )
}

export default Value;