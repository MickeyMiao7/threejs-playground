import * as React from 'react';
import './style.scss';
import vertexShader from './vertex.glsl';
import { Route, Switch } from 'react-router';
import { HashRouter, Link } from 'react-router-dom';

import Introduction from './Introduction';
import Basic01 from './Basic/Basic01';
import Basic02 from './Basic/Basic02';
import Basic03 from './Basic/Basic03';

import { Menu } from 'antd'; 
const SubMenu = Menu.SubMenu;

console.log(vertexShader);
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
                <Menu.Item key="1"><Link to="/basic/1">1</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/basic/2">2</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/basic/3">3</Link></Menu.Item>
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
            </Switch>
          </main>
        </div>
      </HashRouter>
   );
  }
}

export default App;
