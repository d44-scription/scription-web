import React, { Component } from "react";
import NotebookDataService from "../../services/notebook.service";
import Notebook from "./notebook.component";

export default class Index extends Component {
  constructor(props) {
    super(props);

    this.retrieveNotebooks = this.retrieveNotebooks.bind(this);
    this.setActiveNotebook = this.setActiveNotebook.bind(this);
    this.deleteNotebook = this.deleteNotebook.bind(this);

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

  deleteNotebook(id) {
    let notebooks = this.state.notebooks.slice();
    let remainingNotebooks = notebooks.filter(nb => (nb.id !== id))

    NotebookDataService.delete(id)
      .then(() => {
        this.setState({
          notebooks: remainingNotebooks,
          currentIndex: -1,
          currentId: null,
        })
      })
      .catch((e) => {
        console.log(e)
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
                  className={`list-group-item d-inline-flex justify-content-between ${(index === currentIndex ? "active" : "")}`}
                  onClick={() => this.setActiveNotebook(notebook.id, index)}
                >
                  <p>
                    {notebook.name}
                  </p>

                  <p>
                    <svg
                      onClick={() => this.deleteNotebook(notebook.id)}
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-archive"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fillRule="evenodd" d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                    </svg>
                  </p>
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
