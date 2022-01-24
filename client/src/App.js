import React from "react";
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";
import Home from './pages/Home'
import Menubar from "./components/Appbar/Menubar";
import TablePage from "./pages/TablePage";

const App = () => useRoutes([
    { path: "/home", element: <Home /> },
    { path: "/", element: <Home /> },
    { path: "/table", element: <TablePage /> }
  ]);

const AppWrapper = () => (

    <Router>
    <Menubar/>
      <App />
    </Router>
  );
export default AppWrapper