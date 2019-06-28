
import * as React from 'react';
import { default as PixelShader } from 'components/PixelShader/Base'; 

export default () => <PixelShader fragmentShader={import('./fragment.glsl')} />
