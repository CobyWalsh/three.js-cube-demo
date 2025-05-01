import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('assets/images/fur.jpg');

const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
const material = new THREE.MeshBasicMaterial({ map: texture });
const torus = new THREE.Mesh( geometry, material );

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5); // position of light
scene.add(directionalLight);


scene.add( torus);

camera.position.z = 5;

function animate() {

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;

  renderer.render( scene, camera );

}