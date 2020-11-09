import React, { Component } from "react";
import NotebookDataService from "../../services/notebook.service";
import Notebook from "./notebook.component";

export default class Index extends Component {
  constructor(props) {
    super(props);

    this.retrieveNotebooks = this.retrieveNotebooks.bind(this);
    this.setActiveNotebook = this.setActiveNotebook.bind(this);

    this.state = {
      notebooks: [],
      currentIndex: -1,
      currentId: null,
    }
  }

  componentDidMount() {
    this.retrieveNotebooks();
  }

  retrieveNotebooks() {
    NotebookDataService.index()
      .then(response => {
        this.setState({
          notebooks: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  setActiveNotebook(id, index) {
    this.setState({
      currentId: id,
      currentIndex: index
    });
  }

  render() {
    const { notebooks, currentIndex } = this.state;

    return (
      <div>
        <h1>Notebooks</h1>
        <ul className="list-group col-md-6">
          {notebooks &&
            notebooks.map((notebook, index) => (
              <li
                key={index}
                className={ `list-group-item ${(index === currentIndex ? "active" : "") }`}
                onClick={() => this.setActiveNotebook(notebook.id, index)}
              >
                {notebook.name}
              </li>
            ))}
        </ul>

        <div className="col-md-6">
          {this.state.currentId ? (
            <Notebook id={this.state.currentId}></Notebook>
          ) : (
              <div>
                <br />
                <p>Please click on a Notebook...</p>
              </div>
            )}
        </div>
      </div>
    );
  }
}
