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
    const { notebooks, currentIndex, currentId } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h1>Notebooks</h1>
          <ul className="list-group">
            {notebooks &&
              notebooks.map((notebook, index) => (
                <li
                  key={index}
                  className={`list-group-item ${(index === currentIndex ? "active" : "")}`}
                  onClick={() => this.setActiveNotebook(notebook.id, index)}
                >
                  {notebook.name}
                </li>
              ))}
          </ul>
        </div>

        <div className="col-md-6">
          {currentId ? (
            <Notebook id={currentId}></Notebook>
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
