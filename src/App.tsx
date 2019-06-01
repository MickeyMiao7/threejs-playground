import * as React from 'react';
import './style.scss';
import { Route, Switch } from 'react-router';
import { Router, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { routes } from 'routes';

const browserHistory = createBrowserHistory();

import { Menu } from 'antd'; 
import { IRoute } from 'models/Route';
const SubMenu = Menu.SubMenu;

interface IState {
  openKeys: string[];
}

const RouteWithChildRoutes = (route: IRoute) => {
  if (route.component) {
    return (
      <Route
        exact={route.exact}
        path={route.path}
        component={route.component}
        key={route.path}
      />
    );
  } else if (route.childRoutes) {
    return route.childRoutes.map((childRoute, i) => (
      <Route
        exact={childRoute.exact}
        path={route.path + childRoute.path}
        component={childRoute.component}
        key={route.path + childRoute.path}
      />
    ))
  } else {
    return null;
  }
};

const MenuWithSubMenu = (route: IRoute) => {
  if (route.component) {
    return (
      <Menu.Item key={route.path}><Link to={route.path}>{route.title}</Link></Menu.Item>
    );
  } else if (route.childRoutes) {
    return (
      <SubMenu key={route.path} title={<span>{route.title}</span>}>
        {
          route.childRoutes.map(childRoute => (
            <Menu.Item key={route.path + childRoute.path}><Link to={route.path + childRoute.path}>{childRoute.title}</Link></Menu.Item>
          ))
        }
      </SubMenu>
    );
  } else {
    return null;
  }
};

class App extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      openKeys: ['basic'],
    };
  }

  public render() {
    return (
      <Router history={browserHistory}>
        <div id="three-playground">
          <aside>
            <Menu mode="inline">
              {
                routes.filter(route => route.path !== '/').map(route => MenuWithSubMenu(route))
              }
            </Menu>
          </aside>
          <main>
            <Switch>
              { 
                routes.map((route, i) => RouteWithChildRoutes(route))
              }
            </Switch>
          </main>
        </div>
      </Router>
   );
  }
}

export default App;
