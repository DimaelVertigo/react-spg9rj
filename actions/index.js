import constants from '../constants';
import { transformData } from '../helpers';

export const fetchData = zip => {
  return dispatch => {
    const api = `https://api.zippopotam.us/us/${zip}`;

    dispatch(fetchRequest(true))

    return fetch(api)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        const cutedData = transformData(json);
        console.log(cutedData)
        return dispatch(addZip(cutedData))
      })
      .then(() => dispatch(fetchRequest(false)))
      .catch(error => console.log(error));
  };
};

const addZip = data => {
  return {
    type: constants.ADD_ZIP,
    payload: data
  };
};

export const fetchRequest = data => {
  return {
    type: constants.FETCHING,
    payload: data
  };
};

export const selectItem = data => {
  return {
    type: constants.SELECT_ITEM,
    payload: data
  };
};

export const deselectItem = data => {
  return {
    type: constants.DESELECT_ITEM,
    payload: data
  };
};
