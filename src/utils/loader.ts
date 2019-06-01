import * as FBXLoader from 'three-fbx-loader';
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';

const fbxLoader = new FBXLoader() as THREE.FBXLoader;
const objLoader = new OBJLoader() as THREE.OBJLoader;
const mtlLoader = new MTLLoader() as THREE.MTLLoader;

mtlLoader.setPath('resourses/models/mtl/');
interface IFile {
  data: string | string[];
  format: string;
  path?: string | string[];
}

export function loader(files: IFile[]) {
  const promises = files.map(file => {
    const { data, format, path } = file;
    switch (format) {
      case 'fbx': 
        return new Promise(
          (resolve) => {
            fbxLoader.load(data as string, (group: any) => { resolve(group); })
          })
      case 'mtl-obj': 
        const [ mtl, obj ] = data as string[];
        if (path) {
          const [ mtlPath, objPath ] = path as string[];
          if (mtlPath) {
            mtlLoader.setPath(mtlPath);
          }
          if (objPath) {
            objLoader.setPath(objPath);
          }
        }
        return new Promise(
          (resolve) => {
            mtlLoader.load(mtl, materials => {
              materials.preload();
              objLoader.setMaterials(materials);
              objLoader.load(obj, object => {
                resolve(object)
              })
            })
          })
        
      default: 
        return Promise.resolve(null);
    }
  });
  return Promise.all(promises);
}

export default loader;