import Room from "./room";
import TWEEN from 'tween.js';

export default class House {
  constructor(rooms, placement, scene) {
    this.rooms = this.validate(rooms);
    this.placement = placement;
    this.initialedRoom = {};
    this.scene = scene;
  }

  validate(val) {
    if (Array.isArray(val) && val.length > 0) {
      return val;
    }

    throw new Error('Validate Error');
  }

  updatePlacement(newPlacement) {
    this.placement = newPlacement;
  }

  selectRoom(selectingRoom) {
    return this.rooms.find(room => room.name === selectingRoom.name && room.subName === selectingRoom.subName);
  }

  factoryRoom() {
    let room = new Room(this.selectRoom(this.placement), this.scene);
    room.render(true);
    this.initialedRoom = room;
  }

  setRoomPosition(room, x, y, z) {
    room.position.set(x, y, z);
  }

  move(callBackCamTarget, buttonPos, controlTarget, disableMovingCallback) {
    this.initialedRoom.removedButtons();

    let _initialedRoom = new Room(this.selectRoom(this.placement), this.scene);
    _initialedRoom.render();
    this.scene.add(_initialedRoom.mesh);

    this.setRoomPosition(_initialedRoom.mesh, buttonPos.x, buttonPos.y, buttonPos.z);
    _initialedRoom.mesh.material.opacity = 0.7;

    let _config = {
      xTarg: _initialedRoom.mesh.position.x,
      yTarg: _initialedRoom.mesh.position.y,
      zTarg: _initialedRoom.mesh.position.z,
      _xTarg: this.initialedRoom.mesh.position.x,
      _yTarg: this.initialedRoom.mesh.position.y,
      _zTarg: this.initialedRoom.mesh.position.z,
      visible: 1,
      _visible: 0
    },
      camConfig = {
        camX: controlTarget.x,
        camY: controlTarget.y,
        camZ: controlTarget.z
      }

    let cameraTween = new TWEEN.Tween(camConfig)
      .to(
        {
          camX: buttonPos.x,
          camY: buttonPos.y,
          camZ: buttonPos.z
        }, 500
      )
      .onUpdate(() => {
        callBackCamTarget({ x: camConfig.camX, y: camConfig.camY, z: camConfig.camZ });
      })

    let tweenSpheres = new TWEEN.Tween(_config)
      .to(
        {
          xTarg: 0,
          yTarg: 0,
          zTarg: 0,
          visible: 0,
          _visible: 1,
        }, 1500
      )
      .onUpdate(() => {
        this.initialedRoom.mesh.material.opacity = _config.visible;
        _initialedRoom.mesh.material.opacity = _config._visible;
        this.setRoomPosition(_initialedRoom.mesh, _config.xTarg, _config.yTarg, _config.zTarg);
      })
      .onComplete(() => {
        _initialedRoom.factoryButtons();
        this.initialedRoom.removedRoom();
        this.initialedRoom = _initialedRoom;

        disableMovingCallback();
      });

    cameraTween.chain(tweenSpheres);
    tweenSpheres.delay(300);
    cameraTween.start();
  }
  select() {
    this.initialedRoom.removedButtons();

    let _initialedRoom = new Room(this.selectRoom(this.placement), this.scene);
    _initialedRoom.render(true);

    this.scene.add(_initialedRoom.mesh);
    
    this.initialedRoom.removedRoom();
    this.initialedRoom = _initialedRoom;

  }
}


