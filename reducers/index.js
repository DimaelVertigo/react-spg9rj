const constants = {
  ADD_ZIP: 'ADD_ZIP',
  FETCHING: 'FETCHING',
  SELECT_ITEM: 'SELECT_ITEM'
}

const initialState = [];

const zip = (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_ZIP:
      return [
        ...state,
        action.payload
      ]
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case constants.FETCHING:
      return action.payload;
    default:
      return false;
  }
};

const selected = (state = [], action) => {
  switch (action.type) {
    case constants.SELECT_ITEM:
      return action.payload;
    default:
      return false;
  }
};


export default {
  zip, isFetching, selected
}

