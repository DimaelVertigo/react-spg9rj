import React from 'react';
import { connect } from 'react-redux';
import { removeDuplicates } from '../../helpers';
import {selectItem} from '../../actions';

const List = (props) => {
  const { zip = [], setValue, selected, dispatch } = props;
  const uniqueStates = removeDuplicates(zip, 'code');
  console.log(uniqueStates)
  return (
    <ul>
      {
        zip.map(({ postCode, state, stateAbbreviation }) => (
          <li
            key={postCode}
            onClick={(e) => dispatch(selectItem(postCode))}
            className={selected === postCode ? 'item selected' : 'item'}>{state}, {stateAbbreviation}</li>
        ))
      }
    </ul>
  )
}

const mapStateToProps = ({ zip, isFetching, selected }) => ({ zip, isFetching, selected });
export default connect(mapStateToProps)(List);




