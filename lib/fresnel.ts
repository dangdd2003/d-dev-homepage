import * as THREE from 'three'

export interface FresnelOptions {
  rimHex?: number
  facingHex?: number
  sunDirection?: THREE.Vector3
}

export default function getFresnelMat({
  rimHex = 0x0088ff,
  facingHex = 0x000000,
  sunDirection = new THREE.Vector3(1, 0, 0)
}: FresnelOptions = {}): THREE.ShaderMaterial {
  const uniforms = {
    color1: { value: new THREE.Color(rimHex) },
    color2: { value: new THREE.Color(facingHex) },
    sunDirection: { value: sunDirection },
    fresnelBias: { value: 0.05 },
    fresnelScale: { value: 1.2 },
    fresnelPower: { value: 3.5 }
  }
  const vs = `
  uniform float fresnelBias;
  uniform float fresnelScale;
  uniform float fresnelPower;
  
  varying float vReflectionFactor;
  varying vec3 vWorldNormal;
  
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
  
    vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );
    vWorldNormal = worldNormal;
  
    vec3 I = worldPosition.xyz - cameraPosition;
  
    vReflectionFactor = fresnelBias + fresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), fresnelPower );
  
    gl_Position = projectionMatrix * mvPosition;
  }
  `
  const fs = `
  uniform vec3 color1;
  uniform vec3 color2;
  uniform vec3 sunDirection;
  
  varying float vReflectionFactor;
  varying vec3 vWorldNormal;
  
  void main() {
    float f = clamp( vReflectionFactor, 0.0, 1.0 );
    float sunDot = dot(vWorldNormal, sunDirection);
    float sunAtmosphere = clamp(sunDot * 0.6 + 0.4, 0.1, 1.0);
    float finalFactor = f * sunAtmosphere;
    gl_FragColor = vec4(mix(color2, color1, vec3(finalFactor)), finalFactor);
  }
 `
  return new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vs,
    fragmentShader: fs,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  })
}
