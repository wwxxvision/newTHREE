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
        buttons: [
          {
            x: 0,
            y: 0,
            z: -10,
            isBack: false,
            direction: {
              name: "bedroom",
              subName: "b",
              position: {
                "x": 0,
                "y": 0,
                "z": -300
              },
            }
          }
        ]
      },
      {
        name: "bedroom",
        subName: "b",
        rotate: Math.PI / 1.4,
        src: "./assets/bedroom_b.jpg",
        buttons: [
          {
            x: 10,
            y: 0,
            z: -10,
            isBack: false,
            direction: {
              name: "bedroom",
              subName: "c",
              position: {
                "x": 0,
                "y": 0,
                "z": -300
              },
            }
          },
          {
            x: 10,
            y: 0,
            z: 10,
            direction: {
              name: "bedroom",
              subName: "a",
              position: {
                "x": 0,
                "y": 0,
                "z": 300
              },
            }
          }
        ]
      },
      {
        name: "bedroom",
        subName: "c",
        rotate: Math.PI  / 2,
        src: "./assets/bedroom_c.jpg",
        buttons: [
          {
            x: 10,
            y: 0,
            z: -5,
            direction: {
              name: "bedroom",
              subName: "d",
              position: {
                "x": 300,
                "y": 0,
                "z": 0
              },
            }
          },
          {
            x: 0,
            y: 0,
            z: 10,
            direction: {
              name: "bedroom",
              subName: "b",
              position: {
                "x": 0,
                "y": 0,
                "z": 300
              },
            }
          }
        ]
      },
      {
        name: "bedroom",
        subName: "d",
        rotate:  Math.PI / 3    ,
        src: "./assets/bedroom_d.jpg",
        buttons: [
          {
            x: 10,
            y: 0,
            z: -5,
            direction: {
              name: "bedroom",
              subName: "d",
               position: {
                "x": -300,
                "y": 0,
                "z": 0
              },
            }
          },
          {
            x: 0,
            y: 0,
            z: 10,
            direction: {
              name: "bedroom",
              subName: "c",
              position: {
                "x": 300,
                "y": 0,
                "z": 0
              },
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