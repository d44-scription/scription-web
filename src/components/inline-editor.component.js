import React, { Component } from "react";
import NotebookDataService from "../services/notebook.service";

export default class InlineEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      atRest: true,
     };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    const { value, atRest } = this.state
    const { displayValue } = this.props

    return (
      <span>
       <p className={`inline-label ${atRest ? '' : 'hidden'}`}>
         {displayValue}
       </p>

        <input
          type="text"
          value={value}
          onChange={this.onChange}
          className={`inline-label ${atRest ? 'hidden' : ''}`}
        />
      </span>
    );
  }
}
