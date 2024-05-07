
export const windowResizeListener = (master) => {
    window.addEventListener("resize", (master) => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        master.camera.aspect = width / height;
        master.camera.updateProjectionMatrix();
        master.renderer.setSize(width, height);
    });
}