/**
 * @file Shader
 * @author Qi Miao <mickey.miao7@gmail.com>
 */
import * as React from 'react';
import * as THREE from 'three';
import * as vertexShader from './vertex.glsl';
import OrbitControls from 'orbit-controls-es6';
console.log(vertexShader);

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

    const geometry = new THREE.ConeGeometry(5, 5, 3);

    // Line Border
    const lineMaterial = new THREE.LineBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0.5 } );
    const meshMaterial = new THREE.MeshPhongMaterial( { color: 0x156289, emissive: 0x072534, side: THREE.DoubleSide, flatShading: true } );

    const cone = new THREE.Mesh(geometry, meshMaterial);
    const line = new THREE.LineSegments(geometry, lineMaterial)
    this.scene.add(cone);
    this.scene.add(line);
    this.animate();
  }
  
  public render() {
    return <div ref={this.openglRef}/>
  }
}