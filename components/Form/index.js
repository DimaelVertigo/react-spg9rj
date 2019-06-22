import React, { Component } from 'react';
import { removeDuplicates } from './helpers';
import { fetchData, selectItem } from '../../actions';
import { connect } from 'react-redux';

class Form extends Component {
  state = { value: '' };

  componentDidMount() {
    const { selected } = this.props;
    // if (selected) {
    //   this.setState({ value: this.props.selected })
    // }
  }

  handleChange = e => {
    const { value } = e.target;
    !isNaN(value) && this.props.dispatch(selectItem(value))
  }

  handleSubmit = e => {
    const { selected, dispatch } = this.props;
    e.preventDefault();
    if (!isNaN(selected)) {
      dispatch(fetchData(selected));
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input
            type='text'
            name='zipcode'
            value={this.props.selected}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="go" />
      </form>
    );
  }
}

const mapStateToProps = ({ selected }) => ({ selected });
export default connect(mapStateToProps)(Form);