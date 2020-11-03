import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Index from './components/notebooks/index.component';

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to={'/'} className="navbar-brand">Scription</Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={'/index'} className="nav-link">Notebooks</Link>
              </li>
            </ul>
          </div>
        </nav> <br/>

        <h2>Welcome to Scription :)</h2><br/>
        <Switch>
          <Route path='/index' component={ Index } />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
