import { Canvas } from "@react-three/fiber";
import "./App.css";
import Text3DWithGUI from "./3DText/Text3DWithGUI";
import { OrbitControls } from "@react-three/drei";

function App() {
  return (
    <Canvas>
      {/*       <Text3D
        fontName="JetBrains"
        text="Hello World! =>"
        geometryProps={{
          bevelEnabled: true,
          size: 50,
          bevelSize: 2,
        }}
      /> */}

      <Text3DWithGUI />
      <OrbitControls />
    </Canvas>
  );
}

export default App;
