/**
 * @file Shader
 * @author Qi Miao <mickey.miao7@gmail.com>
 */
import * as React from 'react';
import * as THREE from 'three';
import * as vertexShader from './vertex.glsl';
import * as fragmentShader from './fragment.glsl';
import OrbitControls from 'orbit-controls-es6';

export default class Basic extends React.Component<any, any> {
  private openglRef = React.createRef<HTMLDivElement>();
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.OrthographicCamera;
  private controls: OrbitControls;
  constructor(props: any) {
    super(props);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(800, 800);
    this.renderer.setClearColor(0x000000);

    this.scene = new THREE.Scene(); 
    this.camera = new THREE.OrthographicCamera(-20, 20, 20, -20, 0.1, 1000);
    this.camera.position.set(35, 35, 35);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.scene.add(this.camera);
    
    this.controls = new OrbitControls(this.camera);
    this.controls.update();
  }

  public animate = () => {
    requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  public componentDidMount() {
    const container = this.openglRef.current as HTMLElement;
    container.appendChild(this.renderer.domElement);

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(15, 15, 15);
    this.scene.add(light);

    const uniforms = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() }
    }

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    this.scene.add(mesh);
    this.animate();
  }
  
  public render() {
    return <div ref={this.openglRef}/>
  }
}