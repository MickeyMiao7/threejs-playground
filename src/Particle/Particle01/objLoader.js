
const THREE = require('three');
export function loader(pathArr) {
  const jsonLoader = new THREE.JSONLoader();
  const fbxLoader = new THREE.FBXLoader();
  const mtlLoader = new THREE.MTLLoader();
  const objLoader = new THREE.OBJLoader();
  let basePath; 
  let pathName; 
  let pathFormat;
  const promiseArr = pathArr.map((path) => {
      basePath = path.substring(0, path.lastIndexOf('/') + 1);
      pathName = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
      // 后缀为js或json的文件统一当做js格式处理
      pathName = pathName === 'json' ? 'js' : pathName;
      pathFormat = path.substring(path.lastIndexOf('.') + 1).toLowerCase();
      switch (pathFormat) {
          case 'js':
              return new Promise((resolve) => {
                  jsonLoader.load(path, (geometry, material) => {
                      resolve({
                          geometry,
                          material
                      })
                  });
              });
          case 'fbx':
              return new Promise((resolve) => {
                  fbxLoader.load(path, (object) => {
                      resolve(object);
                  });
              });
          case 'obj':
              return new Promise((resolve) => {
                  objLoader.load(path, (object) => {
                      resolve(object);
                  });
              });
          case 'mtl':
              return new Promise((resolve) => {
                  mtlLoader.setBaseUrl(basePath);
                  mtlLoader.setPath(basePath);
                  mtlLoader.load(pathName + '.mtl', (mtl) => {
                      resolve(mtl);
                  });
              });
          case 'objmtl':
              return new Promise((resolve, reject) => {
                  mtlLoader.setBaseUrl(basePath);
                  mtlLoader.setPath(basePath);
                  mtlLoader.load(`${pathName}.mtl`, (mtl) => {
                      mtl.preload();
                      objLoader.setMaterials(mtl);
                      objLoader.setPath(basePath);
                      objLoader.load(pathName + '.obj', resolve, undefined, reject);
                  });
              });
              break;
          default:
              return '';
      }
  });
  return Promise.all(promiseArr);
}

export default loader;