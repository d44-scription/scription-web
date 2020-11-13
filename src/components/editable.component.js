import React, { Component } from "react";
import NotebookDataService from "../services/notebook.service";

export default class Notebook extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.state = {
      value: '',
      disabled: false,
    }
  }

  onChange(e) {
    const value = e.target.value;

    this.setState({
      value: value
    });
  }

  onBlur(e) {
    this.setState({
      disabled: true
    })

    NotebookDataService.update(this.props.id, { name: e.target.value })
      .then(response => {
        console.log(response)
        this.setState({
          disabled: false
        })
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const{ defaultValue, disabled } = this.props
    const{ value } = this.state

    return (
      <input
        type="text"
        placeholder={defaultValue || ""}
        value={value}
        onBlur={this.onBlur}
        onChange={this.onChange}
        disabled={disabled}
      />
    );
  }
}
