import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ThreeScene = () => {
  const gltfRef = useRef();
  const [model, setModel] = useState();

  useFrame(() => {
    if (gltfRef.current) {
      gltfRef.current.rotation.y += 0.01; // You can adjust this for different rotation speeds
    }
  });

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("/plastic.glb", (gltf) => {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.material.transparent = true;
        }
      });

      // Scale down the model
      gltf.scene.scale.set(0.2, 0.2, 0.2); // Change these values to what suits you

      // Adjust the model pitch
      gltf.scene.rotation.x = Math.PI / 6; // Change this value to adjust the pitch

      setModel(gltf.scene);
    });
  }, []);

  return model ? (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <primitive ref={gltfRef} object={model} />
    </>
  ) : null;
};

const HomePage = () => {
  return (
    <div className="h-screen w-screen bg-transparent flex justify-center items-center mt-[115px] 2xl:mt-[210px] z-0">
      <Canvas>
        <ThreeScene />
      </Canvas>
    </div>
  );
};

export default HomePage;
