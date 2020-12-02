import "./App.scss";
import { Switch, Route } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Index from "./components/notebooks/index.component";

function App() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">React Bootstrap</Navbar.Brand>
      </Navbar>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/notebooks"]} component={Index} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
