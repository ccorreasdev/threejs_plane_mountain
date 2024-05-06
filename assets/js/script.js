//IMPORTS
import * as THREE from "./build/three.module.js";
import { GLTFLoader } from "./jsm/loaders/GLTFLoader.js"
import { OrbitControls } from "./jsm/controls/OrbitControls.js";


//CONSTANTS AND VARIABLES
const posicion = document.querySelector("#posicion");
const posicion2 = document.querySelector("#posicion2");
const progressBar = document.querySelector("#progress-bar");
const canvas = document.querySelector("#canvas");
let camera, scene, renderer, mixer, controls;
let model1, model2, model3, model4, model5, model6;
let isEnterZone = false;
let isEnterZoneGPT = false;
let actionModel1, actionModel2, actionModel3, actionModel4;
let keysPressed = [];
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const goUp = document.querySelector("#up");
const goDown = document.querySelector("#down");
const goLeft = document.querySelector("#left");
const goRight = document.querySelector("#right");
const goAscend = document.querySelector("#ascend");
const goDescend = document.querySelector("#descend");

goUp.addEventListener("touchstart", (e) => {

    if (!keysPressed.includes("w")) {
        keysPressed.push("w");
    }
})

goUp.addEventListener("touchend", (e) => {
    const index = keysPressed.indexOf("w");
    if (index !== -1) {
        keysPressed.splice(index, 1);
    }
})

goDown.addEventListener("mousedown", (e) => {

    if (!keysPressed.includes("s")) {
        keysPressed.push("s");
    }
})

goDown.addEventListener("mouseup", (e) => {
    const index = keysPressed.indexOf("s");
    if (index !== -1) {
        keysPressed.splice(index, 1);
    }
})

goLeft.addEventListener("mousedown", (e) => {

    if (!keysPressed.includes("a")) {
        keysPressed.push("a");
    }
})

goLeft.addEventListener("mouseup", (e) => {
    const index = keysPressed.indexOf("a");
    if (index !== -1) {
        keysPressed.splice(index, 1);
    }
})

goRight.addEventListener("mousedown", (e) => {

    if (!keysPressed.includes("d")) {
        keysPressed.push("d");
    }
})

goRight.addEventListener("mouseup", (e) => {
    const index = keysPressed.indexOf("d");
    if (index !== -1) {
        keysPressed.splice(index, 1);
    }
})

goAscend.addEventListener("mousedown", (e) => {

    if (!keysPressed.includes("e")) {
        keysPressed.push("e");
    }
})

goAscend.addEventListener("mouseup", (e) => {
    const index = keysPressed.indexOf("e");
    if (index !== -1) {
        keysPressed.splice(index, 1);
    }
})

goDescend.addEventListener("mousedown", (e) => {

    if (!keysPressed.includes("q")) {
        keysPressed.push("q");
    }
})

goDescend.addEventListener("mouseup", (e) => {
    const index = keysPressed.indexOf("q");
    if (index !== -1) {
        keysPressed.splice(index, 1);
    }
})


posicion2.addEventListener("click", (e) => {
    gsap.to(model1.model.position, { duration: 1, x: -100, y: 376, z: -144 });
});


posicion.addEventListener("click", (e) => {

    gsap.to(model1.model.position, { duration: 1, x: 60, y: 376, z: -148 });
});
//FUNCTIONS
const scaleValue = (value, minInput, maxInput, minOutput, maxOutput) => {
    return minOutput + (maxOutput - minOutput) * ((value - minInput) / (maxInput - minInput));
}

const onWindowResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
};

const onMouseClick = (event) => {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        const selectedObject = intersects[0].object;
        console.log(selectedObject);
    }
}

const onScroll = (e) => {
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollMaxY = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = scrollY / scrollMaxY;
};

const onMouseMove = (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const posX = scaleValue(mouseX, 0, window.innerWidth, 0, 100);
    const posY = scaleValue(mouseY, 0, window.innerHeight, 0, 100);
}

const loadModelGLTF = (modelURL) => {
    const loader = new GLTFLoader();

    return new Promise((resolve, reject) => {
        loader.load(
            `./assets/models/${modelURL}/scene.gltf`,
            function (gltf) {

                const container = new THREE.Group();
                container.add(gltf.scene);

                // Se resuelve la promesa con el modelo y las animaciones
                resolve(container);
            },
            function (xhr) {
                // La función de progreso (puede ser vacía o implementada según sea necesario)
            },
            function (error) {
                // Se llama a reject en caso de error
                reject(error);
            }
        );
    });
};

const loadModelGLTFAnimated = (modelURL) => {
    const loader = new GLTFLoader();

    return new Promise((resolve, reject) => {
        loader.load(
            `./assets/models/${modelURL}/scene.gltf`,
            function (gltf) {

                mixer = new THREE.AnimationMixer(gltf.scene);
                const container = new THREE.Group();
                container.add(gltf.scene);

                // Se resuelve la promesa con el modelo y las animaciones
                resolve({
                    model: container,
                    animations: gltf.animations,
                    mixer: mixer // Se pasa también el mixer para controlar las animaciones
                });
            },
            function (xhr) {
                // La función de progreso (puede ser vacía o implementada según sea necesario)
            },
            function (error) {
                // Se llama a reject en caso de error
                reject(error);
            }
        );
    });
};



const init = async () => {


    window.addEventListener("scroll", onScroll);
    document.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onWindowResize);
    window.addEventListener('click', onMouseClick);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 4000);
    camera.position.set(0, 1.5, 5);
    camera.lookAt(0, 0, 0);
    scene = new THREE.Scene();
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 2000, 1000);
    directionalLight.lookAt(0, 0, 0);
    directionalLight.intensity = 6;
    scene.add(directionalLight);
    const ambientlight = new THREE.AmbientLight(0xffffff, 1);
    ambientlight.position.set(0, 0, 0);
    ambientlight.intensity = 1;
    scene.add(ambientlight);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvas.appendChild(renderer.domElement);


    // Crear e inicializar los controles de órbita
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Habilitar amortiguación del movimiento
    controls.dampingFactor = 0.25; // Factor de amortiguación
    controls.rotateSpeed = 0.35; // Velocidad de rotación
    controls.zoomSpeed = 0.5; // Velocidad de zoom
    controls.enablePan = false; // Deshabilitar el pan

    await loadModelGLTFAnimated("plane").then((resolve) => {
        model1 = resolve;
        return loadModelGLTFAnimated("birds");
    }).then((resolve) => {
        model2 = resolve;
        return loadModelGLTF("mountains");
    }).then((resolve) => {
        model3 = resolve;
        return loadModelGLTF("enter_key");
    }).then((resolve) => {
        model4 = resolve;
        return loadModelGLTF("zone");
    }).then((resolve) => {
        model5 = resolve;
        return loadModelGLTF("chatgpt");
    }).then((resolve) => {
        model6 = resolve;
    })

    model1.mixer.clipAction(model1.animations[0]).play();
    model1.model.scale.set(1, 1, 1)
    model1.model.position.x = 60
    model1.model.position.y = 376;
    model1.model.position.z = -148
    model1.model.rotation.y = (0 * Math.PI) / 180;
    scene.add(model1.model);

    model2.mixer.clipAction(model2.animations[0]).play();
    model2.model.scale.set(1, 1, 1);
    model2.model.rotation.y = (0 * Math.PI) / 180;
    model2.model.position.x = 60
    model2.model.position.y = 376;
    model2.model.position.z = -149
    scene.add(model2.model);

    model3.scale.set(500, 500, 500);
    model3.rotation.y = (180 * Math.PI) / 180;
    model3.position.y = 0;
    model3.position.z = 0;
    scene.add(model3);


    model4.scale.set(0.5, 0.5, .05);
    model4.rotation.y = (180 * Math.PI) / 180;
    model4.position.x = 62;
    model4.position.y = 375;
    model4.position.z = -144
    scene.add(model4);

    model5.scale.set(10, 10, 10);
    model5.rotation.y = (90 * Math.PI) / 180;
    model5.position.x = 62;
    model5.position.y = 360;
    model5.position.z = -144
    scene.add(model5);

    model6.scale.set(10, 10, 10);
    model6.rotation.y = (90 * Math.PI) / 180;
    model6.position.x = -100;
    model6.position.y = 360;
    model6.position.z = -144
    scene.add(model6);



    document.addEventListener("keydown", function (event) {
        // El código de la tecla presionada está en event.keyCode o event.key
        // Aquí puedes hacer algo en respuesta a la pulsación de tecla
        console.log("Tecla presionada:", event.key);
        if (!keysPressed.includes(event.key)) {
            keysPressed.push(event.key);
        }

    })


    // Función para manejar el evento de soltar una tecla
    document.addEventListener("keyup", function (event) {
        // Remueve la tecla soltada del array
        const index = keysPressed.indexOf(event.key);
        if (index !== -1) {
            if (keysPressed[index] === "Enter" && isEnterZone) {
                window.open("https://www.google.es")
            }

            if (keysPressed[index] === "Enter" && isEnterZoneGPT) {
                window.open("https://chatgpt.com")
            }
            keysPressed.splice(index, 1);
        }
    });

};


const render = () => {
    renderer.render(scene, camera);
};

const animate = () => {
    requestAnimationFrame(animate);
    const speed = 8;
    // Actualiza la posición del objeto y la cámara
    if (model2) {
        keysPressed.forEach((key) => {
            // Mover hacia adelante (eje Z positivo)

            if (key === "w") {
                model1.model.position.z += 0.1 * speed; // Mueve hacia adelante
            }
            // Mover hacia atrás (eje Z negativo)
            if (key === "s") {
                model1.model.position.z -= 0.1 * speed; // Mueve hacia atrás
            }
            // Mover hacia la izquierda (eje X negativo)
            if (key === "a") {
                model1.model.position.x += 0.2 * speed; // Mueve hacia la izquierda
            }
            // Mover hacia la derecha (eje X positivo)
            if (key === "d") {
                model1.model.position.x -= 0.2 * speed; // Mueve hacia la derecha
            }
            if (key === "e") {
                model1.model.position.y += 0.2 * speed; // Mueve hacia la izquierda
            }
            // Mover hacia la derecha (eje X positivo)
            if (key === "q") {
                model1.model.position.y -= 0.2 * speed; // Mueve hacia la derecha
            }
        });


        //console.log(model1.model.position)

        // Actualiza la posición de la cámara para seguir al objeto
        const distance = 4; // Distancia detrás del objeto
        const objectPosition = model1.model.position;
        const cameraPosition = new THREE.Vector3(
            objectPosition.x,
            objectPosition.y + 1.5,
            objectPosition.z - distance
        );
        camera.position.copy(cameraPosition);
        camera.lookAt(objectPosition);
    }

    //controls.update();
    if (model1.mixer) {
        model1.mixer.update(0.01);
    }

    if (model2.mixer) {
        model2.mixer.update(0.01);
    }


    const distance = camera.position.distanceTo(model2.model.position);
    const distanceGPT = camera.position.distanceTo(model6.position);

    // Define un rango de distancia para que el objeto aparezca
    const minDistance = 30; // Ajusta según sea necesario
    //console.log(distance);
    if (distance < minDistance) {
        isEnterZone = true;


    } else {
        isEnterZone = false;

    }

    if (distanceGPT < minDistance) {
        isEnterZoneGPT = true;


    } else {
        isEnterZoneGPT = false;

    }




    render();
};


const createGround = () => {
    // Crear geometría del suelo
    const groundGeometry = new THREE.PlaneGeometry(100, 100); // Tamaño del suelo (ancho, largo)

    // Crear material del suelo (puedes ajustar los parámetros según tus necesidades)
    const groundMaterial = new THREE.MeshBasicMaterial({ color: 0xfefefe, side: THREE.DoubleSide });

    // Crear el mesh del suelo
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);

    // Rotar el suelo para que esté horizontal
    groundMesh.rotation.x = -Math.PI / 2; // Rotación en radianes

    // Colocar el suelo en la altura 0
    groundMesh.position.y = 0;

    // Agregar el suelo a la escena
    scene.add(groundMesh);
}

init();
//createGround();
animate();

