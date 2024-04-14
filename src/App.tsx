import { Canvas } from "@react-three/fiber";
import "./App.css";
import Text3DWithGUI from "./3DText/Text3DWithGUI";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";
import useGUI from "./3DText/UseGUI";

function App() {
  const [test, setTest] = useState(1);
  useGUI(test, setTest, "Test");
  useEffect(() => {
    console.log(test);
  }, [test]);

  return (
    <Canvas>
      {/*       <Text3D
        fontName="JetBrains"
        text="Hello World! =>"
        geometryProps={{
          bevelEnabled: true,
          size: test,
          bevelSize: 2,
        }}
      /> */}

      <Text3DWithGUI />
      <OrbitControls />
    </Canvas>
  );
}

export default App;
