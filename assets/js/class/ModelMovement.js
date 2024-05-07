export default class ModelMovement {

    moveModel(keyListener, model, speed) {
        keyListener.getKeysPressed().forEach((key) => {
            if (key === "w") {
                model.model.position.z += 0.1 * speed;
            }

            if (key === "s") {
                model.model.position.z -= 0.1 * speed;
            }

            if (key === "a") {
                model.model.position.x += 0.2 * speed;
            }

            if (key === "d") {
                model.model.position.x -= 0.2 * speed;
            }
            if (key === "e") {
                model.model.position.y += 0.2 * speed;
            }

            if (key === "q") {
                model.model.position.y -= 0.2 * speed;
            }
        });
    }

}