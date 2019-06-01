import * as React from 'react';
import * as THREE from 'three';
import OrbitControls from 'orbit-controls-es6';
import loader from 'utils/loader';

import * as appleMTL from 'resources/models/mtl/apple.mtl';
import * as appleOBJ from 'resources/models/obj/apple.obj';

export default class CartoonRendering extends React.Component {
  private openglRef = React.createRef<HTMLDivElement>();
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls

  constructor(props: any) {
    super(props);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(1200, 800);
    this.renderer.setClearColor(0x000000);

    this.scene = new THREE.Scene(); 
    this.camera = new THREE.PerspectiveCamera(60, 1200 / 800, 1, 10000);
    this.camera.position.set(133, 37, -36);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.scene.add(this.camera);
    
    this.controls = new OrbitControls(this.camera);
    this.controls.update();

    this.createLights();
    this.createObjects();
  }

  public createLights = () => {
    const keyLight = new THREE.SpotLight(0xffffff, 1, 5000, Math.PI / 6, 25);
    keyLight.position.set(1000, 1000, 500);
    keyLight.target.position.set(100, 0, 0);
    this.scene.add(keyLight);

    const fillLight = new THREE.SpotLight(0xffffff, 0.4, 1000, Math.PI / 6, 25);
    fillLight.position.set(80, -20, -200);
    fillLight.target.position.set(0, 0, -200);
    this.scene.add(fillLight);

    const backLight = new THREE.AmbientLight(0xffffff, 0.2);
    this.scene.add(backLight);
  }

  public createObjects = () => {
    loader([
      { data: [appleMTL, appleOBJ], format: 'mtl-obj', path: ['resourses/models/mtl/']}, 
    ])
    .then(([apple]: any) => {
      apple.position.set(-50, -50, 0);
      this.scene.add(apple);
    })

  }

  public animate = () => {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate);
  }

  public componentDidMount() {
    const container = this.openglRef.current as HTMLElement;
    container.appendChild(this.renderer.domElement)
    this.animate();
    // requestAnimationFrame(this.animate);
  }

  public render() {
    return <div ref={this.openglRef} />
  }
}