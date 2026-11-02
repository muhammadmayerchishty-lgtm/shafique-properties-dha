import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Hero3DHouseProps {
  className?: string;
}

export const Hero3DHouse: React.FC<Hero3DHouseProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const motionListener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', motionListener);

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }

    return () => {
      mediaQuery.removeEventListener('change', motionListener);
    };
  }, []);

  useEffect(() => {
    if (!hasWebGL || prefersReducedMotion || !mountRef.current) return;

    const container = mountRef.current;
    let width = container.clientWidth || 300;
    let height = container.clientHeight || 260;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 5.0);
    camera.lookAt(0, 0.2, 0);

    // 2. Renderer with DPR cap 1.75
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.4);
    dirLight.position.set(4, 8, 5);
    scene.add(dirLight);

    const blueRimLight = new THREE.DirectionalLight(0x0096c7, 1.8);
    blueRimLight.position.set(-5, 3, -3);
    scene.add(blueRimLight);

    const greenFillLight = new THREE.DirectionalLight(0x7ac143, 1.4);
    greenFillLight.position.set(5, -2, 2);
    scene.add(greenFillLight);

    // 4. Stylised House Composite Group (in logo colors)
    const houseGroup = new THREE.Group();
    scene.add(houseGroup);

    // Materials
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.25,
      metalness: 0.05,
    });

    const blueRoofMaterial = new THREE.MeshStandardMaterial({
      color: 0x0096c7, // Brand Primary Blue
      roughness: 0.3,
      metalness: 0.15,
    });

    const greenRoofMaterial = new THREE.MeshStandardMaterial({
      color: 0x7ac143, // Brand Secondary Green
      roughness: 0.3,
      metalness: 0.15,
    });

    const chimneyMaterial = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.4,
    });

    const glowingWindowMaterial = new THREE.MeshStandardMaterial({
      color: 0xffeb12, // Brand Yellow highlight
      emissive: 0xffeb12,
      emissiveIntensity: 0.85,
      roughness: 0.1,
    });

    const doorMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f1720, // Brand Navy Charcoal
      roughness: 0.5,
    });

    // House Base / Walls (Box)
    const wallsGeo = new THREE.BoxGeometry(1.8, 1.2, 1.5);
    const wallsMesh = new THREE.Mesh(wallsGeo, wallMaterial);
    wallsMesh.position.y = 0.6;
    houseGroup.add(wallsMesh);

    // Left Roof Slope (Blue) - rotated angled box
    const leftRoofGeo = new THREE.BoxGeometry(1.3, 0.12, 1.7);
    const leftRoofMesh = new THREE.Mesh(leftRoofGeo, blueRoofMaterial);
    leftRoofMesh.position.set(-0.52, 1.52, 0);
    leftRoofMesh.rotation.z = Math.PI / 5.2;
    houseGroup.add(leftRoofMesh);

    // Right Roof Slope (Green) - rotated angled box
    const rightRoofGeo = new THREE.BoxGeometry(1.3, 0.12, 1.7);
    const rightRoofMesh = new THREE.Mesh(rightRoofGeo, greenRoofMaterial);
    rightRoofMesh.position.set(0.52, 1.52, 0);
    rightRoofMesh.rotation.z = -Math.PI / 5.2;
    houseGroup.add(rightRoofMesh);

    // Chimney (Small box on left roof)
    const chimneyGeo = new THREE.BoxGeometry(0.24, 0.6, 0.28);
    const chimneyMesh = new THREE.Mesh(chimneyGeo, chimneyMaterial);
    chimneyMesh.position.set(-0.6, 1.85, 0.2);
    houseGroup.add(chimneyMesh);

    // Front Door (Navy charcoal)
    const doorGeo = new THREE.BoxGeometry(0.36, 0.65, 0.05);
    const doorMesh = new THREE.Mesh(doorGeo, doorMaterial);
    doorMesh.position.set(0, 0.325, 0.77);
    houseGroup.add(doorMesh);

    // 4 Glowing Window Panes in 2x2 grid
    const paneGeo = new THREE.BoxGeometry(0.18, 0.18, 0.04);
    const paneCoords = [
      [-0.45, 0.7, 0.77],
      [-0.22, 0.7, 0.77],
      [0.22, 0.7, 0.77],
      [0.45, 0.7, 0.77],
    ];
    paneCoords.forEach(([px, py, pz]) => {
      const pane = new THREE.Mesh(paneGeo, glowingWindowMaterial);
      pane.position.set(px, py, pz);
      houseGroup.add(pane);
    });

    // Side windows (Glowing)
    const sidePaneGeo = new THREE.BoxGeometry(0.04, 0.3, 0.45);
    const sideWindow1 = new THREE.Mesh(sidePaneGeo, glowingWindowMaterial);
    sideWindow1.position.set(-0.92, 0.65, 0);
    houseGroup.add(sideWindow1);

    const sideWindow2 = new THREE.Mesh(sidePaneGeo, glowingWindowMaterial);
    sideWindow2.position.set(0.92, 0.65, 0);
    houseGroup.add(sideWindow2);

    // 5. Soft Ground Shadow Plane
    const shadowGeo = new THREE.CircleGeometry(1.6, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = 0.01;
    scene.add(shadowPlane);

    // Position house group slightly elevated
    houseGroup.position.y = 0.05;

    // 6. Mouse Parallax & Loop Logic
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let isVisible = true;
    let animId = 0;
    const clock = new THREE.Clock();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = nx;
      mouseY = ny;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // IntersectionObserver to pause when hidden
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting && document.visibilityState === 'visible';
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleVisibility = () => {
      isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 300;
      height = container.clientHeight || 260;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    };
    window.addEventListener('resize', handleResize);

    // Animation Tick
    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      if (!isVisible) return;

      const delta = clock.getDelta();

      // Slow continuous rotation around Y
      houseGroup.rotation.y += delta * 0.45;

      // Gentle mouse parallax damping
      targetRotX = mouseY * 0.18;
      targetRotY = mouseX * 0.25;
      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetRotY * 1.5, 4, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, 1.8 + targetRotX * 0.8, 4, delta);
      camera.lookAt(0, 0.7, 0);

      renderer.render(scene, camera);
    };

    renderLoop();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      observer.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose resources
      wallsGeo.dispose();
      leftRoofGeo.dispose();
      rightRoofGeo.dispose();
      chimneyGeo.dispose();
      doorGeo.dispose();
      paneGeo.dispose();
      sidePaneGeo.dispose();
      shadowGeo.dispose();

      wallMaterial.dispose();
      blueRoofMaterial.dispose();
      greenRoofMaterial.dispose();
      chimneyMaterial.dispose();
      glowingWindowMaterial.dispose();
      doorMaterial.dispose();
      shadowMat.dispose();

      renderer.dispose();
    };
  }, [hasWebGL, prefersReducedMotion]);

  // Fallback SVG if WebGL is unavailable or reduced motion is enabled
  if (!hasWebGL || prefersReducedMotion) {
    return (
      <div 
        className={`flex items-center justify-center p-4 select-none ${className}`}
        aria-label="Shafique Properties 3D House Emblem"
      >
        <svg 
          viewBox="0 0 200 180" 
          className="w-44 h-40 drop-shadow-2xl" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Soft Shadow */}
          <ellipse cx="100" cy="165" rx="70" ry="12" fill="#000000" opacity="0.3" />

          {/* White Walls */}
          <rect x="50" y="80" width="100" height="75" rx="3" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />

          {/* Door */}
          <rect x="88" y="115" width="24" height="40" rx="2" fill="#0F1720" />

          {/* Chimney */}
          <rect x="58" y="38" width="16" height="35" rx="2" fill="#CBD5E1" />

          {/* Blue Left Roof */}
          <polygon points="100,32 40,82 48,90 100,45" fill="#0096C7" />

          {/* Green Right Roof */}
          <polygon points="100,32 160,82 152,90 100,45" fill="#7AC143" />

          {/* Glowing Windows */}
          <rect x="62" y="90" width="14" height="14" rx="2" fill="#FFEB12" />
          <rect x="124" y="90" width="14" height="14" rx="2" fill="#FFEB12" />
        </svg>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-[240px] sm:h-[260px] flex items-center justify-center overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};

export default Hero3DHouse;
