precision highp float;

uniform vec2 u_resolution;
uniform float u_time;

varying vec3 vNormal;
varying float vPerlin;
varying vec2 vUV;

float ambientIntensity = 0.2;
vec3 ambientColor = vec3(0.12);

void main() {
    vec3 color = ambientColor * ambientIntensity;
    gl_FragColor = vec4(color, 1.0);
}