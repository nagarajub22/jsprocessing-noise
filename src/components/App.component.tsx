import { GizmoHelper, GizmoViewport, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useRef } from "react";

interface Props {
  name:
  string
}

function App(props: Props) {

  const controlRef = useRef<any>();

  return (
    <Canvas
      camera={{ fov: 50, near: 1, far: 100, aspect: window.innerWidth / window.innerHeight, position: [0, 0, 7] }}
    >
      <gridHelper />
      {/* <CGizmoHelper/> */}


      <GizmoHelper
        alignment="top-right" // widget alignment within scene
        onTarget={() => controlRef?.current?.target}
        onUpdate={() => controlRef.current?.update()}
      >
        <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
      </GizmoHelper>
      <OrbitControls ref={controlRef} />

      <mesh position={[0, 0, 0]} >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial />
      </mesh>
    </Canvas>
  )

}

export default App;