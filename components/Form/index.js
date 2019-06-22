import React, { Component } from 'react';
import JSONTree from 'react-json-tree';
import { removeDuplicates } from './helpers';
import { fetchData } from '../../actions';
import { connect } from 'react-redux';

class Form extends Component {
  state = { value: '' };

  componentDidMount() {
    const {selected} = this.props;
    if (selected) {
      this.setState({value: this.props.selected})
    }
  }

  handleChange = e => {
    this.setState({
      value: e.target.value
    })
  }

  handleSubmit = e => {
    const { value } = this.state;
    e.preventDefault();
    if (!isNaN(value)) {
      this.props.dispatch(fetchData(this.state.value));
    }
    this.setState({ value: '' });
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <JSONTree data={this.props} invertTheme={false} />
        <JSONTree data={this.state} invertTheme={false} />
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
    );
  }
}

const mapStateToProps = ({ zip, isFetching, selected }) => ({ zip, isFetching, selected });
export default connect(mapStateToProps)(Form);