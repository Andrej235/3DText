import Text3D, { Text3DProps } from "./Text3D";
import { useEffect, useState } from "react";
import UseGUI from "./UseGUI";

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
    },
  });

  UseGUI({
    state: props,
    setState: setProps,
  });

  useEffect(() => {
    console.log(props);
  }, [props]);

  return (
    <Text3D
      fontName={props.fontName}
      text={props.text}
      geometryProps={props.geometryProps}
    />
  );
}
