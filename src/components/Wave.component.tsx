import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Clock, DoubleSide, Vector2 } from 'three';

function Wave(props: any) {
    const ref: any = useRef<any>();
    const clock = new Clock(true);

    const count = 1000;

    const positions = new Float32Array(count * 3);
    const positionIndices = new Float32Array(count);

    for (let i = 0; i < count; i++) {
        const x = 0;
        const y = 0;
        const z = 0;

        positions.set([x, y, z], 3);
        positionIndices.set([i], i);
    }

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
        attribute float number;

        float random (in float x) {
            return fract(sin(x)*1e4);
        }

        float map(float value, float min1, float max1, float min2, float max2) {
            return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        }

        float PI = 3.1415926535897932384626433832795;
        float a = 15.0;
        float radius = 12.0;

        void main(){
            vec3 pos = position.xyz;

            // pos.x = a + b * sin(number * 45. + u_time);
            // pos.z = a + b * sin(number * 45. + u_time);
            // pos.y = sin(number);

            float speedScale = 0.0001;
            float speed = u_time * speedScale;

            pos.x = radius * sin(number * 270. + speed);
            pos.z = radius * cos(number * 270. + speed);
            pos.y = a + radius * sin(number * speed);

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = 5.0;
        }
    `;
    const fragmentShader = `
        precision highp float;
        #define GLSLIFY 1;
        void main () {

            float leng = length(gl_PointCoord - vec2(0.5));
            if(leng > 0.2) discard;

            gl_FragColor = vec4(1.,1.,1., 1.0);
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
                    count={count}
                />

                <bufferAttribute
                    attachObject={["attributes", "number"]}
                    array={positionIndices}
                    itemSize={1}
                    count={count}
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