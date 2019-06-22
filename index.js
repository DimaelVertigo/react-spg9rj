
import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import store from './store';
import JSONTree from 'react-json-tree';
import './style.css';
import {removeDuplicates} from './helpers';
import {fetchData} from './actions';
// import List from './components/List';
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

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);