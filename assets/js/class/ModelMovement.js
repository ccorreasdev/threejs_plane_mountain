
export default class ModelMovement {


    moveModel(keyListener, model, speed) {
        keyListener.getKeysPressed().forEach((key) => {
            // Mover hacia adelante (eje Z positivo)

            if (key === "w") {
                model.model.position.z += 0.1 * speed; // Mueve hacia adelante
            }
            // Mover hacia atrás (eje Z negativo)
            if (key === "s") {
                model.model.position.z -= 0.1 * speed; // Mueve hacia atrás
            }
            // Mover hacia la izquierda (eje X negativo)
            if (key === "a") {
                model.model.position.x += 0.2 * speed; // Mueve hacia la izquierda
            }
            // Mover hacia la derecha (eje X positivo)
            if (key === "d") {
                model.model.position.x -= 0.2 * speed; // Mueve hacia la derecha
            }
            if (key === "e") {
                model.model.position.y += 0.2 * speed; // Mueve hacia la izquierda
            }
            // Mover hacia la derecha (eje X positivo)
            if (key === "q") {
                model.model.position.y -= 0.2 * speed; // Mueve hacia la derecha
            }
            // if (key === " " && !isShooting) {
            //     isShooting = true;
            //     setTimeout(() => {
            //         isShooting = false;
            //     }, 500)
            // }
        });
    }


}