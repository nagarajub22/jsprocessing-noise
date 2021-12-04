import { Canvas } from "@react-three/fiber";
import React from "react";
import CGizmoHelper from '../helpers/GizmoHelper.component';
import Wave from './Wave.component';
import Wobble from './Wobble.component';

interface Props {
  name:
  string
}

function App(props: Props) {
  return (
    <Canvas
      camera={{ fov: 100, near: 1, far: 1000, aspect: window.innerWidth / window.innerHeight, position: [0, 2, 6] }}
    >
      <color attach={"background"} args={["orange"]} />
      {/* <gridHelper /> */}
      <ambientLight intensity={0.1}/>
      <CGizmoHelper/>
      <Wobble/>
    </Canvas>
  )

}

export default App;