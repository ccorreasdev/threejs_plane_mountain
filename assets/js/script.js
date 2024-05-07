//Imports
import * as THREE from "./build/three.module.js";
import Master from "./class/Master.js";
import TouchControls from "./class/TouchControls.js";
import Models from "./class/Model.js";
import Lights from "./class/Lights.js";
import KeyListener from "./class/KeyListener.js";
import MouseMove from "./class/MouseMove.js";
import ScrollWindow from "./class/ScrollWindow.js";
import ModelMovement from "./class/ModelMovement.js";
import { htmlActionsListener } from "./class/HTMLActions.js";
import { calculateDistance } from "./class/Distances.js";

//Constants and variables
const canvas = document.querySelector("#canvas");
const progressBar = document.querySelector("#progress-bar");
let master = new Master();
let touchControls = new TouchControls();
let models = new Models();
let lights = new Lights();
let keyListener = new KeyListener();
let modelMovement = new ModelMovement();
let mouseMove = new MouseMove();
let scrollWindow = new ScrollWindow();
let model1, model2, model3, model4, model5, model6, model7;
let isEnterZoneGoogle = false;
let isEnterZoneGPT = false;
let isShooting = false;




const init = async () => {
    //Init master - Camera, scene, lights, renderer...
    master.initCamera(60, window.innerWidth / window.innerHeight, 0.1, 4000);
    master.camera.position.set(0, 1.5, 5);
    master.camera.lookAt(0, 0, 0);
    master.initScene();

    lights.initLights(4, 1);

    master.scene.add(lights.getDirectionalLight());
    master.scene.add(lights.getAmbientLight());

    master.initRenderer();
    master.renderer.setPixelRatio(window.devicePixelRatio);
    master.renderer.setSize(window.innerWidth, window.innerHeight);

    canvas.appendChild(master.renderer.domElement);

    master.initOrbitControls();

    //Load 3D Models
    models = new Models();

    await models.loadModelGLTFAnimation("plane").then((resolve) => {
        model1 = resolve;
        models.percentLoaded = 15;
        progressBar.innerHTML = models.percentLoaded + "%";
        return models.loadModelGLTFAnimation("birds");
    }).then((resolve) => {
        model2 = resolve;
        models.percentLoaded = 30;
        progressBar.innerHTML = models.percentLoaded + "%";
        return models.loadModelGLTF("mountains");
    }).then((resolve) => {
        model3 = resolve;
        models.percentLoaded = 45;
        progressBar.innerHTML = models.percentLoaded + "%";
        return models.loadModelGLTF("enter_key");
    }).then((resolve) => {
        model4 = resolve;
        models.percentLoaded = 60;
        progressBar.innerHTML = models.percentLoaded + "%";
        return models.loadModelGLTF("zone");
    }).then((resolve) => {
        model5 = resolve;
        models.percentLoaded = 75;
        progressBar.innerHTML = models.percentLoaded + "%";
        return models.loadModelGLTF("chatgpt");
    }).then((resolve) => {
        model6 = resolve;
        models.percentLoaded = 90;
        progressBar.innerHTML = models.percentLoaded + "%";
        return models.loadModelGLTF("spacial_misile")
    }).then((resolve) => {
        model7 = resolve;
        models.percentLoaded = 100;
        progressBar.innerHTML = models.percentLoaded + "%";
    })

    //Add to scene 3D Models
    models.getLoadedModels(0).mixer.clipAction(models.getLoadedModels(0).animations[0]).play();
    models.getLoadedModels(0).model.scale.set(1, 1, 1)
    models.getLoadedModels(0).model.position.x = -2;
    models.getLoadedModels(0).model.position.y = 376;
    models.getLoadedModels(0).model.position.z = -374;
    models.getLoadedModels(0).model.rotation.y = (0 * Math.PI) / 180;
    master.scene.add(models.getLoadedModels(0).model);

    models.getLoadedModels(1).mixer.clipAction(models.getLoadedModels(1).animations[0]).play();
    models.getLoadedModels(1).model.scale.set(1, 1, 1);
    models.getLoadedModels(1).model.rotation.y = (0 * Math.PI) / 180;
    models.getLoadedModels(1).model.position.x = 60
    models.getLoadedModels(1).model.position.y = 376;
    models.getLoadedModels(1).model.position.z = -149
    master.scene.add(models.getLoadedModels(1).model);

    models.getLoadedModels(2).scale.set(500, 500, 500);
    models.getLoadedModels(2).rotation.y = (180 * Math.PI) / 180;
    models.getLoadedModels(2).position.y = 0;
    models.getLoadedModels(2).position.z = 0;
    master.scene.add(models.getLoadedModels(2));

    models.getLoadedModels(3).scale.set(0.5, 0.5, .05);
    models.getLoadedModels(3).rotation.y = (180 * Math.PI) / 180;
    models.getLoadedModels(3).position.x = 62;
    models.getLoadedModels(3).position.y = 375;
    models.getLoadedModels(3).position.z = -144
    master.scene.add(models.getLoadedModels(3));

    models.getLoadedModels(4).scale.set(10, 10, 10);
    models.getLoadedModels(4).rotation.y = (90 * Math.PI) / 180;
    models.getLoadedModels(4).position.x = 62;
    models.getLoadedModels(4).position.y = 360;
    models.getLoadedModels(4).position.z = -144
    master.scene.add(models.getLoadedModels(4));

    models.getLoadedModels(5).scale.set(10, 10, 10);
    models.getLoadedModels(5).rotation.y = (90 * Math.PI) / 180;
    models.getLoadedModels(5).position.x = -100;
    models.getLoadedModels(5).position.y = 360;
    models.getLoadedModels(5).position.z = -144
    master.scene.add(models.getLoadedModels(5));

    models.getLoadedModels(6).scale.set(0.05, 0.05, 0.05);
    models.getLoadedModels(6).rotation.x = (90 * Math.PI) / 180;
    models.getLoadedModels(6).position.x = -100;
    models.getLoadedModels(6).position.y = 360;
    models.getLoadedModels(6).position.z = -144
    master.scene.add(models.getLoadedModels(6));

    //Listeners
    //windowResizeListener(master);
    mouseMove.mouseMoveListener();
    scrollWindow.scrollListener();
    keyListener.init();
    touchControls.initTouchControls(keyListener.getKeysPressed());
    htmlActionsListener(0);

};


//Render scene
const render = () => {
    master.renderer.render(master.scene, master.camera);
};

//Animate scene
const animate = () => {
    requestAnimationFrame(animate);

    //Wait last model is loaded
    if (models.getLoadedModels(6)) {

        //Movement controller model 1 - Plane
        modelMovement.moveModel(keyListener, models.getLoadedModels(0), 14);

        //Camera follow 3D model 1 - plane
        let distance = 3.5;
        const objectPosition = models.getLoadedModels(0).model.position;
        const cameraPosition = new THREE.Vector3(
            objectPosition.x,
            objectPosition.y + 1.5,
            objectPosition.z - distance
        );

        master.camera.position.copy(cameraPosition);
        master.camera.lookAt(objectPosition);

        //Animations mixer
        if (models.getLoadedModels(0) && models.getLoadedModels(1)) {
            models.getLoadedModels(0).mixer.update(0.01);
            models.getLoadedModels(1).mixer.update(0.01);
        }

        //Distances from other models
        distance = master.camera.position.distanceTo(models.getLoadedModels(1).model.position);
        const distanceGPT = master.camera.position.distanceTo(models.getLoadedModels(5).position);

        // Define un rango de distancia para que el objeto aparezca
        const minDistance = 30;
        if (distance < minDistance) {
            isEnterZoneGoogle = true;
            console.log("GOOGLE");

        } else {
            isEnterZoneGoogle = false;

        }

        if (distanceGPT < minDistance) {
            isEnterZoneGPT = true;


        } else {
            isEnterZoneGPT = false;

        }





    }
    render();
};


init();
animate();


