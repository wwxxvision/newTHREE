const config = {
  render: {
    domElement: document.querySelector('.app')
  },
  camera: {
    near: 0.1,
    far: 1000,
    fov: 75,
    aspect: window.innerWidth / window.innerHeight
  }
}

export default config;