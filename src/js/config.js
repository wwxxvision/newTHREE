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
  app: {
    data: [
      {
        id: 0,
        name: "bdrm",
        routes: [
          {
            id: 0,
            name: "a",
            position: {
              "x": 0,
              "y": 0,
              "z": 0
            },
            hasNext: true,
            hasPrev: false,
          },
          {
            id: 1,
            name: "b",
            position: {
              x: 0,
              y: 0,
              z: 0
            },
            hasNext: true,
            hasPrev: false
          },
          {
            id: 2,
            name: "c",
            position: {
              "x": 0,
              "y": 0,
              "z": 0
            },
            hasNext: true,
            hasPrev: false
          },
          {
            id: 3,
            name: "d",
            position: {
              x: 0,
              y: 0,
              z: 0
            },
            "hasNext": true,
            "hasPrev": false
          }
        ]
      }
    ]
  }
}

export default config;