import { OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { Mesh } from "three";
// import { FontLoader } from 'three/addons/loaders/fo';
//@ts-ignore
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { Font } from "three/examples/jsm/Addons.js";
//@ts-ignore
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

interface Text3DProps {
  text: string;
  bevelEnabled: boolean;
  fontName: string; // helvetiker, optimer, gentilis, droid sans, droid serif
  fontWeight: string; // normal bold
}

export default function Text3D({
  text,
  bevelEnabled,
  fontName,
//   fontWeight,
}: Text3DProps) {
  const config = useMemo(
    () => ({
      depth: 20,
      size: 70,
      hover: 30,
      curveSegments: 4,
      bevelThickness: 2,
      bevelSize: 1.5,
      mirror: true,
    }),
    []
  );

  const [font, setFont] = useState<Font>();
  const meshRef = useRef<Mesh>(null);

  useEffect(() => {
    loadFont();
  }, [meshRef.current, fontName]);

  function loadFont() {
    const loader = new FontLoader();
    loader.load(
      "/JetBrains Mono ExtraLight_Regular.json",
      (response: any) => {
        setFont(response);
        refreshText();
      }
    );
  }

  function refreshText() {
    createText();
  }

  function createText() {
    if (!font || !meshRef.current) return;

    const textGeo = new TextGeometry(text, {
      font: font,

      size: config.size,
      depth: config.depth,
      curveSegments: config.curveSegments,

      bevelThickness: config.bevelThickness,
      bevelSize: config.bevelSize,
      bevelEnabled: bevelEnabled,
    });

    meshRef.current.geometry = textGeo;
  }

  return (
    <>
      <mesh ref={meshRef}>
        <meshStandardMaterial color="#00f" />
      </mesh>
      <OrbitControls />
    </>
  );
}
