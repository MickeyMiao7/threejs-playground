/**
 * https://blog.csdn.net/weixin_28710515/article/details/89784772
 * 
 */
import * as React from 'react';
import { default as PixelShader } from '../Base'; 

export default () => <PixelShader fragmentShader={import('./fragment.glsl')} />
