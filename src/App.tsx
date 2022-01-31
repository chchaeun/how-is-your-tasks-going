import React from "react";
import Home from "./Home";
import ToDoList from "./OldVersion/ToDoList";
import { BrowserRouter, Switch, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/old-version">
          <ToDoList />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
