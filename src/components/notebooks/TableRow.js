import React, { Component } from 'react';

class TableRow extends Component {
  render() {
    return (
      <tr>
        <td>
          {this.props.obj.title}
        </td>
        <td>
          {this.props.obj.id}
        </td>
        <td>
          <button className="btn btn-primary">Edit</button>
        </td>
        <td>
          <button className="btn btn-danger">Delete</button>
        </td>
      </tr>
    );
  }
}

export default TableRow;
