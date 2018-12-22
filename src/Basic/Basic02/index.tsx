/**
 * @file Axis, wireframes of mesh
 * @author Qi Miao <mickey.miao7@gmail.com>
 */
import * as React from 'react';
import * as THREE from 'three';
import { Scene } from 'three/three-core';

export default class Basic extends React.Component {
  private openglRef = React.createRef<HTMLDivElement>();
  private scene: Scene;
  constructor(props: any) {
    super(props);
    this.scene = new THREE.Scene(); 
  }
  public drawAxis = () => {
    const xGeometry = new THREE.Geometry();
    xGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
    xGeometry.vertices.push(new THREE.Vector3(3, 0, 0));
    const xMaterial = new THREE.LineBasicMaterial({
      color: 0xff0000
    }) 
    const xAxis = new THREE.Line(xGeometry, xMaterial);
    this.scene.add(xAxis);

    const yGeometry = new THREE.Geometry();
    yGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
    yGeometry.vertices.push(new THREE.Vector3(0, 3, 0));
    const yMaterial = new THREE.LineBasicMaterial({
      color: 0x00ff00
    }) 
    const yAxis = new THREE.Line(yGeometry, yMaterial);
    this.scene.add(yAxis);

    const zGeometry = new THREE.Geometry();
    zGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
    zGeometry.vertices.push(new THREE.Vector3(0, 0, 3));
    const zMaterial = new THREE.LineBasicMaterial({
      color: 0x0000ff
    }) 
    const zAxis = new THREE.Line(zGeometry, zMaterial);
    this.scene.add(zAxis);
  }

  public componentDidMount() {
    const container = this.refs['webgl-canvas'] as HTMLDivElement;
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(800, 800);
    container.appendChild(renderer.domElement);

    renderer.setClearColor(0x000000);

    // const camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 1000);
    const camera = new THREE.OrthographicCamera(-5, 5, 4, -4, 1, 1000);
    camera.position.set(25, 25, 25);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.scene.add(camera);

    const cube = new THREE.Mesh(
      new THREE.CubeGeometry(1, 2, 3, 1, 2, 3),
      new THREE.MeshBasicMaterial({
        color: 0xffff00,
        wireframe: true
      })
    );
    this.scene.add(cube);

    this.drawAxis()
    renderer.render(this.scene, camera);
  }
  
  public render() {
    return <div ref={this.openglRef} />
  }
}