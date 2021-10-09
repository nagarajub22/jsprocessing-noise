precision highp float;

uniform vec2 u_resolution;
uniform float u_time;

varying vec3 vNormal;
varying float vPerlin;
varying vec2 vUV;

void main() {

    vec3 color = vec3(0.57);
    gl_FragColor = vec4(color  * vPerlin, 1.0);
}