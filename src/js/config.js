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
        rotate: Math.PI / 4,
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
        rotate: Math.PI / 1.4,
        src: "./assets/bedroom_b.jpg",
        position: {
          "x": 0,
          "y": 0,
          "z": - 300
        },
        buttons: [
          {
            x: 10,
            y: 0,
            z: -10,
            direction: {
              name: "bedroom",
              subName: "c"
            }
          },
          {
            x: 0,
            y: 0,
            z: 10,
            direction: {
              name: "bedroom",
              subName: "a"
            }
          }
        ]
      },
      {
        name: "bedroom",
        subName: "c",
        rotate: Math.PI  / 2,
        src: "./assets/bedroom_c.jpg",
        position: {
          "x": 0,
          "y": 0,
          "z": - 300
        },
        buttons: [
          {
            x: 0,
            y: 0,
            z: -10,
            direction: {
              name: "bedroom",
              subName: "d"
            }
          },
          {
            x: 10,
            y: 0,
            z: 10,
            direction: {
              name: "bedroom",
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