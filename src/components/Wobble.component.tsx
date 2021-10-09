import { useFrame, useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import { Clock, DoubleSide, Vector2 } from 'three';
import vertexShader from '../shaders/wobble_vertex.glsl';
import fragmentShader from '../shaders/wobble_fragment.glsl'
import WobbleShell from './WobbleShell.component';
import WobbleGlow from './WobbleGlow.component';

//https://tympanus.net/codrops/2021/01/26/twisted-colorful-spheres-with-three-js/

export default function Wobble(props: any) {

    const ref = useRef<any>();

    const canvas = document.getElementsByTagName('canvas')[0];
    const uniforms = {
        u_time: { value: 0 },
        u_size: { value: 0.5 },
        u_resolution: {
            value: new Vector2(canvas.width, canvas.height)
        }
    }

    const clock = new Clock(true);


    useFrame(() => {
        if (ref && ref.current && ref.current.material && ref.current.material.uniforms) {
            ref.current.material.uniforms.u_time.value = clock.getElapsedTime();
            ref.current.rotation.z -= 0.005;
            ref.current.rotation.x -= 0.005;
        }
    });


    return (
        <group>
            <WobbleShell/>
            {/* <WobbleGlow scale={[0.6, 0.6, 0.6]}/> */}
        </group>
    )
}