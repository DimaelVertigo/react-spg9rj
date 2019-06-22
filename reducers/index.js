import actions from '../actions';

const initialState = [];
const zip = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_ZIP:
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
    case actions.FETCHING:
      return action.payload;
    default:
      return false;
  }
}

export default {
  zip,
  isFetching
}