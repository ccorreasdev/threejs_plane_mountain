const posicion = document.querySelector("#posicion");
const posicion2 = document.querySelector("#posicion2");

export const htmlActionsListener = (model1) => {

    posicion2.addEventListener("click", (e) => {
        gsap.to(model1.model.position, { duration: 1, x: -100, y: 376, z: -144 });
    });

    posicion.addEventListener("click", (e) => {
        gsap.to(model1.model.position, { duration: 1, x: 60, y: 376, z: -148 });
    });


};