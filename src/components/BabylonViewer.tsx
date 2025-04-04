import { useEffect, useRef } from "react";
import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  Color3,
  StandardMaterial,
} from "@babylonjs/core";
import {} from "@babylonjs/core";

function BabylonViewer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new Engine(canvasRef.current, true);
    const scene = new Scene(engine);

    const camera = new ArcRotateCamera(
      "camera1",
      Math.PI / 2,
      Math.PI / 4,
      5,
      Vector3.Zero(),
      scene
    );
    camera.attachControl(canvasRef.current, true);

    const light = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
    light.intensity = 0.9;

    const sphere = MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);
    sphere.position.y = 1;

    const sphereMat = new StandardMaterial("sphereMat", scene);
    sphereMat.diffuseColor = new Color3(0.4, 0.7, 1);

    sphere.material = sphereMat;
    sphere.position.y = 1;
    sphere.material!.diffuseColor = new Color3(0.4, 0.7, 1);

    engine.runRenderLoop(() => scene.render());

    const resize = () => engine.resize();
    window.addEventListener("resize", resize);

    return () => {
      engine.dispose();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
}

export default BabylonViewer;
