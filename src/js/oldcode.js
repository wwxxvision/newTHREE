    // sphere.moveByMe(_sphere)

    // let house = new House(config.app);
    // let house = new House(config.app),
    //   currentPlace = typeof this.user.placement === 'string' ? JSON.parse(this.user.placement) : this.user.placement,
    //   creator3d = new Creator3d(),
    //   roomData = house.selectRoom(currentPlace),
    //   activeRoom = new Room(roomData, 'active'),
    //   hiddenRoom = new Room(roomData, 'hidden');

    // let activeMesh = {}, hiddenMesh = {}, buttons = [];

    // activeMesh = creator3d.createSphere(activeRoom.RADIUS, activeRoom.WIDTH,
    //   activeRoom.HEIGHT, new THREE.TextureLoader().load(activeRoom.room.src)),
    //   hiddenMesh = creator3d.createSphere(hiddenRoom.RADIUS, hiddenRoom.WIDTH,
    //     hiddenRoom.HEIGHT, null);


    // const userDataUpdate = () => {
    //   activeMesh.userData = activeRoom; hiddenMesh.userData = hiddenRoom;
    //   [activeMesh, hiddenMesh].forEach(mesh => mesh.material.opacity = mesh.userData.opacity);
    // }

    // userDataUpdate();
    // this.scene.add(activeMesh, hiddenMesh);

    // console.log(activeMesh)

    // const createButtons = () => {
    //   activeRoom.factoryButtons();

    //   activeRoom.instancesOfButton.forEach((button, i) => {
    //     let mesh = creator3d.createBox(button.WIDTH, button.HEIGHT, button.DEPTH);
    //     mesh.userData = { ...button, id: i };
    //     mesh.position.x = button.x; mesh.position.y = button.y; mesh.position.z = button.z;
    //     mesh.name = 'BUTTON';
    //     buttons.push(mesh);
    //     this.scene.add(mesh);
    //   });
    // }

    // // const clear = () => {
    // //   dispose3d(this.scene, [activeMesh, hiddenMesh, ...buttons]);
    // // }

    // // document.addEventListener('click', (e) => {
    // //   if(this.trigger) {
    // //     console.log(this.trigger)
    // //   }
    // // });

    // createButtons();

    // document.addEventListener('click', (e) => {
    //   this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    //   this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    //   this.raycaster.setFromCamera(this.mouse, this.camera);
    //   let intersects = this.raycaster.intersectObjects(this.scene.children, true);

    //   if (intersects.length) {

    //     intersects.forEach(intersect => {
    //       if (intersect.object.name === 'BUTTON') {
    //         let trigger = intersect.object;

    //         this.user.update(trigger.userData.direction);
    //         // activeMesh.update(this.room.d)
    //         currentPlace = trigger.userData.direction;

    //         // clear();
    //         update();
    //       }
    //     });
    //   }

    // });

    // const animate = () => {
    //   let targetCamera = {
    //     xTarg: this.camera.target.x,
    //     yTarg: this.camera.target.y,
    //     zTarg: this.requestAnimationFramecamera.target.z
    //   }

    //   new TWEEN.Tween(targetCamera)
    //     .to(
    //       {
    //         xTarg: hiddenMesh.posiiton.x,
    //         yTarg: hiddenMesh.posiiton.y,
    //         zTarg: hiddenMesh.posiiton.z
    //       }
    //     )
    //     .onUpdate(object => {
    //       this.camera.target.x = xTarg;
    //       this.camera.target.z = zTarg;
    //       this.camera.target.y = yTarg;
    //     })
    //     .start();
    // }

    // const update = () => {
    //   roomData = house.selectRoom(currentPlace),
    //     activeRoom = new Room(roomData, 'active'),
    //     hiddenRoom = new Room(roomData, 'hidden');

    //   userDataUpdate();

    // console.log(activeMesh)

    //  createButtons();
    // }