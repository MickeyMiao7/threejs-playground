/**
 * @file light, Lambert and phong 
 * @author Qi Miao <mickey.miao7@gmail.com>
 */
import * as React from 'react';
// tslint:disable-next-line
import * as THREE from 'three';
import OrbitControls from 'orbit-controls-es6';
import * as vertexShader from './vertex.glsl';
import * as fragmentShader from './fragment.glsl';
import * as robotFBXData from 'models/fbx/robot.FBX';
import * as guitarFBXData from 'models/fbx/guitar/guitar.FBX';
import loader from 'utils/loader';
import * as TWEEN from 'three-tween';

const robotFBX = { data: robotFBXData, format: 'fbx' };
const guitarFBX = { data: guitarFBXData, format: 'fbx' };

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

  public addObjs = async () => {
    // loader(['Particle/Particle01/obj/robot.FBX']).then(value => {console.log(value)});
    loader([robotFBX, guitarFBX])
      .then(([robotGroup, guitarGroup]: any) => {
        // 适当变换使其完整在屏幕显示
        const robotObj = robotGroup.children[1].geometry;
        const guitarObj = guitarGroup.children[0].geometry;
        console.log(guitarObj);
        robotObj.scale(0.08, 0.08, 0.08);
        robotObj.rotateX(-Math.PI / 2);
        robotObj.applyMatrix(new THREE.Matrix4().makeTranslation(0, 10, 0));

        this.addParticle([robotObj, guitarObj]);
      });
        // // 提取出其几何模型
        // const robotObj = group.children[1].geometry;
        // return robotObj;
        // 把它变成粒子
        // this.addParticle(robotObj);
    // });
  }

  public toBufferGeometry(geometry: any) {
    if (geometry.type === 'BufferGeometry') {
      return geometry;
    }
    return new THREE.BufferGeometry().fromGeometry(geometry);
}

  public addParticle = (objs: any[]) => {
    const [bufferGeometry1, bufferGeometry2] = objs.map(obj => this.toBufferGeometry(obj));
    // 找到顶点数量较多的模型
    const [moreObj, lessObj] = bufferGeometry1.attributes.position.array.length > bufferGeometry2.attributes.position.array.length ? [bufferGeometry1, bufferGeometry2] : [bufferGeometry2, bufferGeometry1];

    const morePos = moreObj.attributes.position.array;
    const lessPos = lessObj.attributes.position.array;
    const moreLen = morePos.length;
    const lessLen = lessPos.length;
    console.log(moreLen, lessLen)

    // 根据最大的顶点数开辟数组空间，同于存放顶点较少的模型顶点数据
    const position2 = new Float32Array(moreLen);
    // 先把顶点较少的模型顶点坐标放进数组
    position2.set(lessPos);
    // 剩余空间重复赋值
    for (let i = lessLen, j = 0; i < moreLen; i++, j++) {
      j %= lessLen;
      position2[i] = lessPos[j];
      position2[i + 1] = lessPos[j + 1];
      position2[i + 2] = lessPos[j + 2];
    }
    // sizes用来控制每个顶点的尺寸，初始为4
    const sizes = new Float32Array(moreLen);
    for (let i = 0; i < moreLen; i++) {
      sizes[i] = 4;
    }

    // 挂载属性值
    moreObj.addAttribute('size', new THREE.BufferAttribute(sizes, 1));
    moreObj.addAttribute('position2', new THREE.BufferAttribute(position2, 3));

    const uniforms = {
        // 传递的颜色属性
      color: {
        type: 'v3', // 指定变量类型为三维向量
        value: new THREE.Color(0xffffff)
      },
      val: {
        value: 1.0
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
    const pos = {
      val: 1
    };
    const particleSystem = new THREE.Points(moreObj, shaderMaterial);

    // 使val值从0到1，1到0循环往复变化
    const tween = new TWEEN.Tween(pos).to({
      val: 0
    }, 1500).easing(TWEEN.Easing.Quadratic.InOut).delay(1000).onUpdate(callback);

    const tweenBack = new TWEEN.Tween(pos).to({
        val: 1
    }, 1500).easing(TWEEN.Easing.Quadratic.InOut).delay(1000).onUpdate(callback);

    tween.chain(tweenBack);
    tweenBack.chain(tween);
    tween.start();
    // 每次都将更新的val值赋值给uniforms，让其传递给shader
    console.log(particleSystem.material);
    function callback() {
      // tslint-disable-next-line
      (particleSystem.material as any).uniforms.val.value = pos.val;
    }

    // const particleSystem = new THREE.Points(bufferGeometry1, shaderMaterial);
    // const pointMaterial = new THREE.PointsMaterial({
    //   // 粒子颜色
    //   color: 0xffffff,
    //   // 粒子大小
    //   size: 2
    // });
    // const particleSystem = new THREE.Points(bufferGeometry, pointMaterial);
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