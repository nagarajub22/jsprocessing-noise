import { useRef } from 'react';
import { AdditiveBlending, Color, DoubleSide } from 'three';

//https://tympanus.net/codrops/2021/01/26/twisted-colorful-spheres-with-three-js/

export default function WobbleGlow(props: any) {

    const ref = useRef<any>();

    return (
        <mesh
            ref={ref}
            {...props}
        >
            <icosahedronBufferGeometry
                args={[3, 56]}
                attach="geometry"
                onUpdate={
                    self => {
                        self.computeVertexNormals();
                    }
                }
            />
            <meshPhongMaterial
                attach={"material"}
                side={DoubleSide}
                transparent={true}
                emissive={new Color("#2cb7b1")}
                emissiveIntensity={1.0}
                blending={AdditiveBlending}
            />
        </mesh>
    )
}