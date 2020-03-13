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

  move(updateCameraTarget, buttonPos, currentCamTargetPos, disableMovingAction) {
    this.initialedRoom.removedButtons();

    let hiddenSphere = new Room(this.selectRoom(this.placement), this.scene); //initialed new room

    hiddenSphere.render().then(() => {
      hiddenSphere.mesh.visible = false;
      this.setRoomPosition(hiddenSphere.mesh, buttonPos.x , buttonPos.y, buttonPos.z);
       hiddenSphere.mesh.material.opacity = 0.6;

      let spheresAnimate = {
        xTarg: hiddenSphere.mesh.position.x,
        yTarg: hiddenSphere.mesh.position.y,
        zTarg: hiddenSphere.mesh.position.z,
        currentOpacity: 1,
        hiddenOpacity: 0.6
      },
        cameraAnimate = {
          camX: currentCamTargetPos.x,
          camY: currentCamTargetPos.y,
          camZ: currentCamTargetPos.z
        }

      let tweenSpheres = new TWEEN.Tween(spheresAnimate)
        .to(
          {
            xTarg: 0,
            yTarg: 0,
            zTarg: 0,
            currentOpacity: 0,
            hiddenOpacity: 1,
          }, 1400
        )
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onStart(() => {
          hiddenSphere.mesh.visible = true;
        })
        .onUpdate(() => {
          this.setRoomPosition(hiddenSphere.mesh, spheresAnimate.xTarg, spheresAnimate.yTarg, spheresAnimate.zTarg);
          this.initialedRoom.mesh.material.opacity = spheresAnimate.currentOpacity;
          hiddenSphere.mesh.material.opacity = spheresAnimate.hiddenOpacity;
        })
        .onComplete(() => {
          hiddenSphere.factoryButtons();
          this.initialedRoom.removedRoom();
          this.initialedRoom = hiddenSphere;

          disableMovingAction();
        });

      let cameraTween = new TWEEN.Tween(cameraAnimate)
        .to(
          {
            camX: buttonPos.x,
            camY: buttonPos.y,
            camZ: buttonPos.z
          }, 500
        )
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() => {
          updateCameraTarget({x: cameraAnimate.camX, y: cameraAnimate.camY, z: cameraAnimate.camZ});
        })
        .onComplete(() => {
          tweenSpheres.delay(200);
          tweenSpheres.start();
        })

      cameraTween.start();
    })
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


