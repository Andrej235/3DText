import { Canvas } from "@react-three/fiber";
import "./App.css";
import Text3D from "./Text3D";

function App() {
  return (
    <Canvas>
      <Text3D
        fontName="JetBrains"
        text="Hello World! =>"
        geometryProps={{
          bevelEnabled: true,
          size: 50,
          bevelSize: 2,
        }}
      />
    </Canvas>
  );
}

export default App;
