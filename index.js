
import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import store from './store';
import { selectedItem } from './actions';


import './style.css';

import Form from './components/Form';
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

  handleSet = (event, value) => {
    this.setState({ value })
    // this.props.dispatch(selectedItem(this.state.value))
  }
  
  render() {
    const { zip, isFetching } = this.props;
    return (
      <div>
        <Form value={this.state.value}/>
        {!isFetching && <List zip={zip} setValue={this.handleSet} />}
      </div>
    )
  }
}

const mapStateToProps = ({ zip, isFetching, selected }) => ({ zip, isFetching, selected })
const Root = connect(mapStateToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);