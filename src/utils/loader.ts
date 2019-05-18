import * as FBXLoader from 'three-fbx-loader';

const fbxLoader = new FBXLoader();

interface IFile {
  data: string;
  format: string;
}

export function loader(files: IFile[]) {
  const promises = files.map(file => {
    const { data, format } = file;
    switch (format) {
      case 'fbx': 
        return new Promise(
          (resolve) => {
            fbxLoader.load(data, (group: any) => { resolve(group); })
          })
      default: 
        return Promise.resolve(null);
    }
  });
  return Promise.all(promises);
}

export default loader;