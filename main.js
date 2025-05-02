import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('assets/images/fur.jpg');
const irisTexture = textureLoader.load('assets/images/iris.jpg');

const torusgeometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
const torusmaterial = new THREE.MeshBasicMaterial({ map: texture });
const torus = new THREE.Mesh( torusgeometry, torusmaterial );

const irisGeometry = new THREE.SphereGeometry(0.7, 0.2, 16, 100);
const irisMaterial = new THREE.MeshBasicMaterial({ map: irisTexture });
const iris = new THREE.Mesh(irisGeometry, irisMaterial);

// Set Positions
iris.position.set(0, 0, 0); 
scene.add(torus, iris);

// Lighting Setup
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5); // position of light
scene.add(directionalLight);

// Set Camera Position
camera.position.z = 5;

// Raycaster for mouse interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Update the mouse position when moving
window.addEventListener('mousemove', onMouseMove, false);

function onMouseMove(event) {
  // Normalize the mouse coordinates (-1 to 1) for WebGL
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  // Update raycaster with the mouse position
  raycaster.setFromCamera(mouse, camera);
  
  // Compute the mouse interaction with the 3D scene
  const intersects = raycaster.intersectObjects = intersectObjects([torus]);
  if (intersects.length > 0) {
    const intersectPoint = intersects[0].point;
    
    // Move the torus and iris/pupil to the mouse position
    torus.position.set(intersectPoint.x, intersectPoint.y, torus.position.z);
    iris.position.set(intersectPoint.x, intersectPoint.y, iris.position.z);
  }
}

function animate() {
  renderer.render(scene, camera);
}