import * as React from 'react';
import * as THREE from 'three';

import * as vertexShader from './vertex.glsl';
import * as fragmentShaderPallet from './fragment.glsl';
import { AdditiveBlending } from 'three';

const WIDTH = 800;
const HEIGHT = 800;

interface IProps {
  fragmentShader: string;
}

export default class PixelShader extends React.Component<IProps> {
  private openglRef = React.createRef<HTMLDivElement>();
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.Camera;
  private clock = new THREE.Clock();

  private uniforms = {
    resolution: {
      value: new THREE.Vector2()
    },
    iTime: {
      type: 'f',
      value: 0.0
    },
    iTimeDelta: {
      type: 'f',
      value: 0.0
    },
    iResolution: {
      type: 'v2',
      value: new THREE.Vector2()
    },
    iMouse: {
      type: 'v2',
      value: new THREE.Vector2()
    },
    iFrame: {
      type: 'i1',
      value: 0
    },
    iDate: { 
      value: new THREE.Vector4() 
    }
  };
  constructor(props: any) {
    super(props);

  }

  public animate = () => {
    this.uniforms.iTime.value = this.clock.getElapsedTime();
    this.uniforms.iTimeDelta.value = this.clock.getDelta();
    this.uniforms.iFrame.value = this.uniforms.iFrame.value + 1;

    const date = new Date;
    this.uniforms.iDate.value = new THREE.Vector4(
      date.getFullYear(), date.getMonth(), date.getDay(), date.getSeconds() + (60 * date.getMinutes()) + (60 * 60 * date.getHours())
    );

    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  }

  public init() {
    const { fragmentShader } = this.props;
    const container = this.openglRef.current as HTMLElement;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(container.clientWidth || WIDTH, container.clientHeight || HEIGHT);
    this.uniforms.resolution.value.x = container.clientWidth;
    this.uniforms.resolution.value.y = container.clientHeight;
    this.uniforms.iResolution.value.x = container.clientWidth;
    this.uniforms.iResolution.value.y = container.clientHeight;
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.scene = new THREE.Scene(); 
    this.camera = new THREE.Camera();
    this.camera.position.z = 1;
    this.scene.add(this.camera);

    const geometry = new THREE.PlaneBufferGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader: fragmentShader + '\n' + fragmentShaderPallet,
      blending: AdditiveBlending                                 // 使得Alpha Channel Work
    });
    console.log(material);
    const mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);

    container.appendChild(this.renderer.domElement);

    this.animate();
  }

  public componentDidMount() {
    this.init();
    window.onresize = () => {
      const container = this.openglRef.current as HTMLElement;
      this.renderer.setSize(container.clientWidth || WIDTH, container.clientHeight || HEIGHT);
      this.uniforms.iResolution.value.x = container.clientWidth;
      this.uniforms.iResolution.value.y = container.clientHeight;
    }
  }
  
  public onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    this.uniforms.iMouse.value.x = e.clientX;
    this.uniforms.iMouse.value.y = e.clientY;
  }

  public render() {
    return <div ref={this.openglRef} onMouseMove={this.onMouseMove} />
  }
}

