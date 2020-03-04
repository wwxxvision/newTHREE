//~~~~~~~ IMPORTS ~~~~~~~//
import '../styles/index.scss';
import Scene from './models/scene';
import User from './models/user';
import Room from './models/room';
import config from './config';
import TWEEN from 'tween.js';
import App from './models/app';


//~~~~~~~ APP ~~~~~~~//
try {

  let user = new User(localStorage), scene = new Scene(config);
  scene.render();
  
  let app = new App(scene, user.placement);

  app.initApp();



  // , app = new App(scene, user.placement);

  //description App

  // let activeRoom = new Room('active'),
  //   hiddenRoom = new Room('hidden');





  // app.initApp();





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




