import * as React from 'react';

interface IBasicRoute {
  exact?: boolean;
  path: string;
  component: React.ComponentType | any;
  title: string;
};

export interface IRoute {
  title: string;
  exact?: boolean;
  path: string;
  component?: React.ComponentType | any;
  childRoutes?: IBasicRoute[];
}