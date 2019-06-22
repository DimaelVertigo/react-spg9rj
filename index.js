import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import store from './store';
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
  render() {
    const { zip } = this.props;
    return (
      <div>
        <Form />
        {<List zip={zip} />}
      </div>
    );
  }
}

const mapStateToProps = ({ zip, isFetching, selected }) => ({ zip, isFetching, selected });
const Root = connect(mapStateToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);