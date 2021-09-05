import * as React from "react";
import { useState } from "react";
import {
  BrowserRouter as Router, Link, Route, Switch
} from "react-router-dom";
import SpinningCube from "./examples/spinning-cube";
import Home from "./home";

type NavItem = {
  name: string;
  path: string;
};

type NavRoute = {
  title: string;
  path: string;
  component: any;
}

const navItems: NavItem[] = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Simple Spinning Cube',
    path: '/examples/spinning-cube',
  }
];

const routes: NavRoute[] = [
  {
    title: 'Simple Spinning Cube',
    path: '/examples/spinning-cube',
    component: SpinningCube,
  },
  {
    title: 'Home',
    path: '/',
    component: Home,
  },
]

const App = () => {
  const [open, setOpen] = useState(false);

  const Nav = () => (
    <div id="sidebar" className={`${open ? 'open' : ''}`}>
      <a className="nav-close" onClick={() => setOpen(false)}>
        Close Nav
      </a>
      {navItems.map((i) => (
        <Link key={i.path} to={i.path} className="link" onClick={() => setOpen(false)}>
          {i.name}
        </Link>
      ))}
    </div>
  );

  return (
    <div>
      <Router>
        <Nav />
        <div id="top-bar">
          <a className="nav-open" onClick={() => setOpen(true)}>
            Open Nav
          </a>
          <div className="separator">|</div>
          <Switch>
            {routes.map((i) => (
              <Route key={i.path} path={i.path} component={() => (<div>{i.title}</div>)}/>
            ))}
          </Switch>
        </div>
        <Switch>
          {routes.map((i) => (
            <Route key={i.path} path={i.path} component={() => (<div className="content">{i.component()}</div>)}/>
          ))}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
