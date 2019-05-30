import Loadable from 'components/Loadable';
import { IRoute } from 'models/Route';

export const routes: IRoute[] = [
  {
    exact: true,
    path: '/',
    component: Loadable(() => import('components/Introduction')),
    title: '',
  },
  {
    path: '/index',
    component: Loadable(() => import('components/Introduction')),
    title: 'Introduction',
  },
  {
    path: '/basic',
    title: 'Basic',
    childRoutes: [
      {
        path: '/cube',
        component: Loadable(() => import('components/Basic/Cube')),
        title: 'Cube'
      },
      {
        path: '/axis',
        component: Loadable(() => import('components/Basic/Axis')),
        title: 'Axis'
      },
      {
        path: '/light',
        component: Loadable(() => import('components/Basic/Light')),
        title: 'Light'
      },
      {
        path: '/Shader',
        component: Loadable(() => import('components/Basic/Shader')),
        title: 'Shader'
      }
    ]
  }, 
  {
    path: '/particle',
    title: 'Particle',
    childRoutes: [
      {
        path: '/transform',
        component: Loadable(() => import('components/Particle/Transform')),
        title: 'Transform'
      }
    ]
  }
]
