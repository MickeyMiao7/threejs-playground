
import * as React from 'react';
import { default as PixelShader } from '../Base'; 

export default () => <PixelShader fragmentShader={import('./fragment.glsl')} />
