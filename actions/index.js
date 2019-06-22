const constants = {
  ADD_ZIP: 'ADD_ZIP',
  FETCHING: 'FETCHING'
}

export const fetchData = zip => {
  return dispatch => {
    const api = `https://api.zippopotam.us/us/${zip}`;

    dispatch(fetchRequest(true))

    return fetch(api)
      .then(response => response.json())
      .then(json => dispatch(addZip(json)))
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

const fetchRequest = (data) => {
  return {
    type: constants.FETCHING,
    payload: data
  };
};
