import Text3D, { Text3DProps } from "./Text3D";
import { useState } from "react";
import useGUI from "./UseGUI";
import { Euler, Object3DEventMap, Vector3 } from "three";
import { EventHandlers } from "@react-three/fiber/dist/declarations/src/core/events";

export default function Text3DWithGUI({
  children,
  ...eventHandlers
}: { children: JSX.Element } & EventHandlers & Partial<Object3DEventMap>) {
  const [props, setProps] = useState<Text3DProps>({
    text: "Hello World!",
    fontName: "JetBrains",
    geometryProps: {
      bevelEnabled: true,
      fontSize: 75,
      bevelSize: 5,
      bevelThickness: 1,
      curveSegments: 10,
      depth: 10,
    },
    meshProps: {
      position: new Vector3(0, 0, 0),
      rotation: new Euler(0, 0, 0),
      castShadow: false,
      receiveShadow: false,
    },
  });

  useGUI(props, setProps, "3D Text");

  return (
    <Text3D
      fontName={props.fontName}
      text={props.text}
      geometryProps={props.geometryProps}
      meshProps={props.meshProps}
      {...eventHandlers}
    >
      {children}
    </Text3D>
  );
}
