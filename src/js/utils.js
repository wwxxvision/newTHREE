//~~~~~~~ Utils ~~~~~~~//
import * as THREE from 'three';

//~~~~~~~ Utils Functions ~~~~~~~//
export default async function loader(src) {
  let res = await new THREE.TextureLoader().load(src);
  return res;
}
