import * as React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import FallingCubes from './examples/falling-cubes';
import SpinningCube from './examples/spinning-cube';
import Home from './home';

type NavRoute = {
  title: string;
  path: string;
};

const homeNav: NavRoute = {
  title: 'Home',
  path: '/',
};

const spinningCubeNav: NavRoute = {
  title: 'Simple Spinning Cube',
  path: '/examples/spinning-cube',
};

const fallingCubesNav: NavRoute = {
  title: 'Physics Falling Cubes',
  path: '/examples/falling-cubes',
};

const navItems: NavRoute[] = [homeNav, spinningCubeNav, fallingCubesNav];

const App = () => {
  const [open, setOpen] = useState(false);

  const Nav = () => (
    <div id="sidebar" className={`${open ? 'open' : ''}`}>
      <a className="nav-close" onClick={() => setOpen(false)}>
        Close Nav
      </a>
      {navItems.map((i) => (
        <Link
          key={i.path}
          to={i.path}
          className="link"
          onClick={() => setOpen(false)}
        >
          {i.title}
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
            {navItems.map((i) => (
              <Route
                key={i.path}
                path={i.path}
                component={() => <div>{i.title}</div>}
              />
            ))}
          </Switch>
        </div>
        <div className="content">
          <Switch>
            <Route path={fallingCubesNav.path}>
              <FallingCubes />
            </Route>
            <Route path={spinningCubeNav.path}>
              <SpinningCube />
            </Route>
            <Route path={homeNav.path}>
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
