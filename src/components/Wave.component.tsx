import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Clock, DoubleSide, Vector2 } from 'three';

function Wave(props: any) {
    const ref: any = useRef<any>();
    const clock = new Clock(true);

    const n = 500;
    const points = [];

    const mapValueToGrid = (value: number, min1: number, max1: number, min2: number, max2: number) => {
        return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }

    for (let i = 0; i < n; i++) {
        const x = mapValueToGrid(Math.random(), 0.0, 1.0, -5.0, 5.0);
        const y = mapValueToGrid(Math.random(), 0.0, 1.0, 0.0, 1.0);
        const z = mapValueToGrid(Math.random(), 0.0, 1.0, -5.0, 5.0);

        points.push(x, y, z);
    }
    const positions = new Float32Array(points);

    const canvas = document.getElementsByTagName('canvas')[0];
    const uniforms = {
        u_time: { value: 0 },
        u_resolution: {
            value: new Vector2(canvas.width, canvas.height)
        }
    }

    useFrame(() => {
        if (ref && ref.current && ref.current.material && ref.current.material.uniforms) {
            ref.current.material.uniforms.u_time.value = clock.getElapsedTime();
        }
    });

    const vertexShader = `
        precision highp float;
        #define GLSLIFY 1;
        
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform vec2 u_resolution;
        uniform float u_time;

        attribute vec3 position;

        float random (in float x) {
            return fract(sin(x)*1e4);
        }

        float map(float value, float min1, float max1, float min2, float max2) {
            return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        }

        void main(){
            vec3 pos = position.xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = 50.0;
        }
    `;
    const fragmentShader = `
        precision highp float;
        #define GLSLIFY 1;

        void main () {
            gl_FragColor = vec4(vec3(1.0), 1.0);
        }
    `;

    return (
        <points
            ref={ref}
        >
            <bufferGeometry
                attach="geometry"
                onUpdate={(self) => self.computeVertexNormals()}
            >

                <bufferAttribute
                    attachObject={["attributes", "position"]}
                    array={positions}
                    itemSize={3}
                    count={positions.length / 3}
                />

            </bufferGeometry>

            <rawShaderMaterial
                attach="material"
                transparent={true}
                side={DoubleSide}
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
            />
        </points>
    )
}

export default Wave;