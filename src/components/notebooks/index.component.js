import React, { Component } from "react";
import NotebookDataService from "../../services/notebook.service";
import { Link } from "react-router-dom";

export default class NotebooksList extends Component {
  constructor(props) {
    super(props);
    this.retrieveNotebooks = this.retrieveNotebooks.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveNotebook = this.setActiveNotebook.bind(this);

    this.state = {
      notebooks: [],
      currentNotebook: null,
      currentIndex: -1,
      searchTitle: ""
    };
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

  refreshList() {
    this.retrieveNotebooks();
    this.setState({
      currentNotebook: null,
      currentIndex: -1
    });
  }

  setActiveNotebook(notebook, index) {
    this.setState({
      currentNotebook: notebook,
      currentIndex: index
    });
  }

  render() {
    const { notebooks, currentNotebook, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Notebooks List</h4>

          <ul className="list-group">
            {notebooks &&
              notebooks.map((notebook, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveNotebook(notebook, index)}
                  key={index}
                >
                  {notebook.name}
                </li>
              ))}
          </ul>
        </div>

        <div className="col-md-6">
          {currentNotebook ? (
            <div>
              <h4>Notebook</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentNotebook.name}
              </div>
              <div>
                <label>
                  <strong>ID:</strong>
                </label>{" "}
                {currentNotebook.id}
              </div>

              <Link
                to={"/notebooks/" + currentNotebook.id}
                className="badge badge-warning"
              >
                Edit
          </Link>
            </div>
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
