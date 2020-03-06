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
    room.render();
    this.initialedRoom = room;
    return room;
  }

  move(poses, callback, zCam) {
    this.initialedRoom.removedButtons();

    let _initialedRoom = this.factoryRoom();

    _initialedRoom.render();

    this.scene.add(_initialedRoom.mesh);

    _initialedRoom.mesh.position.z = poses.z;
    _initialedRoom.mesh.position.x = poses.x;
    _initialedRoom.mesh.position.y = poses.y;

    _initialedRoom.mesh.material.opacity = 0.5;

    let _config = {
      xTarg: _initialedRoom.mesh.position.x,
      yTarg: _initialedRoom.mesh.position.y,
      zTarg: _initialedRoom.mesh.position.z,
      _xTarg: this.initialedRoom.mesh.position.x,
      _yTarg: this.initialedRoom.mesh.position.y,
      _zTarg: this.initialedRoom.mesh.position.z,
      visible: 0,
      _visible: 1
    }

    new TWEEN.Tween(_config)
      .to(
        {
          xTarg: 0,
          yTarg: 0,
          zTarg: 0,
          visible: 0,
          _visible: 1
        }, 2000
      )
      .onUpdate(() => {
        _initialedRoom.mesh.material.opacity = _config._visible;
        this.initialedRoom.mesh.material.opacity = _config.visible;

        callback(_initialedRoom.mesh.position);

        _initialedRoom.mesh.position.z = _config.zTarg;
        _initialedRoom.mesh.position.x = _config.xTarg;
        _initialedRoom.mesh.position.y = _config.yTarg;

      })
      .onComplete(() => {
        this.initialedRoom.removedRoom();
        this.initialedRoom = _initialedRoom;
      })
      .start();
  }

}