import Models from "./Model.js";
const posicion = document.querySelector("#posicion");
const posicion2 = document.querySelector("#posicion2");
let models = new Models();

export const htmlActionsListener = (index) => {

    posicion2.addEventListener("click", (e) => {
        const modelPosition = models.getLoadedModels(index).model.position;
        gsap.to(modelPosition, { duration: 1, x: -100, y: 376, z: -144 });
    });

    posicion.addEventListener("click", (e) => {
        const modelPosition = models.getLoadedModels(index).model.position;
        gsap.to(modelPosition, { duration: 1, x: 60, y: 376, z: -148 });
    });


};