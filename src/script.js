import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

//Loading
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('/textures/NormalMap.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
//const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const geometry = new THREE.SphereBufferGeometry(0.5,64,64)

// Materials

const material = new THREE.MeshStandardMaterial() // Was MeshBasicMaterial
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture;

material.color = new THREE.Color(0x292929)
//materials can have normal maps or bumpmaps to fake depth
//you can convert an image from greyscale to normalmap

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)               //should be called torus

//Light1
// const pointLight = new THREE.PointLight(0xffffff, 0.1)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)

//Light1
const pointLight1 = new THREE.PointLight(0xff0000, 2)
pointLight1.position.set(-1.5,1.5,0.9) //x,y,z
pointLight1.intensity = 4
scene.add(pointLight1)

const lightGui1 = gui.addFolder('Light1')
lightGui1.add(pointLight1.position, 'y').min(-3).max(3).step(0.01)
lightGui1.add(pointLight1.position, 'x').min(-6).max(6).step(0.01)
lightGui1.add(pointLight1.position, 'z').min(-3).max(3).step(0.01)
lightGui1.add(pointLight1, 'intensity').min(0).max(10).step(0.01)
//Once you specify min and max you get a slider

// const pointLightHelper1 = new THREE.PointLightHelper(pointLight1, 1)
// scene.add(pointLightHelper1)

//Light2
const pointLight2 = new THREE.PointLight(0x00ff00, 2)
pointLight2.position.set(1.3,-1.7,0.5) //x,y,z
pointLight2.intensity = 3
scene.add(pointLight2)

const lightGui2 = gui.addFolder('Light2')
lightGui2.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
lightGui2.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
lightGui2.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
lightGui2.add(pointLight2, 'intensity').min(0).max(10).step(0.01)
//Once you specify min and max you get a slider

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper2)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

// document.addEventListener('mousemove', onDocumentMouseMove)

// //mouse movement
// let mouseX = 0
// let mouseY = 0
// let targetX = 0
// let targetY = 0

// const windowHalfX = window.innerWidth / 2;
// const windowHalfXY = window.innerHeight / 2;

// onDocumentMouseMove = (event) => {
//     mouseX = (event.clientX - windowHalfX)
//     mouseY = (event.clientY - windowHalfY)
// }

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}

//change sphere size when scroll down
const updateSphere = (event) => {
    sphere.position.y = window.scrollY * .001
}

window.addEventListener('scroll', updateSphere)


////////////////
const clock = new THREE.Clock()

const tick = () =>
{

    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime //should be called torus

    sphere.rotation.x += 0.5 * (targetY - sphere.rotation.x) 
    sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y) 
    sphere.position.z += 0.5 * (targetY - sphere.rotation.x) 
    //positionon z makes it appear to grow

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()