import * as React from 'react';
import './style.scss';
import { Route, Switch } from 'react-router';
import { HashRouter, Link } from 'react-router-dom';

import Introduction from './Introduction';
import Basic01 from './Basic/Basic01';
import Basic02 from './Basic/Basic02';
import Basic03 from './Basic/Basic03';
import Basic04 from './Basic/Basic04';

import Particle01 from './Particle/Particle01';

import { Menu } from 'antd'; 
const SubMenu = Menu.SubMenu;

interface IState {
  openKeys: string[];
}
class App extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      openKeys: ['basic'],
    };
  }

  public render() {
    return (
      <HashRouter>
        <div id="three-playground">
          <aside>
            <Menu mode="inline" defaultOpenKeys={['basic']}>
              <SubMenu key="basic" title={<span>Basic</span>}>
                <Menu.Item key="basic01"><Link to="/basic/1">Basic Scene</Link></Menu.Item>
                <Menu.Item key="basic02"><Link to="/basic/2">Wire Frame</Link></Menu.Item>
                <Menu.Item key="basic03"><Link to="/basic/3">Lambert & Phong</Link></Menu.Item>
                <Menu.Item key="basic04"><Link to="/basic/4">Shader</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="particle" title={<span>Particle</span>}>
                <Menu.Item key="particle01"><Link to="/particle/1">Particle</Link></Menu.Item>
              </SubMenu>
            </Menu>
          </aside>
          <main>
            <Switch>
              <Route path='/index' component={Introduction} />
              <Route exact={true} path='/' component={Introduction} />
              <Route path='/basic/1' component={Basic01} />
              <Route path='/basic/2' component={Basic02} />
              <Route path='/basic/3' component={Basic03} />
              <Route path='/basic/4' component={Basic04} />
              <Route path='/particle/1' component={Particle01} />
            </Switch>
          </main>
        </div>
      </HashRouter>
   );
  }
}

export default App;
