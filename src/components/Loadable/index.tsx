import * as React from 'react';
import * as Loadable from 'react-loadable';
import * as NProgress from 'nprogress';
import 'nprogress/nprogress.css';

class Loading extends React.PureComponent<any> {
  constructor(props: any) {
    super(props);
    NProgress.start();
  }

  public componentWillUnmount() {
    NProgress.done();
  }

  public render() {
    return <div>Loading...</div>;
  }
}

const LoadableHOC = (loader: () => Promise<any>) => {
  return Loadable({
    loader,
    loading() { return <Loading /> }
  });
}

export default LoadableHOC;