/**
 * Hero3D - Interactive 3D Data Universe for Hifza Tahir Portfolio
 * Built with Three.js (r160+ PBR standards, RoomEnvironment, Software-GL detection,
 * multi-part procedural geometry, and responsive camera damping).
 * 
 * SCROLL & INTERACTION FIX:
 * - OrbitControls zoom is disabled (controls.enableZoom = false) so wheel/trackpad
 *   events naturally scroll the webpage up and down without interruption.
 * - Touch action is set to 'pan-y' and single-touch is set to NONE so vertical swipes
 *   on mobile/tablets scroll the webpage normally.
 * - Page scroll is coupled with 3D rotation, creating a fluid parallax depth effect.
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  Sparkles, 
  RotateCw, 
  ChevronDown,
  ArrowRight,
  FileCheck2,
  Info,
  Compass,
  MousePointer2,
  Scroll
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ConceptNode {
  name: string;
  category: string;
  description: string;
  symbol: string;
}

const STATISTICAL_CONCEPTS: ConceptNode[] = [
  {
    name: 'Normal Distribution',
    category: 'Probability Theory',
    description: 'Symmetric bell curve governed by mean (μ) and variance (σ²). Foundation for parametric hypothesis tests.',
    symbol: 'N(μ, σ²)',
  },
  {
    name: 'Hypothesis Testing',
    category: 'Statistical Inference',
    description: 'Evaluating null vs alternative hypotheses through p-values, significance levels (α = 0.05), and critical regions.',
    symbol: 'H₀ vs H₁',
  },
  {
    name: 'Correlation & Regression',
    category: 'Predictive Modeling',
    description: 'Measuring linear association strength (Pearson r) and fitting predictive lines (y = β₀ + β₁x + ε).',
    symbol: 'r & R²',
  },
  {
    name: 'Central Limit Theorem',
    category: 'Sampling Foundations',
    description: 'Sample means approach normality as sample size N increases, irrespective of underlying population shape.',
    symbol: 'x̄ → N',
  },
  {
    name: 'Variance & Dispersion',
    category: 'Descriptive Analytics',
    description: 'Quantifying spread, standard error of the mean (SEM), and interquartile range across cohorts.',
    symbol: 'σ² & IQR',
  },
];

interface Hero3DProps {
  onOpenCV: () => void;
  onExploreWork: () => void;
  onConnect: () => void;
}

export const Hero3D: React.FC<Hero3DProps> = ({ onOpenCV, onExploreWork, onConnect }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedConcept, setSelectedConcept] = useState<ConceptNode | null>(null);
  const [viewPreset, setViewPreset] = useState<'default' | 'constellation' | 'orbital' | 'core'>('default');
  const [isRotating, setIsRotating] = useState(true);
  const [isHudCollapsed, setIsHudCollapsed] = useState(false);
  const [isTouchOrbitEnabled, setIsTouchOrbitEnabled] = useState(false);

  // References to communicate with Three.js loop without re-triggering effects
  const controlsRef = useRef<OrbitControls | null>(null);
  const targetCameraPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.2, 5.2));
  const autoRotateRef = useRef<boolean>(true);
  const interactiveGroupRef = useRef<THREE.Group | null>(null);
  const satMeshListRef = useRef<{ mesh: THREE.Mesh; concept: ConceptNode; basePos: THREE.Vector3; angle: number; radius: number; speed: number; yOffset: number }[]>([]);

  useEffect(() => {
    autoRotateRef.current = isRotating;
  }, [isRotating]);

  const isTouchOrbitEnabledRef = useRef<boolean>(false);

  useEffect(() => {
    isTouchOrbitEnabledRef.current = isTouchOrbitEnabled;
    if (mountRef.current) {
      mountRef.current.style.touchAction = isTouchOrbitEnabled ? 'none' : 'pan-y';
    }
  }, [isTouchOrbitEnabled]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL safely
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    // Initialize Three.js Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0B1020, 0.08);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.2);

    // Modern Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setClearColor(0x0B1020, 0);
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));

    // CRITICAL: Explicitly set touch-action to pan-y on the canvas element
    // so mobile browsers can scroll vertically without OrbitControls intercepting
    renderer.domElement.style.touchAction = 'pan-y';
    container.replaceChildren(renderer.domElement);

    // Studio Environment map
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();
    } catch (e) {
      console.warn('RoomEnvironment fallback', e);
    }

    // OrbitControls with SCROLL-FRIENDLY configuration:
    // 1. enableZoom = false: Prevents wheel events from being intercepted/preventDefaulted!
    //    Users can freely roll their mouse wheel or two-finger swipe on trackpads to scroll the webpage!
    // 2. enablePan = false: Keeps scene anchored
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; // NEVER intercept wheel/trackpad scroll - lets page scroll naturally!
    controls.enablePan = false;
    controls.minDistance = 2.5;
    controls.maxDistance = 8.5;
    controls.maxPolarAngle = Math.PI / 1.75;
    controls.minPolarAngle = Math.PI / 6;
    controlsRef.current = controls;

    // Intelligent Pointer & Scroll Handling:
    // If a user touches on mobile without 3D Orbit active, temporarily disable OrbitControls
    // so the browser can scroll the page up and down vertically without any interruption.
    // Desktop mouse dragging continues to rotate the 3D scene smoothly!
    const onCanvasPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch' && !isTouchOrbitEnabledRef.current) {
        controls.enabled = false;
      } else {
        controls.enabled = true;
      }
    };

    const onCanvasPointerUp = () => {
      controls.enabled = true;
    };

    renderer.domElement.addEventListener('pointerdown', onCanvasPointerDown, { capture: true });
    renderer.domElement.addEventListener('pointerup', onCanvasPointerUp, { capture: true });
    renderer.domElement.addEventListener('pointercancel', onCanvasPointerUp, { capture: true });

    // Lighting Rig (Studio 3-Point)
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.8);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x67E8F9, 0x0B1020, 1.2);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0x4F9CF9, 2.5);
    keyLight.position.set(4, 5, 3);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x67E8F9, 2.0);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    // PROCEDURAL 3D DATA MODEL (Composite 7-Part Group)
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);
    interactiveGroupRef.current = masterGroup;

    // Part 1: Central Crystalline Data Nucleus
    const coreGeo = new THREE.IcosahedronGeometry(0.9, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x4F9CF9,
      emissive: 0x0E2442,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    masterGroup.add(coreMesh);

    // Part 2: Inner Facet Wireframe Cage
    const cageGeo = new THREE.IcosahedronGeometry(1.05, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0x67E8F9,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    masterGroup.add(cageMesh);

    // Part 3: Equator Statistical Orbit Ring (Primary)
    const ring1Geo = new THREE.TorusGeometry(1.5, 0.022, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x4F9CF9,
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0x0C4A6E,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 2.3;
    masterGroup.add(ring1);

    // Part 4: Inclined Variance Coordinate Rail (Secondary)
    const ring2Geo = new THREE.TorusGeometry(1.85, 0.016, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x38BDF8,
      roughness: 0.3,
      metalness: 0.8,
      transparent: true,
      opacity: 0.85,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 3.2;
    ring2.rotation.y = Math.PI / 5;
    masterGroup.add(ring2);

    // Part 5: Outer Geodesic Equatorial Ring with tick markers
    const ring3Geo = new THREE.TorusGeometry(2.2, 0.012, 16, 120);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: 0x94A3B8,
      roughness: 0.4,
      metalness: 0.5,
      transparent: true,
      opacity: 0.6,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 4;
    masterGroup.add(ring3);

    // Part 6: Constellation Lattice Network (Connected Nodes + Glowing Vectors)
    const nodeCount = 38;
    const nodePositions: THREE.Vector3[] = [];
    const nodeGroup = new THREE.Group();
    masterGroup.add(nodeGroup);

    const nodeGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0x67E8F9,
      emissive: 0x38BDF8,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
    });

    for (let i = 0; i < nodeCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.35 + Math.random() * 0.7;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      const pt = new THREE.Vector3(x, y, z);
      nodePositions.push(pt);

      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      mesh.position.copy(pt);
      nodeGroup.add(mesh);
    }

    // Connect close nodes with vector line segments
    const linePoints: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 0.95) {
          linePoints.push(nodePositions[i]);
          linePoints.push(nodePositions[j]);
        }
      }
    }
    const linesGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
    const linesMat = new THREE.LineBasicMaterial({
      color: 0x38BDF8,
      transparent: true,
      opacity: 0.28,
    });
    const linesMesh = new THREE.LineSegments(linesGeo, linesMat);
    nodeGroup.add(linesMesh);

    // Part 7: Interactive Orbiting Concept Satellites (Clickable/Hoverable)
    const satList: { mesh: THREE.Mesh; concept: ConceptNode; basePos: THREE.Vector3; angle: number; radius: number; speed: number; yOffset: number }[] = [];
    STATISTICAL_CONCEPTS.forEach((concept, idx) => {
      const satGeo = new THREE.OctahedronGeometry(0.12, 0);
      const satMat = new THREE.MeshStandardMaterial({
        color: idx % 2 === 0 ? 0x4F9CF9 : 0x67E8F9,
        emissive: 0x0284C7,
        emissiveIntensity: 0.8,
        roughness: 0.2,
        metalness: 0.8,
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      satMesh.userData = { isConceptNode: true, concept };

      const radius = 1.75 + (idx % 3) * 0.35;
      const angle = (idx / STATISTICAL_CONCEPTS.length) * Math.PI * 2;
      const yOffset = ((idx % 3) - 1) * 0.45;

      satMesh.position.set(Math.cos(angle) * radius, yOffset, Math.sin(angle) * radius);
      masterGroup.add(satMesh);

      satList.push({
        mesh: satMesh,
        concept,
        basePos: satMesh.position.clone(),
        angle,
        radius,
        speed: 0.25 + (idx * 0.05),
        yOffset,
      });
    });
    satMeshListRef.current = satList;

    // Floating Data Particles (Ambient Depth)
    const particleCount = isSoftwareGl ? 60 : 180;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 10;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x67E8F9,
      size: 0.035,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Grounding Contact Shadow Plane
    const shadowGeo = new THREE.PlaneGeometry(6, 6);
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(79, 156, 249, 0.25)');
      grad.addColorStop(0.4, 'rgba(11, 16, 32, 0.15)');
      grad.addColorStop(1, 'rgba(11, 16, 32, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(canvas);
    shadowTexture.colorSpace = THREE.SRGBColorSpace;
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.2;
    scene.add(shadowPlane);

    // Raycaster for click interaction with drag-distance check
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let pointerStartX = 0;
    let pointerStartY = 0;
    let pointerStartTime = 0;

    const handlePointerDown = (event: PointerEvent) => {
      pointerStartX = event.clientX;
      pointerStartY = event.clientY;
      pointerStartTime = performance.now();
    };

    const handlePointerUp = (event: PointerEvent) => {
      const dist = Math.hypot(event.clientX - pointerStartX, event.clientY - pointerStartY);
      const duration = performance.now() - pointerStartTime;

      // Only treat as click if pointer moved less than 8px and released under 400ms (not a drag or scroll)
      if (dist < 8 && duration < 400) {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const meshesToTest = satList.map((s) => s.mesh);
        const intersects = raycaster.intersectObjects(meshesToTest);

        if (intersects.length > 0) {
          const hit = intersects[0].object;
          if (hit.userData.concept) {
            setSelectedConcept(hit.userData.concept);
          }
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);
    renderer.domElement.addEventListener('pointerup', handlePointerUp);

    // Track window scroll for fluid 3D parallax without blocking page scrolling
    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop with Clock, Smooth Damping & Scroll Parallax
    const clock = new THREE.Clock();
    let frameId = 0;

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Camera view transition damping
      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCameraPosRef.current.x, 3.5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCameraPosRef.current.y, 3.5, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCameraPosRef.current.z, 3.5, delta);

      // Auto-rotation coupled with scroll parallax!
      // When user scrolls down the page, 3D universe rotates gracefully with the scroll
      const scrollRotation = scrollY * 0.0012;
      if (autoRotateRef.current) {
        masterGroup.rotation.y = elapsed * 0.22 + scrollRotation;
        ring1.rotation.z += delta * 0.15;
        ring2.rotation.z -= delta * 0.18;
        ring3.rotation.y += delta * 0.1;
      } else {
        masterGroup.rotation.y = scrollRotation;
      }

      // Rotate central nucleus gently
      coreMesh.rotation.x = elapsed * 0.2;
      coreMesh.rotation.y = elapsed * 0.3;
      cageMesh.rotation.y = -elapsed * 0.25;

      // Animate orbiting concepts
      satList.forEach((sat) => {
        const currentAngle = sat.angle + elapsed * sat.speed * (autoRotateRef.current ? 1 : 0.3);
        sat.mesh.position.x = Math.cos(currentAngle) * sat.radius;
        sat.mesh.position.z = Math.sin(currentAngle) * sat.radius;
        sat.mesh.position.y = sat.yOffset + Math.sin(elapsed * 1.5 + sat.angle) * 0.15;
        sat.mesh.rotation.x += delta * 1.5;
        sat.mesh.rotation.y += delta * 1.8;
      });

      // Subtle particle drift
      particles.rotation.y = elapsed * 0.02;

      controls.update();
      renderer.render(scene, camera);

      frameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      renderer.domElement.removeEventListener('pointerup', handlePointerUp);
      renderer.domElement.removeEventListener('pointerdown', onCanvasPointerDown, { capture: true } as any);
      renderer.domElement.removeEventListener('pointerup', onCanvasPointerUp, { capture: true } as any);
      renderer.domElement.removeEventListener('pointercancel', onCanvasPointerUp, { capture: true } as any);
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      linesGeo.dispose();
      linesMat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTexture.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  // Handle Preset Switching
  const setCameraPreset = (preset: 'default' | 'constellation' | 'orbital' | 'core') => {
    setViewPreset(preset);
    if (preset === 'default') {
      targetCameraPosRef.current.set(0, 1.2, 5.2);
    } else if (preset === 'orbital') {
      targetCameraPosRef.current.set(3.8, 2.5, 3.2);
    } else if (preset === 'constellation') {
      targetCameraPosRef.current.set(-2.5, 3.0, 3.8);
    } else if (preset === 'core') {
      targetCameraPosRef.current.set(0, 0.4, 2.8);
    }
  };

  return (
    <div id="home" className="relative w-full min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#0B1020]">
      {/* Dynamic Background Gradients */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#4F9CF9]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-[32rem] h-[32rem] bg-[#67E8F9]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#38BDF8]/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      </div>

      {/* 3D WebGL Canvas Isolated Mount with touch-action: pan-y for natural page scrolling */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-1" 
        style={{ touchAction: isTouchOrbitEnabled ? 'none' : 'pan-y' }}
        aria-label="Interactive 3D Data Universe Canvas"
      />

      {/* Foreground Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 pointer-events-none flex flex-col justify-between min-h-[85vh] w-full">
        {/* Top Header Badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 shadow-lg pointer-events-auto backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-medium tracking-wide text-slate-300">
              BS Statistics (CGPA: 3.27) • Open to Analytics Opportunities
            </span>
          </div>

          <button
            onClick={onOpenCV}
            className="pointer-events-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#162036]/90 border border-[#4F9CF9]/40 hover:border-[#67E8F9] text-xs font-semibold text-[#67E8F9] hover:text-white transition-all shadow-sm group cursor-pointer"
          >
            <FileCheck2 className="w-3.5 h-3.5 text-[#4F9CF9] group-hover:scale-110 transition-transform" />
            <span>View Verified CV</span>
          </button>
        </div>

        {/* Central Hero Typography */}
        <div className="max-w-3xl my-auto pt-8 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#4F9CF9]/10 border border-[#4F9CF9]/30 text-[#67E8F9] text-xs font-semibold tracking-wider uppercase mb-4 pointer-events-auto">
            <Sparkles className="w-3.5 h-3.5" />
            Empirical Rigor & Data Storytelling
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            <span className="block text-slate-200">Hifza Tahir</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#4F9CF9] via-[#67E8F9] to-white text-3xl sm:text-5xl lg:text-6xl font-bold mt-1">
              Statistics Graduate | Data Analytics Enthusiast
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mb-8">
            &ldquo;{PERSONAL_INFO.tagline}&rdquo;
          </p>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mb-8 leading-relaxed">
            Applying probability theory, quantitative research, and structured Microsoft Office data modeling to turn raw figures into reliable, actionable business and academic intelligence.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pointer-events-auto">
            <button
              onClick={onExploreWork}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#4F9CF9] hover:bg-[#3B82F6] text-[#0B1020] hover:text-white font-bold text-sm tracking-wide transition-all duration-200 shadow-[0_0_25px_rgba(79,156,249,0.4)] hover:shadow-[0_0_35px_rgba(79,156,249,0.6)] cursor-pointer"
            >
              <span>Explore My Work</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onConnect}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-slate-500 text-white font-semibold text-sm transition-all duration-200 backdrop-blur-md cursor-pointer"
            >
              <span>Let&apos;s Connect</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('skills');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg bg-transparent hover:bg-slate-800/40 text-slate-300 hover:text-white font-medium text-sm transition-all duration-200 cursor-pointer"
            >
              <span>Inspect Skill Matrix</span>
            </button>
          </div>
        </div>

        {/* Live Interaction Hint & Scroll Notice */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-400 border-t border-slate-800/60 pt-4 pointer-events-auto">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-[#67E8F9]">
              <Scroll className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold text-emerald-400">Scroll friendly:</span>
            </div>
            <span>Scroll wheel or swipe down to read page • Drag mouse to rotate 3D • Click nodes for concepts</span>
          </div>

          <div className="mt-2 sm:mt-0 flex items-center gap-4">
            <span className="text-slate-400">Rawalpindi, Pakistan</span>
            <span className="text-slate-600">•</span>
            <a href="mailto:piec2881@gmail.com" className="text-[#4F9CF9] hover:underline">
              piec2881@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Selected Concept Modal Popover (when user clicks an interactive 3D node) */}
      {selectedConcept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm pointer-events-auto">
          <div className="relative w-full max-w-md bg-slate-900 border border-[#4F9CF9]/40 rounded-xl p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#67E8F9] px-2 py-0.5 rounded bg-[#4F9CF9]/10">
                  {selectedConcept.category}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{selectedConcept.name}</h3>
              </div>
              <span className="font-mono text-sm px-2.5 py-1 bg-slate-800 border border-slate-700 rounded text-[#4F9CF9]">
                {selectedConcept.symbol}
              </span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {selectedConcept.description}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <span className="text-xs text-slate-400">Core statistical foundation in BS program</span>
              <button
                onClick={() => setSelectedConcept(null)}
                className="px-4 py-1.5 rounded-lg bg-[#4F9CF9] hover:bg-[#38BDF8] text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sleek Ergonomic Bottom Control Dock */}
      <div 
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-auto transition-transform duration-300"
        style={{
          transform: isHudCollapsed ? 'translate(-50%, calc(100% + 20px))' : 'translate(-50%, 0)',
          maxWidth: 'min(820px, 94vw)',
        }}
      >
        {/* Toggle Collapse Button pinned to top edge */}
        <button
          onClick={() => setIsHudCollapsed(!isHudCollapsed)}
          className="absolute -top-7 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-900/90 border border-slate-700/80 rounded-t-md text-[11px] font-medium text-slate-300 hover:text-white flex items-center gap-1.5 shadow-md cursor-pointer backdrop-blur-md"
          title="Toggle 3D Viewport Controls"
        >
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isHudCollapsed ? 'rotate-180' : ''}`} />
          <span>{isHudCollapsed ? 'Show 3D Dock' : 'Hide Controls'}</span>
        </button>

        {/* Unified Bottom Dock */}
        <div className="bg-slate-900/95 border border-slate-700/80 rounded-xl px-4 py-2.5 shadow-2xl backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* View Preset Buttons */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
              Preset:
            </span>
            <button
              onClick={() => setCameraPreset('default')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                viewPreset === 'default'
                  ? 'bg-[#4F9CF9] text-slate-950 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setCameraPreset('orbital')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                viewPreset === 'orbital'
                  ? 'bg-[#4F9CF9] text-slate-950 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Variance Orbit
            </button>
            <button
              onClick={() => setCameraPreset('constellation')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                viewPreset === 'constellation'
                  ? 'bg-[#4F9CF9] text-slate-950 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Constellation
            </button>
            <button
              onClick={() => setCameraPreset('core')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                viewPreset === 'core'
                  ? 'bg-[#4F9CF9] text-slate-950 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Nucleus
            </button>
          </div>

          {/* Controls: Auto-Rotate, Mobile Touch Mode, and Concepts */}
          <div className="flex items-center gap-2 border-l border-slate-700 pl-3">
            <button
              onClick={() => setIsRotating(!isRotating)}
              className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
                isRotating ? 'bg-slate-800 text-[#67E8F9]' : 'text-slate-400 hover:bg-slate-800'
              }`}
              title="Toggle Auto Rotation"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
              <span className="hidden md:inline">{isRotating ? 'Rotating' : 'Paused'}</span>
            </button>

            {/* Mobile / Touch Drag Mode Switcher */}
            <button
              onClick={() => setIsTouchOrbitEnabled(!isTouchOrbitEnabled)}
              className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer sm:hidden ${
                isTouchOrbitEnabled 
                  ? 'bg-amber-400 text-slate-950 font-bold' 
                  : 'bg-slate-800 text-slate-300'
              }`}
              title="Toggle Single-Touch 3D Orbit vs Page Scroll"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{isTouchOrbitEnabled ? '3D Touch Active' : 'Scroll Mode'}</span>
            </button>

            <button
              onClick={() => setSelectedConcept(STATISTICAL_CONCEPTS[0])}
              className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Inspect Statistical Concepts"
            >
              <Info className="w-3.5 h-3.5 text-[#4F9CF9]" />
              <span className="hidden sm:inline">Concepts</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
