import { useFrame, useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import { Clock, DoubleSide, Vector2 } from 'three';
import vertexShader from '../shaders/wobble_vertex.glsl';
import fragmentShader from '../shaders/wobble_fragment.glsl'

//https://tympanus.net/codrops/2021/01/26/twisted-colorful-spheres-with-three-js/

export default function WobbleShell(props: any) {

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
            ref.current.rotation.y -= 0.005;
            ref.current.rotation.x -= 0.005;
        }
    });


    return (
        <mesh
            ref={ref}
        >
            {/* <sphereBufferGeometry args={[3, 128, 128]} attach={"geometry"} onUpdate={
                (self) => self.computeVertexNormals()
            } /> */}
            <icosahedronBufferGeometry
                args={[3, 10]}
                attach="geometry"
                onUpdate={
                    self => {
                        console.log(self);
                        self.computeVertexNormals();
                    }
                }
            />
            <shaderMaterial
                attach={"material"}
                side={DoubleSide}
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                transparent={true}
                lights={false}
            />
        </mesh>
    )
}