window.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("renderCanvas");
  const engine = new BABYLON.Engine(canvas, true);

  const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.03, 0.03, 0.05);

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

    const hemiLight = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
    hemiLight.intensity = 0.8;

    const dirLight = new BABYLON.DirectionalLight("dir", new BABYLON.Vector3(-1, -2, -1), scene);
    dirLight.position = new BABYLON.Vector3(10, 10, 10);
    dirLight.intensity = 1;

    const urlParams = new URLSearchParams(window.location.search);
    const runName = urlParams.get("name") || "Run Name";
    let currentColor = urlParams.get("color") || "deepskyblue";

    const glow = new BABYLON.GlowLayer("glow", scene);
    glow.intensity = 0.6;

    const getColor3FromString = (colorStr) => {
      const dummy = document.createElement("div");
      dummy.style.color = colorStr;
      document.body.appendChild(dummy);

      const computedColor = getComputedStyle(dummy).color;
      document.body.removeChild(dummy);

      const rgb = computedColor.match(/\d+/g).map(Number);
      return new BABYLON.Color3(rgb[0] / 255, rgb[1] / 255, rgb[2] / 255);
    };
    function drawWrappedText(texture, text, maxWidth, lineHeight, font, color, centerVertically = true) {
      const ctx = texture.getContext();
      ctx.font = font;
      ctx.clearRect(0, 0, texture.getSize().width, texture.getSize().height);
    
      const words = text.split(" ");
      let lines = [];
      let line = "";
    
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const testWidth = ctx.measureText(testLine).width;
    
        if (testWidth > maxWidth && n > 0) {
          lines.push(line.trim());
          line = words[n] + " ";
        } else {
          line = testLine;
        }
      }
      lines.push(line.trim());
    
      const canvasHeight = texture.getSize().height;
      const canvasWidth = texture.getSize().width;
      const totalHeight = lines.length * lineHeight;
    
      let startY = centerVertically
        ? (canvasHeight - totalHeight) / 2 + lineHeight
        : lineHeight;
    
      ctx.fillStyle = color;
    
      for (let i = 0; i < lines.length; i++) {
        const textWidth = ctx.measureText(lines[i]).width;
        const x = (canvasWidth - textWidth) / 2;
        const y = startY + i * lineHeight;
        ctx.fillText(lines[i], x, y);
      }
    
      texture.update(); // Must call to reflect changes
    }
    
    

    const setGlowColorSelector = () => {
      glow.customEmissiveColorSelector = function (mesh, subMesh, material, result) {
        const col = getColor3FromString(currentColor);
        result.set(col.r, col.g, col.b);
      };
    };

    setGlowColorSelector();

    const basePlane = BABYLON.MeshBuilder.CreatePlane("bgPlane", { width: 12, height: 5.5 }, scene);
    const baseMat = new BABYLON.StandardMaterial("baseMat", scene);
    baseMat.diffuseColor = new BABYLON.Color3(0.05, 0.1, 0.2);
    baseMat.alpha = 0.6;
    basePlane.material = baseMat;
    basePlane.position.z = 0.05;

    const dynamicTexture = new BABYLON.DynamicTexture("dynamic texture", 1024, scene, true);
    dynamicTexture.hasAlpha = true;
    const font = "bold 120px Segoe UI";
    drawWrappedText(dynamicTexture, runName, 900, 130, font, currentColor, true); // vertical centering enabled


    const textPlane = BABYLON.MeshBuilder.CreatePlane("textPlane", { width: 12, height: 5 }, scene);
    const textMat = new BABYLON.StandardMaterial("textMat", scene);
    textMat.diffuseTexture = dynamicTexture;
    textMat.backFaceCulling = false;
    textMat.emissiveColor = BABYLON.Color3.White();
    textPlane.material = textMat;
    textPlane.position.y = 2;

    // const shadowPlane = BABYLON.MeshBuilder.CreatePlane("shadow", { width: 13, height: 5 }, scene);
    // const shadowMat = new BABYLON.StandardMaterial("shadowMat", scene);
    // shadowMat.diffuseColor = new BABYLON.Color3(0, 0, 0);
    // shadowMat.alpha = 0.3;
    // shadowPlane.material = shadowMat;
    // shadowPlane.position.z = -0.1;
    // shadowPlane.position.y = 1.95;

    scene.registerBeforeRender(() => {
      textPlane.rotation.y += 0.002;
      basePlane.rotation.y += 0.002;
      // shadowPlane.rotation.y += 0.002;
    });

    // 🎯 Message listener for color changes
    window.addEventListener("message", (event) => {
      const msg = event.data;
      if (msg && msg.type === "changeColor" && msg.color) {
        currentColor = msg.color.toLowerCase();

        // Update dynamic texture
        dynamicTexture.clear();
        drawWrappedText(dynamicTexture, runName, 900, 130, font, currentColor, true);
        textMat.diffuseTexture = dynamicTexture;

        // Update glow
        setGlowColorSelector();
      }
    });

    return scene;
  };

  const scene = createScene();
  engine.runRenderLoop(() => scene.render());
  window.addEventListener("resize", () => engine.resize());
});
