//~~~~~~~ IMPORTS ~~~~~~~//
import TWEEN from 'tween.js';
import * as THREE from 'three';

import './utils';
import '../styles/index.scss';


//~~~~~~~ APP ~~~~~~~//
try {
  const app = {
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
    renderer: new THREE.WebGLRenderer(),
    render: function () {
      app.renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(app.renderer.domElement);
    },
    animate: function () {
      requestAnimationFrame(app.animate);
      app.renderer.render(app.scene, app.camera);
    }
  }

  app.render();
  app.animate();
}

catch (err) {
  console.error('App has some issue and can not run');

  let erroData = `
    <div style="text-align: center; color: red;">
      'App has some issue and can not run.Try later again , please.'
      ${err}
    </div>
  `;

  document.body.innerHTML = erroData;
}




