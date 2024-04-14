import { useEffect, useRef, useState } from "react";
import { Mesh, Vector3 } from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
//@ts-ignore
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { Font } from "three/examples/jsm/Addons.js";

export interface Text3DProps {
  text: string;
  fontName?: "JetBrains";
  geometryProps?: Partial<Text3DGeometryProps>;
}

interface Text3DGeometryProps {
  bevelEnabled: boolean;
  bevelThickness: number;
  bevelSize: number;
  curveSegments: number;
  depth: number;
  size: number;
  position: Vector3;
}

export default function Text3D({ text, fontName, geometryProps }: Text3DProps) {
  const [font, setFont] = useState<Font>();
  const meshRef = useRef<Mesh>(null);

  useEffect(() => {
    loadFont();
  }, [meshRef.current, fontName]);

  useEffect(createTextGeometry, [font, text, geometryProps]);

  function loadFont() {
    const loader = new FontLoader();
    loader.load(`/${fontName ?? "JetBrains"}.json`, (response: Font) =>
      setFont(response)
    );
  }

  function createTextGeometry() {
    if (!font || !meshRef.current) return;

    const textGeometry = new TextGeometry(text, {
      font: font,
      size: geometryProps?.size,
      depth: geometryProps?.depth,
      curveSegments: geometryProps?.curveSegments,
      bevelEnabled: geometryProps?.bevelEnabled,
      bevelThickness: geometryProps?.bevelThickness,
      bevelSize: geometryProps?.bevelSize,
    });

    meshRef.current.geometry = textGeometry;
  }

  return (
    <mesh
      ref={meshRef}
      //If position is not deconstructed it will not rerender every time it changes
      position={[
        geometryProps?.position?.x ?? 0,
        geometryProps?.position?.y ?? 0,
        geometryProps?.position?.z ?? 0,
      ]}
    >
      <meshStandardMaterial color="#00f" />
    </mesh>
  );
}
