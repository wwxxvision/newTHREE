import config from "../config";
import Room from './room';
import loader from '../utils';
import Control from '../controller/control';

export default class App {
  constructor(scene, placement) {
    this.placement = placement;
    this.getCurrent = () => {
      let roomID = config.app.data.find(roomFounder => roomFounder.id === placement.id),
        thisRoute = roomID.routes.find(roomPart => roomPart.name === placement.name);

      return {
        room: roomID,
        roomPart: thisRoute
      }
    }
    this.scene = scene;
    this.current = this.getCurrent(); // get current placement
    /* init controls */
    let control = new Control(this.scene);
    /* initial two spehere */
    this.activeRoom = new Room('active');
    this.hiddenRoom = new Room('hidden');
    /* Aded to scene */
    control.addMesh(this.activeRoom.mesh)
    /* functions */
    this.getName = (room, partRoom) => {
      return `${room.name}_${partRoom.name}`;
    }
    this.getNextRoom = (room, partRoom) => {
      let next = {};

      if (partRoom.id === partRoom.length - 1) {
        let nextRoom = config.app.data.find(roomFounder => roomFounder.id === room.id + 1);

        if (nextRoom) {
          next = {
            room: nextRoom,
            roomPart: nextRoom.routes.find((partRoom) => partRoom.name === 'a')
          }
          return next;
        }

        else {
          return false;
        }
      }

      next = {
        room: room,
        roomPart: room.find(roomPartFounder => roomPartFounder.id === partRoom.id + 1)
      }

      return next;
    }

    this.actions = {
      CURENT_LOADER: () => {

        loader(`./assets/${this.getName(this.current.room, this.current.roomPart)}.jpg`).then(res => {
          this.activeRoom.setMaterial(res);
        });

      },
      NEXT_LOADER: () => {
        let next =  this.getNextRoom(this.current.room, this.current.roomPart);

        if (next) {
          loader(`./assets/${this.getName(next.room, next.roomPart)}.jpg`).then(res => {
            this.hiddenRoom.setMaterial(res);
            console.log(next)
          });
        }
      }
    }
    Object.defineProperty(this, '__logic', {
      enumerable: false, value: {
        rules: [
          {
            rule: 'NEXT_LOADER',
            condfition: this.current.hasNext,
            action: this.actions.NEXT_LOADER
          },
          // {
          //   rule: 'PREV',
          //   condfition: this.current.hasPrev,
          //   action: this.actions['ROOM_CREATOR']()
          // },
          {
            rule: 'CURENT_LOADER',
            condfition: true,
            action: this.actions.CURENT_LOADER
          },
          // {
          //   rule: 'MOVING_SCENE',
          //   condfition: true,
          //   action: this.actions['CONTROLER']()
          // },
          // {
          //   rule: 'ANIMATE',
          //   condfition: true,
          //   action: this.actions['CONTROLER']()
          // },
          // {
          //   rule: 'ROTATE',
          //   condfition: true,
          //   action: this.actions['CONTROLER']()
          // },
        ]
      }
    }); //private field 
  }

  initApp() {
    this.__logic.rules.forEach(item => {
      if (item.condfition) {
        item.action()
      }
    })
  }

}