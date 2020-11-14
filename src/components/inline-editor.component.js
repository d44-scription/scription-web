import React, { Component } from "react";
import NotebookDataService from "../services/notebook.service";
import "../css/inline-editor.css"

export default class InlineEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      atRest: true,
     };

    this.onChange = this.onChange.bind(this);
    this.toggleRest = this.toggleRest.bind(this);
  }

  onChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  toggleRest() {
    this.setState({
      atRest: !this.state.atRest
    })
  }

  render() {
    const { value, atRest } = this.state
    const { displayValue } = this.props

    return (
      <span>
        <h2
          className={`inline-label ${atRest ? '' : 'hidden'}`}
          onClick={this.toggleRest}
        >
          {value || displayValue}
        </h2>

        <input
          type="text"
          value={value}
          onChange={this.onChange}
          onBlur={this.toggleRest}
          className={`inline-input ${atRest ? 'hidden' : ''}`}
        />
      </span>
    );
  }
}
