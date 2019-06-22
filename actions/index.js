const constants = {
  ADD_ZIP: 'ADD_ZIP',
  FETCHING: 'FETCHING',
  SELECT_ITEM: 'SELECT_ITEM'
}

export const fetchData = zip => {
  return dispatch => {
    const api = `https://api.zippopotam.us/us/${zip}`;

    dispatch(fetchRequest(true))

    return fetch(api)
      .then(response => response.json())
      .then(json => {
        const postCode = json['post code'];
        const stateAbbreviation = json.places[0]['state abbreviation'];
        const state = json.places[0]['state'];
        const cutedData = {
          postCode,
          stateAbbreviation,
          state
        }
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

export const fetchRequest = (data) => {
  return {
    type: constants.FETCHING,
    payload: data
  };
};

export const selectItem = (data) => {
  return {
    type: constants.SELECT_ITEM,
    payload: data
  };
};
