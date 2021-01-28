import "./App.scss";
import { Switch, Route } from "react-router-dom";
import Notebooks from "./components/notebooks/index.component";
import NotebookShow from "./components/notebooks/show.component";
import Notables from "./components/notables/index.component";
import NotableShow from "./components/notables/show.component";
import Breadcrumbs from "./components/breadcrumbs.component";

const notableTypes = ["characters", "locations", "items"];

function App() {
  return (
    <div>
      <Breadcrumbs />

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/notebooks"]} component={Notebooks} />

          {notableTypes.map((type, index) => {
            <Route
              path={`/notebooks/:notebookId/${type}/:id`}
              children={<NotableShow type={type} />}
              key={index}
            />;
          })}

          {notableTypes.map((type, index) => (
            <Route
              path={`/notebooks/:notebookId/${type}`}
              children={<Notables type={type} key={type} />}
              key={index}
            />
          ))}

          <Route path="/notebooks/:id" children={<NotebookShow />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
