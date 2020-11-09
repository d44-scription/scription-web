import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, Link } from 'react-router-dom';
import Index from './components/notebooks/index.component';
import LegacyIndex from './components/legacy_notebooks/index.component';
import LegacyNotebook from './components/legacy_notebooks/notebook.component';

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          Scription
          </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/notebooks"} className="nav-link">
              Notebooks
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/legacy_notebooks"} className="nav-link">
              Legacy Notebooks
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/notebooks"]} component={Index} />

          <Route exact path={["/legacy_notebooks"]} component={LegacyIndex} />
          <Route path="/legacy_notebooks/:id" component={LegacyNotebook} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
