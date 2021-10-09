precision highp float;
#define M_PI 3.14159265358979323846;

uniform float u_time;

varying vec3 vNormal;
varying vec2 vUV;
varying float vPerlin;

#pragma glslify: perlin4d = require(glsl-noise/classic/4d)

float u_distortionFactor = 1.0;
float u_distortionDistance = 1.0;
float u_displacementFactor = 1.0;
float u_displacementDistance = 0.4;

void main() {
    vNormal = normal;
    vUV = uv;

    vec3 distortion = position;
    distortion += perlin4d(vec4(normal * u_distortionDistance, u_time)) * u_distortionFactor;

    float perlin = perlin4d(vec4(distortion * u_displacementFactor, u_time));
    vPerlin = perlin;

    vec3 displacement = position;
    displacement += normalize(position) * perlin * u_displacementDistance;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(displacement, 1);
}
