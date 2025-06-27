"use client";

import React, { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { useThemeStore } from "@/store/useThemeStore";

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  size: number;
}

/**
 *
 * @param particleCount 파티클 개수
 * @param particleSizeRange 파티클 크기 범위
 * @param particleSpeed 파티클 속도
 * @param areaSize 파티클 영역 크기
 */
interface ParticleBackgroundProps {
  particleCount?: number;
  particleSizeRange?: [number, number];
  particleSpeed?: number;
  areaSize?: number;
}

export default function ParticleBackground({ particleCount = 50, particleSizeRange = [0.2, 0.5], particleSpeed = 0.01, areaSize = 10 }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const particleSystemRef = useRef<THREE.Points | null>(null);
  const geometryRef = useRef<THREE.BufferGeometry | null>(null);
  const { theme } = useThemeStore();

  const particleColors = useMemo(() => {
    return theme === "dark" ? { r: 0.32, g: 0.42, b: 0.93, rVar: 0.1, gVar: 0.1, bVar: 0.07 } : { r: 0.2, g: 0.3, b: 0.4, rVar: 0.1, gVar: 0.1, bVar: 0.1 };
  }, [theme]);

  const createParticles = (): Particle[] =>
    Array.from({ length: particleCount }, () => ({
      position: new THREE.Vector3((Math.random() - 0.5) * areaSize, (Math.random() - 0.5) * areaSize, (Math.random() - 0.5) * areaSize),
      velocity: new THREE.Vector3((Math.random() - 0.5) * particleSpeed, (Math.random() - 0.5) * particleSpeed, (Math.random() - 0.5) * particleSpeed),
      size: Math.random() * (particleSizeRange[1] - particleSizeRange[0]) + particleSizeRange[0],
    }));

  const createMaterial = () =>
    new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2(0, 0) },
        colorR: { value: particleColors.r },
        colorG: { value: particleColors.g },
        colorB: { value: particleColors.b },
        colorRVar: { value: particleColors.rVar },
        colorGVar: { value: particleColors.gVar },
        colorBVar: { value: particleColors.bVar },
      },
      vertexShader: `
      attribute float size;
      uniform float time;
      uniform vec2 mouse;
      uniform float colorR, colorG, colorB;
      uniform float colorRVar, colorGVar, colorBVar;
      varying vec3 vColor;
      
      void main() {
        vec3 pos = position;
        
        float dist = distance(pos.xy, mouse * 5.0);
        float influence = smoothstep(3.0, 0.0, dist);
        pos += vec3(0.0, 0.0, influence * 1.0);
        
        pos.x += sin(time * 0.5 + position.y) * 0.2;
        pos.y += cos(time * 0.3 + position.x) * 0.2;
        
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = size * (500.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
        
        vColor = vec3(
          colorR + colorRVar * sin(time + position.x),
          colorG + colorGVar * sin(time + position.y),
          colorB + colorBVar * sin(time + position.z)
        );
      }
    `,
      fragmentShader: `
      varying vec3 vColor;
      
      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        
        float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
        gl_FragColor = vec4(vColor, alpha * 0.8);
      }
    `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

  const initThree = (canvas: HTMLCanvasElement) => {
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    // 부모 컨테이너의 크기를 가져옴
    const container = canvas.parentElement;
    const containerWidth = container?.clientWidth || window.innerWidth;
    const containerHeight = container?.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);

    renderer.setSize(containerWidth, containerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    sceneRef.current = scene;
    rendererRef.current = renderer;

    return { scene, renderer, camera };
  };

  const createParticleSystem = (particles: Particle[]) => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    particles.forEach((p, i) => {
      positions[i * 3] = p.position.x;
      positions[i * 3 + 1] = p.position.y;
      positions[i * 3 + 2] = p.position.z;
      sizes[i] = p.size;
    });

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geometryRef.current = geometry;

    const material = createMaterial();
    materialRef.current = material;

    const system = new THREE.Points(geometry, material);
    particleSystemRef.current = system;
    sceneRef.current?.add(system);
  };

  const updateParticles = (particles: Particle[], geometry: THREE.BufferGeometry) => {
    const posArray = geometry.attributes.position.array as Float32Array;
    const sizeArray = geometry.attributes.size.array as Float32Array;

    particles.forEach((p, i) => {
      p.position.add(p.velocity);

      if (Math.abs(p.position.x) > 5) p.velocity.x *= -1;
      if (Math.abs(p.position.y) > 5) p.velocity.y *= -1;
      if (Math.abs(p.position.z) > 5) p.velocity.z *= -1;

      posArray[i * 3] = p.position.x;
      posArray[i * 3 + 1] = p.position.y;
      posArray[i * 3 + 2] = p.position.z;

      sizeArray[i] = p.size;
    });

    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.size.needsUpdate = true;
  };

  const setupListeners = (camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) => {
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onResize = () => {
      const container = canvasRef.current?.parentElement;
      const containerWidth = container?.clientWidth || window.innerWidth;
      const containerHeight = container?.clientHeight || window.innerHeight;

      camera.aspect = containerWidth / containerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerWidth, containerHeight);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    };
  };

  const handleThemeChange = () => {
    if (!sceneRef.current || !geometryRef.current) return;

    if (materialRef.current) materialRef.current.dispose();
    if (particleSystemRef.current) {
      sceneRef.current.remove(particleSystemRef.current);
      particleSystemRef.current.geometry.dispose();
    }

    const newGeometry = geometryRef.current.clone();
    newGeometry.setAttribute("position", geometryRef.current.attributes.position.clone());
    newGeometry.setAttribute("size", geometryRef.current.attributes.size.clone());

    const newMaterial = createMaterial();
    const newSystem = new THREE.Points(newGeometry, newMaterial);

    materialRef.current = newMaterial;
    particleSystemRef.current = newSystem;
    geometryRef.current = newGeometry;
    sceneRef.current.add(newSystem);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const { renderer, camera } = initThree(canvasRef.current);
    const particles = createParticles();
    particlesRef.current = particles;
    createParticleSystem(particles);
    const removeListeners = setupListeners(camera, renderer);

    let time = 0;
    let lastTheme = theme;

    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      if (theme !== lastTheme) {
        handleThemeChange();
        lastTheme = theme;
      }

      // 최신 geometry, material 사용
      const currentSystem = particleSystemRef.current;
      const currentMaterial = materialRef.current;
      const currentGeometry = geometryRef.current;

      if (currentMaterial) {
        currentMaterial.uniforms.time.value = time;
        currentMaterial.uniforms.mouse.value.set(mouseRef.current.x, mouseRef.current.y);
      }

      if (currentSystem && currentGeometry) {
        updateParticles(particlesRef.current, currentGeometry);
        rendererRef.current?.render(sceneRef.current!, camera);
      }
    };

    animate();

    return () => {
      removeListeners();
      materialRef.current?.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" style={{ background: "transparent" }} />;
}
