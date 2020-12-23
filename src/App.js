import "./App.scss";
import { Switch, Route } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Index from "./components/notebooks/index.component";
import Show from "./components/notebooks/show.component";
import Characters from "./components/notables/characters.component";

function App() {
  return (
    <div>
      <Navbar bg="primary" variant="light">
        <Navbar.Brand href="/">Scription</Navbar.Brand>
      </Navbar>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/notebooks"]} component={Index} />
          <Route path="/notebooks/:notebookId/characters" children={<Characters />} />
          <Route path="/notebooks/:id" children={<Show />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
