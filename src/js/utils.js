//~~~~~~~ Utils ~~~~~~~//
import * as THREE from 'three';

//~~~~~~~ Utils Functions ~~~~~~~//
export default async function loader(src) {
  let res = await new THREE.TextureLoader().load(src);
  return res;
}

export  function dispose3d(scene, arg)  {
  arg.forEach(mesh => {
    scene.remove(mesh);
    mesh.material.dispose();
    mesh.geometry.dispose();
    mesh = null;
  });
}
