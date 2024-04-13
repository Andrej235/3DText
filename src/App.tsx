import { Canvas } from "@react-three/fiber";
import "./App.css";
import Text3D from "./Text3D";

function App() {
  return (
    <Canvas>
      <Text3D bevelEnabled fontName="helvetiker" fontWeight="normal" text="Hello World!"/>
    </Canvas>
  );
}

export default App;
