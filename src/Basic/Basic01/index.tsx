/**
 * @file Most basic elements in threejs, including renderer, camera, object, scene
 * @author Qi Miao <mickey.miao7@gmail.com>
 */
import * as React from 'react';
import * as THREE from 'three';

export default class Basic extends React.Component {
  private openglRef = React.createRef<HTMLDivElement>();
  public componentDidMount() {
    const container = this.openglRef.current;
    const renderer = new THREE.WebGLRenderer();
    openglRef = React.createRef<HTMLDivElement>();

    renderer.setSize(800, 800);
    container.appendChild(renderer.domElement);

    renderer.setClearColor(0x000000);

    const scene = new THREE.Scene();
    // const camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 1000);
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 1000);
    camera.position.set(4, -4, 5);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    const cube = new THREE.Mesh(
      new THREE.CubeGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
      })
    );
    scene.add(cube);

    renderer.render(scene, camera);
    // const animate = () => {
    //   requestAnimationFrame(animate);
    //   renderer.render(scene, camera);
    // };
  }
  
  public render() {
    return <div ref={this.openglRef} />
  }
}