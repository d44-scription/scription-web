import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { notebook: [] };
  }

  componentDidMount() {
    axios.get('https://ghibliapi.herokuapp.com/films')
      .then(response => {
        this.setState({ notebook: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  tabRow() {
    return this.state.notebook.map(function (object, i) {
      return <TableRow obj={object} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <h3 align="center">Notebook List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Notebook</th>
              <th>ID</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>

          <tbody>
            {this.tabRow()}
          </tbody>
        </table>
      </div>
    );
  }
}
