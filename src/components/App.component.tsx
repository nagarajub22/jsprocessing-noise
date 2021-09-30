import { Canvas } from "@react-three/fiber";
import React, { useRef } from "react";
import CGizmoHelper from '../helpers/GizmoHelper.component';
import Main from './Main.component';

interface Props {
  name:
  string
}

function App(props: Props) {
  return (
    <Canvas
      camera={{ fov: 50, near: 1, far: 100, aspect: window.innerWidth / window.innerHeight, position: [0, 0, 7] }}
    >
      <color attach="background" args={["#000000"]}/>
      <gridHelper />
      <CGizmoHelper/>
      <Main/>
    </Canvas>
  )

}

export default App;