import * as THREE from "../build/three.module.js";
import { GLTFLoader } from "../jsm/loaders/GLTFLoader.js"

export default class Models {

    static loadedModels = [];

    getLoadedModels(index) {
        return Models.loadedModels[index];
    }

    loadModelGLTF(modelURL) {
        const loader = new GLTFLoader();
        return new Promise((resolve, reject) => {
            loader.load(
                `./assets/models/${modelURL}/scene.gltf`,
                function (gltf) {
                    const container = new THREE.Group();
                    container.add(gltf.scene);
                    Models.loadedModels.push(container);
                    resolve(container);
                },
                function (xhr) {

                },
                function (error) {
                    reject(error);
                }
            );
        });
    };

    loadModelGLTFAnimation(modelURL) {
        const loader = new GLTFLoader();
        return new Promise((resolve, reject) => {
            loader.load(
                `./assets/models/${modelURL}/scene.gltf`,
                function (gltf) {
                    const mixer = new THREE.AnimationMixer(gltf.scene);
                    const container = new THREE.Group();
                    container.add(gltf.scene);
                    Models.loadedModels.push({
                        model: container,
                        animations: gltf.animations,
                        mixer: mixer
                    });
                    resolve({
                        model: container,
                        animations: gltf.animations,
                        mixer: mixer
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

    }
}
