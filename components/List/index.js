import React from 'react';
import {removeDuplicates} from '../../helpers';

const List = ({ zip = [], setValue, selected }) => {

  const uniqueStates = removeDuplicates(zip, 'code');
  
  return (
    <ul>
      {
        uniqueStates.map(({code, state, name}) => (
          <li 
          key={code} 
          onClick={(e) => setValue(code, e)}
          className={ selected ===  code ? 'item selected' : 'item'}>{name}, {state}</li>
        ))
      }
    </ul>
  )
}

export default List;




