import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const modelPaths = [
  "/juice02.glb",
  "/juice03.glb",
  "/juice04.glb",
  "/juice05.glb",
];

const ThreeScene = () => {
  const [models, setModels] = useState([]);
  const [currentModel, setCurrentModel] = useState(null);
  const gltfRef = useRef();

  useEffect(() => {
    const loader = new GLTFLoader();
    const promises = modelPaths.map(
      (modelPath) =>
        new Promise((resolve) => {
          loader.load(modelPath, resolve);
        })
    );

    Promise.all(promises).then((loadedModels) => {
      const processedModels = loadedModels.map((gltf) => {
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            child.material.transparent = true;
          }
        });
        gltf.scene.scale.set(1.2, 1.2, 1.2);
        gltf.scene.rotation.x = Math.PI / 6;
        return gltf.scene;
      });

      setModels(processedModels);
      setCurrentModel(processedModels[0]); // Show the first model initially
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentModel(
        models[(models.indexOf(currentModel) + 1) % models.length]
      );
    }, 45000); // change every 45 seconds

    return () => {
      clearInterval(interval);
    };
  }, [models, currentModel]);

  useFrame(() => {
    if (gltfRef.current) {
      gltfRef.current.rotation.y += 0.004;
    }
  });

  return currentModel ? (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <primitive ref={gltfRef} object={currentModel} />
    </>
  ) : null;
};

const HomePage = () => {
  return (
    <div className="h-screen w-screen bg-transparent flex justify-center items-center mt-[115px] 2xl:mt-[150px] z-0">
      <Canvas>
        <ThreeScene />
      </Canvas>
    </div>
  );
};

export default HomePage;
