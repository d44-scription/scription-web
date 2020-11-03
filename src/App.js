import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, Link } from 'react-router-dom';
import Index from './components/notebooks/index.component';
import Notebook from './components/notebooks/notebook.component';

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
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/notebooks"]} component={Index} />
          <Route path="/notebooks/:id" component={Notebook} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
