import React, { Component } from "react";
import NotebookDataService from "../../services/notebook.service";

export default class Notebook extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.getNotebook = this.getNotebook.bind(this);
    this.updateNotebook = this.updateNotebook.bind(this);
    this.deleteNotebook = this.deleteNotebook.bind(this);

    this.state = {
      currentNotebook: {
        id: null,
        name: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getNotebook(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentNotebook: {
          ...prevState.currentNotebook,
          name: name
        }
      };
    });
  }

  getNotebook(id) {
    NotebookDataService.get(id)
      .then(response => {
        this.setState({
          currentNotebook: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateNotebook() {
    NotebookDataService.update(
      this.state.currentNotebook.id,
      this.state.currentNotebook
    )
      .then(() => {
        this.setState({
          message: "The notebook was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteNotebook() {
    NotebookDataService.delete(this.state.currentNotebook.id)
      .then(() => {
        this.props.history.push('/notebooks')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentNotebook } = this.state;

    return (
      <div>
        {currentNotebook ? (
          <div className="edit-form">
            <h4>Notebook</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentNotebook.name}
                  onChange={this.onChangeName}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteNotebook}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateNotebook}
            >
              Update
            </button>

            <p>{this.state.message}</p>
          </div>
        ) : (
            <div>
              <br />
              <p>Please click on a Notebook...</p>
            </div>
          )}
      </div>
    );
  }
}
