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
        src: "./assets/bedroom_a.jpg",
        position: {
          "x": 0,
          "y": 0,
          "z": 0
        },
        buttons: [
          {
            x: 0,
            y: 0,
            z: -10,
            direction: {
              name: "bedroom",
              subName: "b"
            }
          }
        ]
      },
      {
        name: "bedroom",
        subName: "b",
        src: "./assets/bedroom_b.jpg",
        position: {
          "x": 0,
          "y": 0,
          "z": 0
        },
        buttons: [
          {
            x: 0,
            y: 0,
            z: -10,
            direction: {
              name: "bedroom",
              subName: "a"
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