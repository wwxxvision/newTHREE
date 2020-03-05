const config = {
  jsonPlacement: './data.json',
  render: {
    domElement: document.querySelector('.app')
  },
  camera: {
    near: 0.1,
    far: 1000,
    fov: 75,
    aspect: window.innerWidth / window.innerHeight
  },
  app:
    [
      {
        name: "bedroom",
        subName: "a",
        position: {
          "x": 0,
          "y": 0,
          "z": 0
        },
        order: 0,
        buttons: [
          {
            x: 10,
            y: 0,
            z: 0,
            direction: {
              name: "bdrm",
              subName: "b"
            }
          }
        ]
      }
    ]
}

export default config;

// {
//   id: 1,
//   name: "b",
//   position: {
//     x: 0,
//     y: 0,
//     z: 0
//   },
// },
// {
//   id: 2,
//   name: "c",
//   position: {
//     "x": 0,
//     "y": 0,
//     "z": 0
//   }
// },
// {
//   id: 3,
//   name: "d",
//   position: {
//     x: 0,
//     y: 0,
//     z: 0
//   }
// }