import * as React from 'react';
import { default as PixelShader } from './PixelShader'; 

interface  IProps{
  fragmentShader: Promise<any>;
}

interface IState {
  fragmentShader: string;
}

export default class PixelShaderContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      fragmentShader: ''
    };
  }

  public async componentDidMount() {
    const { fragmentShader } = this.props;
    const fragmentShaderString = await fragmentShader;
    this.setState({ fragmentShader: fragmentShaderString });
  }

  public render() {
    const { fragmentShader } = this.state;
    return fragmentShader ? <PixelShader fragmentShader={fragmentShader} /> : null;
  }
}
