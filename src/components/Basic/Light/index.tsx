/**
 * @file light, Lambert and phong 
 * @author Qi Miao <mickey.miao7@gmail.com>
 */
import * as React from 'react';
import * as THREE from 'three';
import OrbitControls from 'orbit-controls-es6';

export default class Basic extends React.Component {
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
    this.camera = new THREE.OrthographicCamera(-5, 5, 4, -4, 0.1, 1000);
    this.camera.position.set(25, 25, 25);
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
    // const camera = this.scene.add(camera);

    // const controls = new OrbitControls(camera);
    // controls.update();

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 15, 5);
    this.scene.add(light);

    const cube = new THREE.Mesh(
      new THREE.CubeGeometry(1, 2, 3, 1, 2, 3),
      new THREE.MeshLambertMaterial({
        color: 0xffff00,
      })
    );
    this.scene.add(cube);

    // For Phong Model, if not set specular parameter, it has nothing different with Lambert
    const cylinder = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1, 2, 8),
      new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        specular: 0xff0000,
      })
    );
    cylinder.position.set(-2, 0, 0);
  
    this.scene.add(cylinder);
    this.animate();
  }
  
  public render() {
    return <div ref={this.openglRef}/>
  }
}