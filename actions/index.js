const actions = {
  fetchData: zip => {
    return dispatch => {
      const api = `https://api.zippopotam.us/us/${zip}`;

      dispatch(fetchRequest(true))

      return fetch(api)
        .then(response => response.json())
        .then(json => {
          const code = json['post code'],
            name = json.places[0]['place name'],
            state = json.places[0]['state abbreviation'];

          const cutedData = {
            code, name, state
          }

          return cutedData;
        })
        .then(data => dispatch(addZip(data)))
        .then(() => dispatch(fetchRequest(false)))
        .catch(error => console.log(error));
    }
  },
  addZip: data => {
    // const place = `${data['place name']}, ${data['state abbreviation']}`
    return {
      type: actions.ADD_ZIP,
      payload: data
    }
  },

  fetchRequest: data => {
    return {
      type: actions.FETCHING,
      payload: data
    }
  }
}

export default actions;