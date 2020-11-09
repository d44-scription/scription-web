import React, { Component } from "react";
import NotebookDataService from "../../services/notebook.service";

export default class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notebooks: [],
      currentIndex: -1,
      currentId: -1,
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
        <ul className="list-group">
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
      </div>
    );
  }
}
