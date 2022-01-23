import React from "react";
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";
import TableComponent from "./components/Table/TableComponent";
import Home from './pages/Home'
import Menubar from "./components/Appbar/Menubar";

const App = () => useRoutes([
    { path: "/home", element: <Home /> },
    { path: "/", element: <Home /> },
    { path: "/table", element: <TableComponent /> }
  ]);

const AppWrapper = () => (

    <Router>
    <Menubar/>
      <App />
    </Router>
  );
export default AppWrapper