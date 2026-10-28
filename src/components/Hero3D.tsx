/**
 * Hero3D - Interactive 3D Data Universe for Hifza Tahir Portfolio
 * 
 * DESIGN & LAYOUT IMPROVEMENTS:
 * 1. Dedicated 2-column layout on desktop: Left column for typography & CTAs (100% readable, zero overlap),
 *    Right column for the interactive 3D statistical universe.
 * 2. Mobile-first responsive hierarchy: stacks neatly with appropriate sizing without horizontal overflow.
 * 3. Proportional 3D scaling: sphere & orbital rings stay neatly inside their framed viewport.
 * 4. Zero scroll hijacking: mouse wheel and touch gestures scroll the page vertically with natural momentum.
 * 5. CV-faithful labeling: removed unverified claims, labeled CV button cleanly as "Curriculum Vitae".
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  Sparkles, 
  RotateCw, 
  ArrowRight, 
  FileCheck2, 
  Info, 
  Compass, 
  Mail, 
  MapPin, 
  Phone,
  BarChart2,
  CheckCircle2
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
  const canvasMountRef = useRef<HTMLDivElement>(null);
  const [selectedConcept, setSelectedConcept] = useState<ConceptNode | null>(null);
  const [viewPreset, setViewPreset] = useState<'default' | 'orbital' | 'constellation' | 'core'>('default');
  const [isRotating, setIsRotating] = useState(true);
  const [isTouchOrbitEnabled, setIsTouchOrbitEnabled] = useState(false);

  // References to communicate with Three.js loop without re-triggering effects
  const controlsRef = useRef<OrbitControls | null>(null);
  const targetCameraPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.8, 4.6));
  const autoRotateRef = useRef<boolean>(true);
  const isTouchOrbitEnabledRef = useRef<boolean>(false);

  useEffect(() => {
    autoRotateRef.current = isRotating;
  }, [isRotating]);

  useEffect(() => {
    isTouchOrbitEnabledRef.current = isTouchOrbitEnabled;
    if (canvasMountRef.current) {
      canvasMountRef.current.style.touchAction = isTouchOrbitEnabled ? 'none' : 'pan-y';
    }
  }, [isTouchOrbitEnabled]);

  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    // Detect prefers-reduced-motion
    const prefersReducedMotion = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsRotating(false);
      autoRotateRef.current = false;
    }

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

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 4.6);

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

    renderer.domElement.style.touchAction = 'pan-y';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.replaceChildren(renderer.domElement);

    // Studio Environment map
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();
    } catch (e) {
      console.warn('RoomEnvironment fallback', e);
    }

    // OrbitControls: Zoom is disabled so mouse wheel scrolls the page normally!
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enableZoom = false; // Never hijack wheel/trackpad scroll
    controls.enablePan = false;
    controls.minDistance = 2.5;
    controls.maxDistance = 7.5;
    controls.maxPolarAngle = Math.PI / 1.75;
    controls.minPolarAngle = Math.PI / 6;
    controlsRef.current = controls;

    // Disengage OrbitControls for single-finger touch unless user toggles touch orbit mode
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

    // Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x0F172A, 1.8);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x67E8F9, 0x0B1020, 1.2);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0x4F9CF9, 2.5);
    keyLight.position.set(4, 5, 3);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x67E8F9, 2.0);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    // PROCEDURAL 3D DATA MODEL (Scaled proportionally to fit right column)
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Part 1: Central Crystalline Data Nucleus
    const coreGeo = new THREE.IcosahedronGeometry(0.78, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x4F9CF9,
      emissive: 0x0E2442,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    masterGroup.add(coreMesh);

    // Part 2: Inner Facet Wireframe Cage
    const cageGeo = new THREE.IcosahedronGeometry(0.92, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0x67E8F9,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    masterGroup.add(cageMesh);

    // Part 3: Equator Statistical Orbit Ring (Primary)
    const ring1Geo = new THREE.TorusGeometry(1.35, 0.02, 16, 90);
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
    const ring2Geo = new THREE.TorusGeometry(1.65, 0.015, 16, 90);
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

    // Part 5: Outer Geodesic Equatorial Ring
    const ring3Geo = new THREE.TorusGeometry(1.95, 0.012, 16, 100);
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
    const nodeCount = isSoftwareGl ? 20 : 32;
    const nodePositions: THREE.Vector3[] = [];
    const nodeGroup = new THREE.Group();
    masterGroup.add(nodeGroup);

    const nodeGeo = new THREE.SphereGeometry(0.04, 10, 10);
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
      const r = 1.15 + Math.random() * 0.6;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      const pt = new THREE.Vector3(x, y, z);
      nodePositions.push(pt);

      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      mesh.position.copy(pt);
      nodeGroup.add(mesh);
    }

    const linePoints: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 0.85) {
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

    // Part 7: Interactive Orbiting Concept Satellites
    const satList: { mesh: THREE.Mesh; concept: ConceptNode; angle: number; radius: number; speed: number; yOffset: number }[] = [];
    STATISTICAL_CONCEPTS.forEach((concept, idx) => {
      const satGeo = new THREE.OctahedronGeometry(0.1, 0);
      const satMat = new THREE.MeshStandardMaterial({
        color: idx % 2 === 0 ? 0x4F9CF9 : 0x67E8F9,
        emissive: 0x0284C7,
        emissiveIntensity: 0.8,
        roughness: 0.2,
        metalness: 0.8,
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      satMesh.userData = { isConceptNode: true, concept };

      const radius = 1.55 + (idx % 3) * 0.3;
      const angle = (idx / STATISTICAL_CONCEPTS.length) * Math.PI * 2;
      const yOffset = ((idx % 3) - 1) * 0.35;

      satMesh.position.set(Math.cos(angle) * radius, yOffset, Math.sin(angle) * radius);
      masterGroup.add(satMesh);

      satList.push({
        mesh: satMesh,
        concept,
        angle,
        radius,
        speed: 0.22 + (idx * 0.04),
        yOffset,
      });
    });

    // Floating Ambient Data Particles
    const particleCount = isSoftwareGl ? 40 : 110;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 6;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x67E8F9,
      size: 0.03,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Grounding Contact Shadow
    const shadowGeo = new THREE.PlaneGeometry(5, 5);
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
    shadowPlane.position.y = -1.9;
    scene.add(shadowPlane);

    // Raycaster for click interaction
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

    // Track scroll for subtle parallax
    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Robust ResizeObserver for precise container sizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    const clock = new THREE.Clock();
    let frameId = 0;

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Camera view transition damping
      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCameraPosRef.current.x, 3.5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCameraPosRef.current.y, 3.5, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCameraPosRef.current.z, 3.5, delta);

      // Auto-rotation coupled with scroll parallax
      const scrollRotation = scrollY * 0.001;
      if (autoRotateRef.current) {
        masterGroup.rotation.y = elapsed * 0.2 + scrollRotation;
        ring1.rotation.z += delta * 0.12;
        ring2.rotation.z -= delta * 0.15;
        ring3.rotation.y += delta * 0.08;
      } else {
        masterGroup.rotation.y = scrollRotation;
      }

      // Rotate nucleus
      coreMesh.rotation.x = elapsed * 0.18;
      coreMesh.rotation.y = elapsed * 0.25;
      cageMesh.rotation.y = -elapsed * 0.2;

      // Animate orbiting concepts
      satList.forEach((sat) => {
        const currentAngle = sat.angle + elapsed * sat.speed * (autoRotateRef.current ? 1 : 0.3);
        sat.mesh.position.x = Math.cos(currentAngle) * sat.radius;
        sat.mesh.position.z = Math.sin(currentAngle) * sat.radius;
        sat.mesh.position.y = sat.yOffset + Math.sin(elapsed * 1.5 + sat.angle) * 0.12;
        sat.mesh.rotation.x += delta * 1.2;
        sat.mesh.rotation.y += delta * 1.5;
      });

      particles.rotation.y = elapsed * 0.015;

      controls.update();
      renderer.render(scene, camera);

      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
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

  const setCameraPreset = (preset: 'default' | 'orbital' | 'constellation' | 'core') => {
    setViewPreset(preset);
    if (preset === 'default') {
      targetCameraPosRef.current.set(0, 0.8, 4.6);
    } else if (preset === 'orbital') {
      targetCameraPosRef.current.set(3.2, 2.0, 3.0);
    } else if (preset === 'constellation') {
      targetCameraPosRef.current.set(-2.2, 2.5, 3.4);
    } else if (preset === 'core') {
      targetCameraPosRef.current.set(0, 0.2, 2.5);
    }
  };

  return (
    <section id="home" className="relative w-full min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#0B1020] pt-24 pb-16 lg:py-28">
      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#4F9CF9]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-[#67E8F9]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 bg-gradient-to-t from-[#0B1020] to-transparent" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* TWO-COLUMN HERO GRID (Desktop: Left Text, Right 3D; Mobile: Stacked) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: HERO CONTENT (Always 100% Readable with crisp contrast) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Top Status & CV Action Pill */}
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-sm backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-medium text-slate-300">
                  BS Statistics (Punjab University) • CGPA 3.27
                </span>
              </div>

              <button
                onClick={onOpenCV}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#162036] hover:bg-[#1E2C4A] border border-[#4F9CF9]/40 hover:border-[#67E8F9] text-xs font-semibold text-[#67E8F9] hover:text-white transition-all shadow-sm cursor-pointer"
              >
                <FileCheck2 className="w-3.5 h-3.5 text-[#4F9CF9]" />
                <span>Curriculum Vitae</span>
              </button>
            </div>

            {/* Empirical Focus Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#4F9CF9]/10 border border-[#4F9CF9]/30 text-[#67E8F9] text-xs font-semibold tracking-wider uppercase mb-3 self-start">
              <Sparkles className="w-3.5 h-3.5" />
              Empirical Rigor & Data Storytelling
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-tight mb-4 break-words">
              <span className="block text-slate-100">Hifza Tahir</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#4F9CF9] via-[#67E8F9] to-white mt-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                Statistics Graduate | Data Analytics Enthusiast
              </span>
            </h1>

            {/* Tagline & Supporting Narrative */}
            <p className="text-sm sm:text-lg text-slate-200 font-medium leading-relaxed mb-4 border-l-2 border-[#4F9CF9] pl-3.5 bg-slate-900/40 py-1.5 rounded-r-lg">
              &ldquo;{PERSONAL_INFO.tagline}&rdquo;
            </p>

            <p className="text-xs sm:text-base text-slate-400 leading-relaxed max-w-xl mb-6 sm:mb-8">
              Applying probability theory, quantitative research, and structured Microsoft Office data modeling to turn raw figures into reliable, actionable business and academic intelligence.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8 w-full sm:w-auto">
              <button
                onClick={onExploreWork}
                className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#4F9CF9] hover:bg-[#3B82F6] text-slate-950 hover:text-white font-bold text-sm tracking-wide transition-all duration-200 shadow-[0_0_25px_rgba(79,156,249,0.35)] cursor-pointer"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onConnect}
                className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-white font-semibold text-sm transition-all duration-200 cursor-pointer backdrop-blur-md"
              >
                <Mail className="w-4 h-4 text-[#67E8F9]" />
                <span>Let&apos;s Connect</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('skills');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-transparent hover:bg-slate-800/50 text-slate-300 hover:text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer"
              >
                <BarChart2 className="w-4 h-4 text-[#4F9CF9]" />
                <span>Skills Matrix</span>
              </button>
            </div>

            {/* Quick Contact & Location Sub-bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-4 border-t border-slate-800/80">
              <span className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-[#4F9CF9]" />
                <span>Rawalpindi, Punjab, Pakistan</span>
              </span>
              <span className="hidden sm:inline text-slate-600">•</span>
              <a href="mailto:piec2881@gmail.com" className="text-[#67E8F9] hover:underline flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <span>piec2881@gmail.com</span>
              </a>
              <span className="hidden sm:inline text-slate-600">•</span>
              <a href="tel:03100057644" className="text-slate-300 hover:text-white font-mono flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>03100057644</span>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: 3D INTERACTIVE STATISTICAL UNIVERSE */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full relative rounded-3xl bg-gradient-to-b from-slate-900/80 to-slate-950/90 border border-slate-800/90 shadow-2xl p-2 sm:p-3 overflow-hidden group">
              {/* Subtle Header Badge on 3D Container */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800/70 mb-1 text-xs">
                <div className="flex items-center gap-2 text-[#67E8F9] font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#4F9CF9] animate-pulse" />
                  <span>3D Statistical Model</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Drag to rotate • Click nodes
                </div>
              </div>

              {/* 3D Canvas Mount Point */}
              <div 
                ref={canvasMountRef}
                className="w-full h-[280px] sm:h-[380px] lg:h-[460px] rounded-2xl cursor-grab active:cursor-grabbing relative overflow-hidden"
                aria-label="Interactive 3D Data Universe Canvas"
              />

              {/* Integrated Control Toolbar under the 3D Object */}
              <div className="mt-2 pt-2 border-t border-slate-800/70 flex flex-wrap items-center justify-between gap-2 px-2 text-xs">
                {/* Presets */}
                <div className="flex items-center gap-1">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mr-1 hidden sm:inline">
                    View:
                  </span>
                  <button
                    onClick={() => setCameraPreset('default')}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                      viewPreset === 'default'
                        ? 'bg-[#4F9CF9] text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Default
                  </button>
                  <button
                    onClick={() => setCameraPreset('orbital')}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                      viewPreset === 'orbital'
                        ? 'bg-[#4F9CF9] text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Orbit
                  </button>
                  <button
                    onClick={() => setCameraPreset('constellation')}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                      viewPreset === 'constellation'
                        ? 'bg-[#4F9CF9] text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Network
                  </button>
                </div>

                {/* Actions: Rotate Toggle & Concept Info */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsRotating(!isRotating)}
                    className={`p-1.5 rounded-md flex items-center gap-1 transition-colors cursor-pointer ${
                      isRotating ? 'text-[#67E8F9]' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Toggle 3D Rotation"
                  >
                    <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
                  </button>

                  {/* Touch Orbit toggle for mobile users */}
                  <button
                    onClick={() => setIsTouchOrbitEnabled(!isTouchOrbitEnabled)}
                    className={`px-2 py-1 rounded text-[10px] font-semibold flex items-center gap-1 transition-colors cursor-pointer sm:hidden ${
                      isTouchOrbitEnabled 
                        ? 'bg-amber-400 text-slate-950' 
                        : 'bg-slate-800 text-slate-400'
                    }`}
                    title="Toggle Touch 3D Orbit vs Page Scroll"
                  >
                    <Compass className="w-3 h-3" />
                    <span>{isTouchOrbitEnabled ? '3D Active' : 'Scroll Mode'}</span>
                  </button>

                  <button
                    onClick={() => setSelectedConcept(STATISTICAL_CONCEPTS[0])}
                    className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Info className="w-3 h-3 text-[#4F9CF9]" />
                    <span>Concepts</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Concept Inspection Modal */}
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
              <span className="text-xs text-slate-400">Statistical coursework foundation</span>
              <button
                onClick={() => setSelectedConcept(null)}
                className="px-4 py-1.5 rounded-lg bg-[#4F9CF9] hover:bg-[#38BDF8] text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
