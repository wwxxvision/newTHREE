import * as THREE from 'three';

export default function Controls(object, domElement) {
  this.object = object;
  this.domElement = domElement;

  this.enabled = true;

  this.target = new THREE.Vector3();

  this.minDistance = 0;
  this.maxDistance = 1;

  this.minPolarAngle = 0;
  this.maxPolarAngle = Math.PI;

  this.minAzimuthAngle = - Infinity; 
  this.maxAzimuthAngle = Infinity; 
  
  this.enableDamping = false;
  this.dampingFactor = 0.05;
  
  this.enableZoom = false;
  this.zoomSpeed = 1.0;

	this.enableRotate = true;
	this.rotateSpeed = 1.0;

	this.enablePan = true;
	this.panSpeed = 1.0;
	this.screenSpacePanning = false; 
	this.keyPanSpeed = 7.0;	

	this.autoRotate = false;
	this.autoRotateSpeed = 2.0; 

	this.enableKeys = true;

	this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

	this.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN };

  this.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };
  
  this.target0 = this.target.clone();
	this.position0 = this.object.position.clone();
	this.zoom0 = this.object.zoom;

}