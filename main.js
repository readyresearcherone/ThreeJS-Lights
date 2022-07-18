/////////////////////////////////////////////////////////////////////////
///// IMPORT

var colors = ["RGBA(110, 147, 205, 0.10)", "rgba(249, 57, 75, 0.10)", "rgba(135, 249, 57, 0.10)", "rgba(205, 199, 110, 0.10)", "rgba(184, 110, 205, 0.10)"];
var colorsb = ["RGBA(110, 147, 205, 1)", "rgba(249, 57, 75, 1)", "rgba(135, 249, 57, 0.6)", "rgba(205, 199, 110, 1)", "rgba(184, 110, 205, 1)"];
var blocks = $('.options button');
var blocks2 = $('h1');
var blocks3 = $('h2');
var headb = $('header');
var random = Math.floor(Math.random() * colors.length);
var selectedColor = colors[random];
var selectedColorb = colorsb[random];

var a = 19;
var b = 1.54;
var c = -0.9;


$(document).ready(function () {


  
    


          $(blocks).css("background-color", selectedColor );
          $(blocks).css("border-color", selectedColorb );
          $(blocks2).css("background-color", selectedColor );
          $(blocks2).css("border-color", selectedColorb );
          $(blocks3).css("background-color", selectedColor );
          $(blocks3).css("border-color", selectedColorb );
          $(det).css("background-color", selectedColor );
          $(det).css("border-color", selectedColorb );
          $(headb).css("background-color", selectedColor );
          $(det).css("border-color", selectedColorb );
 
          document.getElementById('fontsvg1639947106892').style.stroke = selectedColorb;
          document.getElementById('fontsvg1639947106892').style.fill = selectedColor;
          document.getElementById('fontsvg16399471068923').style.stroke = selectedColorb;
          document.getElementById('fontsvg16399471068923').style.fill = selectedColor;  

          // document.getElementById('titlerpg').style.stroke = selectedColorb;
          // document.getElementById('titlerpg').style.fill = selectedColor;
        colors.splice(random, 1);   
        colorsb.splice(random, 1);   
    }

);



console.log(selectedColor);



import { Clock, Scene, LoadingManager, WebGLRenderer, sRGBEncoding, Group, PerspectiveCamera, DirectionalLight, PointLight, MeshPhongMaterial } from './three.js-master/build/three.module.js'
import { TWEEN } from './three.js-master/examples/jsm/libs/tween.module.min.js'
import { DRACOLoader } from './three.js-master/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js'


/////////////////////////////////////////////////////////////////////////
//// LOADING MANAGER
// const ftsLoader = document.querySelector(".lds-roller")
const looadingCover = document.getElementById("loading-text-intro")
const loadingManager = new LoadingManager()
var model;

loadingManager.onLoad = function() {

    document.querySelector(".main-container").style.visibility = 'visible'
    document.querySelector("body").style.overflow = 'hidden'

    const yPosition = {y: 0}
    
    new TWEEN.Tween(yPosition).to({y: 100}, 1500).easing(TWEEN.Easing.Quadratic.InOut).start()
    .onUpdate(function(){ looadingCover.style.setProperty('transform', `translate( 0, ${yPosition.y}%)`)})
    .onComplete(function () {looadingCover.parentNode.removeChild(document.getElementById("loading-text-intro")); TWEEN.remove(this)})

    introAnimation()
    // ftsLoader.parentNode.removeChild(ftsLoader)

    window.scroll(0, 0)
    


}



if (Math.floor(Math.random() * 2) == 1 ) {
    model = 'asklepios.glb'
} else if (Math.floor(Math.random() * 2) == 0 ){
    model = 'asklepios.glb'
}else {
    model = 'asklepios.glb'
}

/////////////////////////////////////////////////////////////////////////
//// DRACO LOADER TO LOAD DRACO COMPRESSED MODELS FROM BLENDER
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco')
dracoLoader.setDecoderConfig({ type: 'js' })
const loader = new GLTFLoader(loadingManager)
loader.setDRACOLoader(dracoLoader)

/////////////////////////////////////////////////////////////////////////
///// DIV CONTAINER CREATION TO HOLD THREEJS EXPERIENCE
const container = document.getElementById('canvas-container')


/////////////////////////////////////////////////////////////////////////
///// GENERAL VARIABLES
let oldMaterial
let secondContainer = false
let width = container.clientWidth
let height = container.clientHeight

/////////////////////////////////////////////////////////////////////////
///// SCENE CREATION
const scene = new Scene()

/////////////////////////////////////////////////////////////////////////
///// RENDERER CONFIG
const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance"})
renderer.autoClear = true
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1))
renderer.setSize( width, height)
renderer.outputEncoding = sRGBEncoding
container.appendChild(renderer.domElement)



/////////////////////////////////////////////////////////////////////////
///// CAMERAS CONFIG
const cameraGroup = new Group()
scene.add(cameraGroup)

const camera = new PerspectiveCamera(35, width / height, 1, 100)
camera.position.set(a,b,c)
cameraGroup.add(camera)


/////////////////////////////////////////////////////////////////////////
///// MAKE EXPERIENCE FULL SCREEN
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight
    camera.updateProjectionMatrix()
    


    renderer.setSize(container.clientWidth, container.clientHeight)


    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1))

})


/////////////////////////////////////////////////////////////////////////
///// SCENE LIGHTS
const sunLight = new DirectionalLight(selectedColorb, 0.18)
sunLight.position.set(-100,0,-100)


const sunLight2 = new DirectionalLight(selectedColorb, 0.18)
sunLight2.position.set(100,0,-100)



const fillLight = new PointLight(0xffffff, 0.5, 6, 3)
fillLight.position.set(30,3,1.8)


/////////////////////////////////////////////////////////////////////////
///// LOADING GLB/GLTF MODEL FROM BLENDER

loader.load(model, function (gltf) {
    console.log(model);
    gltf.scene.traverse((obj) => {
        if (obj.isMesh) {
            oldMaterial = obj.material
            obj.material = new MeshPhongMaterial({
                shininess: 90 
            })
        }
    })
    scene.add(gltf.scene)
    clearScene()
})

function clearScene(){
    oldMaterial.dispose()
    renderer.renderLists.dispose()
}

/////////////////////////////////////////////////////////////////////////
//// INTRO CAMERA ANIMATION USING TWEEN
function introAnimation() {
    new TWEEN.Tween(camera.position.set(0,4,2.7)).to({ x: 0, y: 2.4, z: 8.8}, 3500).easing(TWEEN.Easing.Quadratic.InOut).start()
    .onComplete(function () {
        TWEEN.remove(this)
        document.querySelector('.header').classList.add('ended')
        document.querySelector('#slogo').classList.add('ended')
        document.querySelector('#desc').classList.add('ended')
        document.querySelector('#desc2').classList.add('ended')
        document.querySelector('#buttonscont').classList.add('ended')
        randomColorwl();
        randomColorwr();
        color1wl();
        color1wlr();
        scene.add(sunLight);
        setTimeout(() => {
            scene.add(sunLight2);
        }, 300); 

        setTimeout(() => {
            scene.add(fillLight) 
        }, 400);


    })
    
    
}
/////////////////////////////////////////////////////////////////////////
var letters = "0123456789ABCDEF";
var color = '#';

export function randomColor () {

    color = '#';
    for (var i = 0; i < 6; i++){
    color += letters[(Math.floor(Math.random() * 16))]};

 };


export function color1() {
    fillLight.color.set(color, 1, 6, 4)
}

window.addEventListener('click' , e=> {
    switch(e.target.id){
       case 'a5':
        randomColor();
        color1();
         break;

    }
 })


 var light = 1;
export function dark() {
    
 if (light == 1){
    scene.remove(fillLight);

    light = 0;}
    else if (light == 0){
    scene.add(fillLight);
    light = 1
    }

}

window.addEventListener('click' , e=> {
    switch(e.target.id){
       case 'a1':
            dark();
         break;
    }
 })
///////////////
 var lightwr = 1;
export function darkwr() {
    
 if (lightwr == 1){
    scene.remove(sunLight2)
    lightwr = 0;}
    else if (lightwr == 0){
    scene.add(sunLight2)
    lightwr = 1
    }

}

window.addEventListener('click' , e=> {
    switch(e.target.id){
       case 'a2':
            darkwr();
         break;
    }
 })
//////////////
 var lightwl = 1;
export function darkw() {
    
 if (lightwl == 1){
    scene.remove(sunLight)
    lightwl = 0;}
    else if (lightwl == 0){
    scene.add(sunLight)
    lightwl = 1
    }

}

window.addEventListener('click' , e=> {
    switch(e.target.id){
       case 'a3':
            darkw();
         break;
    }
 })


///////////////////////////////////////////

var colorwl = '#';
var colorwr = '#';
export function randomColorwl () {

    colorwl = '#';
    for (var i = 0; i < 6; i++){
    colorwl += letters[(Math.floor(Math.random() * 16))]};

 };


 export function randomColorwr () {

    colorwr = '#';
    for (var i = 0; i < 6; i++){
    colorwr += letters[(Math.floor(Math.random() * 16))]};

 };


export function color1wl() {
    sunLight.color.set(colorwl, 1, 6, 4)
}

export function color1wlr() {
    sunLight2.color.set(colorwr, 1, 6, 4)
}


window.addEventListener('click' , e=> {
    switch(e.target.id){
       case 'a4':
        randomColorwl();
        randomColorwr();
        color1wl();
        color1wlr();
         break;

    }
 })

/////////////////////////////////////////////////////////////////////////
//// PARALLAX CONFIG
const cursor = {x:0, y:0}
const clock = new Clock()
let previousTime = 0

/////////////////////////////////////////////////////////////////////////
//// RENDER LOOP FUNCTION

function rendeLoop() {

    TWEEN.update()

    if (secondContainer){
        renderer2.render(scene, camera2)
    } else{
        renderer.render(scene, camera)
    }

    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    const parallaxY = cursor.y
    fillLight.position.y -= ( parallaxY *9 + fillLight.position.y -2) * deltaTime

    const parallaxX = cursor.x
    fillLight.position.x += (parallaxX *8 - fillLight.position.x) * 2 * deltaTime

    cameraGroup.position.z -= (parallaxY/3 + cameraGroup.position.z) * 2 * deltaTime
    cameraGroup.position.x += (parallaxX/3 - cameraGroup.position.x) * 2 * deltaTime

    requestAnimationFrame(rendeLoop)
    
}

rendeLoop()


//////////////////////////////////////////////////
//// ON MOUSE MOVE TO GET CAMERA POSITION
document.addEventListener('mousemove', (event) => {
    event.preventDefault()

    cursor.x = event.clientX / window.innerWidth -0.5
    cursor.y = event.clientY / window.innerHeight -0.5

    // handleCursor(event)
}, false)



