import React, { Component } from 'react';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.onChange(this.props.id, event.target.value)
  }

  render() {
    
    var listOptions = this.props.options.map(function(item) {
     return (
      <option value={item} >{item}</option>
     );
    });

    var id = "select"+this.props.id;

    return (
      <div>
        <label htmlFor={id}>{this.props.id}: </label>
        <select id={id} value={this.state.value} onChange={this.handleChange}>
          <option value="all">none-selected</option>
          {listOptions}
        </select>
      </div>
    );
  }
}

export default Dropdown;