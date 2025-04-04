window.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("renderCanvas");
  const engine = new BABYLON.Engine(canvas, true);

  const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.03, 0.03, 0.05); // Almost black, but not flat

    // Camera
    const camera = new BABYLON.ArcRotateCamera(
      "Camera",
      Math.PI / 2,
      Math.PI / 2.5,
      15,
      new BABYLON.Vector3(0, 2, 0),
      scene
    );
    camera.attachControl(canvas, true);
    camera.lowerRadiusLimit = 8;
    camera.upperRadiusLimit = 30;

    // Lights
    const hemiLight = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
    hemiLight.intensity = 0.8;

    const dirLight = new BABYLON.DirectionalLight("dir", new BABYLON.Vector3(-1, -2, -1), scene);
    dirLight.position = new BABYLON.Vector3(10, 10, 10);
    dirLight.intensity = 1;

    // Run name from query
    const urlParams = new URLSearchParams(window.location.search);
    const runName = urlParams.get("name") || "Run Name";

    // Create background glow plane (for fake depth)
    const basePlane = BABYLON.MeshBuilder.CreatePlane("bgPlane", { width: 12, height: 5.5 }, scene);
    const baseMat = new BABYLON.StandardMaterial("baseMat", scene);
    baseMat.diffuseColor = new BABYLON.Color3(0.05, 0.1, 0.2);
    baseMat.alpha = 0.6;
    basePlane.material = baseMat;
    basePlane.position.z = 0.05;

    // Dynamic text texture
    const dynamicTexture = new BABYLON.DynamicTexture("dynamic texture", 1024, scene, true);
    dynamicTexture.hasAlpha = true;

    const font = "bold 120px Segoe UI";
    let currentColor = "deepskyblue";
    dynamicTexture.drawText(runName, null, 600, font, currentColor, "transparent", true);

    // Main text plane
    const textPlane = BABYLON.MeshBuilder.CreatePlane("textPlane", { width: 12, height: 5 }, scene);
    const textMat = new BABYLON.StandardMaterial("textMat", scene);
    textMat.diffuseTexture = dynamicTexture;
    textMat.backFaceCulling = false;
    textMat.emissiveColor = BABYLON.Color3.White(); // Let glowLayer handle color pop
    textPlane.material = textMat;
    textPlane.position.y = 2;

    // Glow layer
    const glow = new BABYLON.GlowLayer("glow", scene);
    glow.intensity = 0.6;

    // Soft shadow plane (fake 3D shadow)
    const shadowPlane = BABYLON.MeshBuilder.CreatePlane("shadow", { width: 13, height: 5 }, scene);
    const shadowMat = new BABYLON.StandardMaterial("shadowMat", scene);
    shadowMat.diffuseColor = new BABYLON.Color3(0, 0, 0);
    shadowMat.alpha = 0.3;
    shadowPlane.material = shadowMat;
    shadowPlane.position.z = -0.1;
    shadowPlane.position.y = 1.95;

    // Subtle rotation
    scene.registerBeforeRender(() => {
      textPlane.rotation.y += 0.002;
      basePlane.rotation.y += 0.002;
      shadowPlane.rotation.y += 0.002;
    });

    // Handle external color change
    window.addEventListener("message", (event) => {
      if (event.data.type === "changeColor") {
        const color = event.data.color.toLowerCase();
        currentColor = color;
        dynamicTexture.drawText(runName, null, 600, font, color, "transparent", true);
        textMat.diffuseTexture = dynamicTexture;

        // Optional: tweak glow to match new color
        glow.customEmissiveColorSelector = function (mesh, subMesh, material, result) {
          result.set(
            color === "green" ? 0.2 : color === "red" ? 0.5 : 0.1,
            color === "green" ? 0.9 : color === "red" ? 0.1 : 0.8,
            color === "green" ? 0.2 : color === "red" ? 0.1 : 0.9
          );
        };
      }
    });

    return scene;
  };

  const scene = createScene();
  engine.runRenderLoop(() => scene.render());
  window.addEventListener("resize", () => engine.resize());
});
