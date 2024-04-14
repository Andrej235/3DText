import Text3D, { Text3DProps } from "./Text3D";
import { useState } from "react";
import useGUI from "./UseGUI";
import { Vector3 } from "three";

export default function Text3DWithGUI() {
  const [props, setProps] = useState<Text3DProps>({
    text: "Hello World!",
    fontName: "JetBrains",
    geometryProps: {
      bevelEnabled: true,
      size: 75,
      bevelSize: 5,
      bevelThickness: 1,
      curveSegments: 10,
      depth: 10,
      position: new Vector3(0, 0, 0),
    },
  });

  useGUI(props, setProps, "3D Text");

  return (
    <Text3D
      fontName={props.fontName}
      text={props.text}
      geometryProps={props.geometryProps}
    />
  );
}
