import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { AdditiveBlending, Clock, DoubleSide, Vector2 } from 'three';

function Main(props: any) {
    const ref: any = useRef<any>();
    const clock = new Clock(true);
    
    const n = 1000;
    const points = [];
    const pointsColor = [];
    const number = [];

    for (let i = 0; i < n; i++) {
        const x = 0;
        const y = 0;
        const z = 0;

        points.push(x, y, z);

        pointsColor.push(Math.random(), Math.random(), Math.random());
    }

    for (let i = 0; i < n; i++) {
        number.push(i);
    }


    const positions = new Float32Array(points);
    const colors = new Float32Array(pointsColor);
    const numbers = new Float32Array(number);

    const vertexShader = `

        precision highp float;
        #define GLSLIFY 1;
        
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform vec2 u_resolution;
        uniform float u_time;

        attribute vec3 position;
        attribute vec3 color;
        attribute float number;

        varying vec3 vColor;

        float PI = 3.14159265359;

        float random (vec2 st) {
            return fract(sin(dot(st.xy,
                                 vec2(12.9898,78.233)))*
                43758.5453123);
        }

        float map(float value, float min1, float max1, float min2, float max2) {
            return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        }

        void main(){

            vColor = color;
            
            vec3 pos = position.xyz;

            float a = 100.0;
            float b = 80.0;

            // pos.x = (a + b * cos(number + u_time)) * cos(number * PI / 180.0 + u_time);
            // pos.z = (a + b * cos(number + u_time)) * sin(number * PI / 180.0 + u_time);
            // pos.y = b * sin(number + u_time);

            pos.x = map(u_time, -100., 100., -5., 5.);
            pos.y = cos(number);

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = 10.0;

        }
    `;
    const fragmentShader = `

        precision highp float;
        #define GLSLIFY 1;
        
        varying vec3 vColor;

        void main () {
            float f = length(gl_PointCoord - vec2(0.5, 0.5));
            if (f > 0.1) discard;
            
            gl_FragColor = vec4(vColor, 1.0);
        }
    `;

    const canvas = document.getElementsByTagName('canvas')[0];

    const uniforms = {
        u_time: { value: 0},
        u_resolution: {
            value: new Vector2(canvas.width, canvas.height)
        }
    }

    useFrame(() => {
        if(ref && ref.current && ref.current.material && ref.current.material.uniforms) {
            ref.current.material.uniforms.u_time.value = clock.getElapsedTime();
        }
    });

    return (
        <points
            ref={ref}
            rotation={props.rotation}
            scale={[0.1, 0.1, 0.1]}
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
                <bufferAttribute 
                    attachObject={["attributes", "color"]}
                    array={colors}
                    itemSize={3}
                    count={positions.length / 3}
                />
                <bufferAttribute 
                    attachObject={["attributes", "number"]}
                    array={numbers}
                    itemSize={1}
                    count={numbers.length / 1}
                />
            </bufferGeometry>
            <rawShaderMaterial
                transparent={true}
                side={DoubleSide}
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                blending={AdditiveBlending}
            />
        </points>
    );
}

export default Main;
