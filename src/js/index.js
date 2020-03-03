//~~~~~~~ IMPORTS ~~~~~~~//
import '../styles/index.scss';
import Scene from './models/scene';
import config from './config';
import TWEEN from 'tween.js';


//~~~~~~~ APP ~~~~~~~//
try {

  let scene = new Scene(config);

  scene.render();
}

catch (err) {
  console.error(`App has some issue and can not run ${err}`);

  let erroData = `
    <div style="text-align: center; color: red;">
      'App has some issue and can not run.Try later again , please.'
      ${err}
    </div>
  `;

  document.body.innerHTML = erroData;
}




