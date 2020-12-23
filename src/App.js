import "./App.scss";
import { Switch, Route } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Notebooks from "./components/notebooks/index.component";
import Show from "./components/notebooks/show.component";
import Notables from "./components/notables/index.component";

function App() {
  return (
    <div>
      <Navbar bg="primary" variant="light">
        <Navbar.Brand href="/">Scription</Navbar.Brand>
      </Navbar>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/notebooks"]} component={Notebooks} />
          <Route path="/notebooks/:notebookId/items" children={<Notables type="items"/>} />
          <Route path="/notebooks/:notebookId/locations" children={<Notables type="locations"/>} />
          <Route path="/notebooks/:notebookId/characters" children={<Notables type="characters"/>} />
          <Route path="/notebooks/:id" children={<Show />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
