
import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';
import JSONTree from 'react-json-tree';
import './style.css';
import List from './components/List';
/** 
 * example valid zipcodes
 * 93455
 * 93454
 * 94105
 * 12345
 * 91325
 * 90210
 */


// API for collecting place information
// fetch('https://api.zippopotam.us/us/90210')
//   .then(res => res.json())
//   .then(res => console.log(res.places[0]))


class App extends React.Component {
  state = { value: '' };

  handleChange = e => {
    this.setState({
      value: e.target.value
    })
  }

  handleSubmit = e => {
    const { value } = this.state;
    e.preventDefault();
    value && this.props.dispatch(fetchData(this.state.value));
    // this.props.dispatch(fetchData(90210));
    this.setState({ value: '' });
  }

  handleSet = (value, e) => {
    console.log(e.target)
    this.setState({ value })
  }

  render() {
    const { zip, isFetching } = this.props;
    return (
      <div>
        <JSONTree data={this.props} invertTheme={false} />
        <JSONTree data={this.state} invertTheme={false} />
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              type='text'
              name='zipcode'
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="go" />
        </form>
        {!isFetching && <List zip={zip} setValue={this.handleSet} />}
      </div>
    )
  }
}

const mapStateToProps = ({ zip, isFetching }) => ({ zip, isFetching })
const Root = connect(mapStateToProps)(App);

// State management
const constants = {
  ADD_ZIP: 'ADD_ZIP',
  FETCHING: 'FETCHING'
}

// Actions
const fetchData = zip => {
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
  };
};

const addZip = data => {
  // const place = `${data['place name']}, ${data['state abbreviation']}`
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

// Reducers
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
}

const rootReducer = combineReducers({ zip, isFetching });
const middlewares = [thunk];
const store = createStore(rootReducer, compose(applyMiddleware(...middlewares)));

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);