import { useEffect, useRef, useState } from "react";
import { Euler, Mesh, Object3DEventMap, Vector3 } from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
//@ts-ignore
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { Font } from "three/examples/jsm/Addons.js";
import { EventHandlers } from "@react-three/fiber/dist/declarations/src/core/events";

export interface Text3DProps extends EventHandlers, Partial<Object3DEventMap> {
  text: string;
  fontName?: "JetBrains";
  geometryProps?: Partial<Text3DGeometryProps>;
  meshProps?: Partial<Text3DMeshProps>;
}

export interface Text3DGeometryProps {
  bevelEnabled: boolean;
  bevelThickness: number;
  bevelSize: number;
  curveSegments: number;
  depth: number;
  fontSize: number;
}

export interface Text3DMeshProps {
  position: Vector3;
  rotation: Euler;
  castShadow: boolean;
  receiveShadow: boolean;
}

export default function Text3D({
  text,
  fontName,
  geometryProps,
  meshProps,
  children,
  ...eventHandlers
}: Text3DProps & {
  children: JSX.Element;
}) {
  const [font, setFont] = useState<Font>();
  const meshRef = useRef<Mesh>(null);

  useEffect(loadFont, [meshRef.current, fontName]);
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
      size: geometryProps?.fontSize,
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
        meshProps?.position?.x ?? 0,
        meshProps?.position?.y ?? 0,
        meshProps?.position?.z ?? 0,
      ]}
      rotation={[
        meshProps?.rotation?.x ?? 0,
        meshProps?.rotation?.y ?? 0,
        meshProps?.rotation?.z ?? 0,
      ]}
      castShadow={meshProps?.castShadow ?? false}
      receiveShadow={meshProps?.receiveShadow ?? false}
      {...eventHandlers}
    >
      {children}
    </mesh>
  );
}
