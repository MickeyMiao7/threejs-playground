import * as React from 'react';
import './style.scss';
import vertexShader from './vertex.glsl';
import { Route, Switch } from 'react-router';
import { HashRouter, Link } from 'react-router-dom';

import Introduction from './Introduction';
import Basic01 from './Basic/Basic01';
import Basic02 from './Basic/Basic02';
import Basic03 from './Basic/Basic03';

import { Menu, Icon } from 'antd'; 
const SubMenu = Menu.SubMenu;

console.log(vertexShader);
interface IState {
  openKeys: string[];
}
class App extends React.Component<any, IState> {
  private rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
  constructor(props: any) {
    super(props);
    this.state = {
      openKeys: ['sub1'],
    };
  }

  public onOpenChange = (openKeys: string[]) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (latestOpenKey) {
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.setState({ openKeys });
      }
      return;
    }
    this.setState({
      openKeys: latestOpenKey ? [latestOpenKey] : [],
    });
  }
  public render() {
    return (
      <HashRouter>
        <div id="three-playground">
          <aside>
            <Menu mode="inline" openKeys={this.state.openKeys} onOpenChange={this.onOpenChange}>
              <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Basic</span></span>}>
                <Menu.Item key="1"><Link to="/basic/1">1</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/basic/2">2</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/basic/3">3</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
                <Menu.Item key="5">Option 5</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
              </SubMenu>
              <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
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
