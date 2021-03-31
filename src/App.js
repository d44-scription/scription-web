import "./App.scss";
import { Switch } from "react-router-dom";
import Login from "./components/authentication/login.component";
import Register from "./components/authentication/register.component";
import Account from "./components/account.component";
import Notebooks from "./components/notebooks/index.component";
import Notebook from "./components/notebooks/show.component";
import Notables from "./components/notables/index.component";
import Notes from "./components/notes/index.component";
import Navigation from "./components/navigation.component";
import SecureRoute from "./components/authentication/secure-route.component";
import PublicRoute from "./components/authentication/public-route.component";

const notableTypes = ["characters", "locations", "items"];

function App() {
  return (
    <div>
      <Navigation />

      <div className="container mt-3">
        <Switch>
          <PublicRoute exact path="/" component={Login} />
          <PublicRoute exact path="/register" component={Register} />
          <SecureRoute exact path="/account" component={Account} />
          <SecureRoute exact path="/notebooks" component={Notebooks} />
          <SecureRoute
            exact
            path="/notebooks/:notebookId/unlinked"
            component={Notes}
          />

          {notableTypes.map((type, index) => (
            <SecureRoute
              path={`/notebooks/:notebookId/${type}/:id`}
              component={Notes}
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

          <SecureRoute path="/notebooks/:id" component={Notebook} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
