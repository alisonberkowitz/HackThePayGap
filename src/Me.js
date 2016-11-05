import React, { Component } from 'react';
import Modal from 'react-modal';
import Dropdown from './Dropdown';

class Me extends Component {
  constructor(props) {
    super(props);
    this.state = {'sex': 'all', 'race': 'all', 'state': 'all', 'modalIsOpen': true};
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(id, value) {
    this.state[id] = value;
  }

  handleClick() {
    this.props.onChange(this.state);
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div className="Me">
        <Modal
          isOpen={this.state.modalIsOpen} 
          onRequestClose={this.handleClick}>
          <h1>My Demographic</h1>
          <Dropdown
            id="race"
            options={["white", "black", "hispanic", "asian"]}
            onChange={this.handleChange} />
          <Dropdown
            id="sex"
            options={["male", "female"]}
            onChange={this.handleChange} />
          <Dropdown
            id="state"
            options={["AL", "AK", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]} 
            onChange={this.handleChange}/>
          <button id="save" onClick={this.handleClick}>Save</button>
        </Modal>
        <h2>Me</h2>
        <p>Race: {this.state.race}</p>
        <p>Sex: {this.state.sex}</p>
        <p>State: {this.state.state}</p>
      </div>
    );
  }
}

export default Me;