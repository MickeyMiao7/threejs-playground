/**
 * @file light, Lambert and phong 
 * @author Qi Miao <mickey.miao7@gmail.com>
 */
import * as React from 'react';
// tslint:disable-next-line
const THREE = require('three');
import OrbitControls from 'orbit-controls-es6';
import * as vertexShader from './vertex.glsl';
import * as fragmentShader from './fragment.glsl';
console.log(vertexShader);
console.log(fragmentShader);
import * as FBXLoader from 'three-fbx-loader';
import * as robotFBX from './obj/robot.FBX';

const fbxLoader = new FBXLoader();

export default class Particle01 extends React.Component {
  private openglRef = React.createRef<HTMLDivElement>();
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  constructor(props: any) {
    super(props);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(800, 800);
    this.renderer.setClearColor(0x000000);

    this.scene = new THREE.Scene(); 
    this.camera = new THREE.PerspectiveCamera(60, 1200 / 800, 1, 10000);
    this.camera.position.set(-100, -75, -50);
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

  public createLights = () => {
    // 户外光源
    // 第一个参数是天空的颜色，第二个参数是地上的颜色，第三个参数是光源的强度
    const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);

    // 环境光源
    const ambientLight = new THREE.AmbientLight(0xdc8874, .2);

    // 方向光是从一个特定的方向的照射
    // 类似太阳，即所有光源是平行的
    // 第一个参数是关系颜色，第二个参数是光源强度
    const shadowLight = new THREE.DirectionalLight(0xffffff, .9);

    // 设置光源的位置方向
    shadowLight.position.set(50, 50, 50);

    // 开启光源投影
    shadowLight.castShadow = true;

    // 定义可见域的投射阴影
    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;

    // 定义阴影的分辨率；虽然分辨率越高越好，但是需要付出更加昂贵的代价维持高性能的表现。
    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;

    // 为了使这些光源呈现效果，需要将它们添加到场景中
    this.scene.add(hemisphereLight);
    this.scene.add(shadowLight);
    this.scene.add(ambientLight);

  }

  public addObjs = () => {
    fbxLoader.load(robotFBX, (group: any) => {
        // 提取出其几何模型
        const robotObj = group.children[1].geometry;
        // 适当变换使其完整在屏幕显示
        robotObj.scale(0.08, 0.08, 0.08);
        robotObj.rotateX(-Math.PI / 2);
        robotObj.applyMatrix(new THREE.Matrix4().makeTranslation(0, 10, 0));
        // 把它变成粒子
        this.addParticle(robotObj);
    });
  }

  public toBufferGeometry(geometry: any) {
    if (geometry.type === 'BufferGeometry') {
      return geometry;
    }
    return new THREE.BufferGeometry().fromGeometry(geometry);
}

  public addParticle = (obj: any) => {
    const bufferGeometry = this.toBufferGeometry(obj);
    const uniforms = {
        // 传递的颜色属性
      color: {
        type: 'v3', // 指定变量类型为三维向量
        value: new THREE.Color(0xffffff)
      }
    };
    // 创建着色器材料
    const shaderMaterial = new THREE.ShaderMaterial({
      // 传递给shader的属性
      uniforms,
      vertexShader,
      fragmentShader,
      // 渲染粒子时的融合模式
      blending: THREE.AdditiveBlending,
      // 关闭深度测试
      depthTest: false,
      // 开启透明度
      transparent: true
    });
    const particleSystem = new THREE.Points(bufferGeometry, shaderMaterial);
    // const pointMaterial = new THREE.PointsMaterial({
    //   // 粒子颜色
    //   color: 0xffffff,
    //   // 粒子大小
    //   size: 2
    // });
    // const particleSystem = new THREE.Points(bufferGeometry, pointMaterial);
    console.log(particleSystem);
    this.scene.add(particleSystem);
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

    this.addObjs();

    // 创建球体模型
    // const ball = new THREE.SphereGeometry(40, 30, 30);
    // // 创建粒子材料
    // const pointMaterial = new THREE.PointsMaterial({
    //   // 粒子颜色
    //   color: 0xffffff,
    //   // 粒子大小
    //   size: 2
    // });
    // // 创建粒子系统

    // const particleSystem = new THREE.ParticleSystem(ball, pointMaterial);
    // this.scene.add(particleSystem);
    this.animate();
  }
  
  public render() {
    return <div ref={this.openglRef}/>
  }
}