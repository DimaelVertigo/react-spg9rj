import React from 'react';
import { connect } from 'react-redux';
import { removeDuplicates } from '../../helpers';
import { selectItem, deselectItem } from '../../actions';

const List = (props) => {
  const { zip = [], selected, dispatch } = props;
  const uniqueStates = removeDuplicates(zip, 'postCode');

  return (
    <ul>
      {
        uniqueStates.map(({ postCode, placeName, stateAbbreviation }) => (
          <li
            key={postCode}
            onClick={
              (e) => {
                (selected !== postCode) ? dispatch(selectItem(postCode)) : dispatch(deselectItem());
              }
            }
            className={selected === postCode ? 'item selected' : 'item'}>{placeName}, {stateAbbreviation}
          </li>
        ))
      }
    </ul>
  );
};

const mapStateToProps = ({ zip, selected }) => ({ zip, selected });
export default connect(mapStateToProps)(List);