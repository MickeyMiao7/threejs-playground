/**
 * Reference: http://zhangwenli.com/blog/2017/03/05/cartoon-shading-1/
 */
import * as React from 'react';
import * as THREE from 'three';
import OrbitControls from 'orbit-controls-es6';
import loader from 'utils/loader';

import * as appleMTL from 'resources/models/mtl/apple.mtl';
import * as appleOBJ from 'resources/models/obj/apple.obj';

import * as vertexShader from './SilhouetteShader/vertex.glsl';
import * as fragmentShader from './SilhouetteShader/fragment.glsl';

const SILHOUETTE_LIMIT = 0.5;

export default class CartoonRendering extends React.Component {
  private openglRef = React.createRef<HTMLDivElement>();
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls
  
  private keyLight: THREE.SpotLight;

  private appleMesh: THREE.Mesh;
  private stemMesh: THREE.Mesh;

  private lightUniform: any;

  constructor(props: any) {
    super(props);
    console.log(this.stemMesh);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(1200, 800);
    this.renderer.setClearColor(0xf3f3f3);

    this.scene = new THREE.Scene(); 
    this.camera = new THREE.PerspectiveCamera(60, 1200 / 800, 1, 10000);
    this.camera.position.set(133, 37, -36);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.scene.add(this.camera);
    
    this.controls = new OrbitControls(this.camera);
    this.controls.update();


  }

  public createLights = () => {
    this.keyLight = new THREE.SpotLight(0xffffff, 1, 5000, Math.PI / 6, 25);
    this.keyLight.position.set(1000, 1000, 500);
    this.keyLight.target.position.set(100, 0, 0);
    this.scene.add(this.keyLight);
    this.lightUniform = {
      type: 'v3',
      value: this.keyLight.position
    };

    const fillLight = new THREE.SpotLight(0xffffff, 0.4, 1000, Math.PI / 6, 25);
    fillLight.position.set(80, -20, -200);
    fillLight.target.position.set(0, 0, -200);
    this.scene.add(fillLight);

    const backLight = new THREE.AmbientLight(0xffffff, 0.2);
    this.scene.add(backLight);
  }

  public createObjects = async () => {
    const [apple]: any = await loader([
      { data: [appleMTL, appleOBJ], format: 'mtl-obj', path: ['resources/models/mtl/']}, 
    ]);
    apple.position.set(-50, -50, 0);
    this.scene.add(apple);
    this.appleMesh = apple.children[0];
    this.stemMesh = apple.children[1];
  }

  public appleShader = () => {
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        color: {
          type: 'v3',
          value: new THREE.Color('#60371b')
        },
        light: this.lightUniform,
        silhouetteLimit: {
          type: 'float',
          value: SILHOUETTE_LIMIT
        }
      }
    });
    this.appleMesh.material = material;
  }


  public animate = () => {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate);
  }

  public async componentDidMount() {
    const container = this.openglRef.current as HTMLElement;
    container.appendChild(this.renderer.domElement)

    this.createLights();
    await this.createObjects();
    this.appleShader();

    this.animate();
    // requestAnimationFrame(this.animate);
  }

  public render() {
    return <div ref={this.openglRef} />
  }
}