import "./App.scss";
import { Switch, Route } from "react-router-dom";
import Login from "./components/authentication/login.component";
import Register from "./components/authentication/register.component";
import Notebooks from "./components/notebooks/index.component";
import Notebook from "./components/notebooks/show.component";
import Notables from "./components/notables/index.component";
import Notes from "./components/notables/notes/index.component";
import Navigation from "./components/navigation.component";
import SecureRoute from "./components/authentication/secure-route.component"

const notableTypes = ["characters", "locations", "items"];

function App() {
  return (
    <div>
      <Navigation />

      <div className="container mt-3">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <SecureRoute exact path="/notebooks" component={Notebooks} />

          {notableTypes.map((type, index) => (
            <SecureRoute
              path={`/notebooks/:notebookId/${type}/:id`}
              children={<Notes />}
              key={index}
            />
          ))}

          {notableTypes.map((type, index) => (
            <SecureRoute
              path={`/notebooks/:notebookId/${type}`}
              children={<Notables type={type} key={type} />}
              key={index}
            />
          ))}

          <SecureRoute path="/notebooks/:id" children={<Notebook />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
