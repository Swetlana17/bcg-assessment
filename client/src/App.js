import React from "react";
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";
import TableComponent from "./components/Table/TableComponent";
import Home from './pages/Home'

const App = () => useRoutes([
    { path: "/home", element: <Home /> },
    { path: "/", element: <Home /> },
    { path: "/table", element: <TableComponent /> }
  ]);

const AppWrapper = () => (

    <Router>
      <App />
    </Router>
  );
export default AppWrapper