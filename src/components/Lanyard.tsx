/* eslint-disable react/no-unknown-property */
"use client";

import React, { useEffect, useRef, useState, Suspense, useMemo } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { useGLTF, useTexture, Environment, Lightformer } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  RigidBodyProps,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";

const cardGLB =
  "https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5huRVDzcoDwnbgrKUo1Lzs/53b6dd7d6b4ffcdbd338fa60265949e1/tag.glb";
// Band texture will be generated dynamically

extend({ MeshLineGeometry, MeshLineMaterial });

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}

export default function Lanyard({
  position = [0, 0, 16.5],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState<boolean>(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="relative z-0 w-full h-full flex justify-center items-center transform scale-100 origin-center">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) =>
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
        }
      >
        <ambientLight intensity={Math.PI} />
        <Suspense fallback={null}>
          <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
            <Band isMobile={isMobile} />
          </Physics>
        </Suspense>
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

// ─── Card texture ─────────────────────────────────────────────────────────────
// Generates a square texture atlas (1024x1024).
// Front maps to the entire left half [0, 512] x [0, 1024].
// Back maps to the entire right half [512, 1024] x [0, 1024].
function useCardTexture() {
  const profileTex = useTexture("/profile.jpg");

  return useMemo(() => {
    const W = 1024;
    const H = 1024;

    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;

    // Background color for front (left half) and back (right half)
    ctx.fillStyle = "#f3f4f6";
    ctx.fillRect(0, 0, 512, 1024); // Front
    ctx.fillRect(512, 0, 512, 1024); // Back

    const qW = 512;
    const qH = 1024;
    const photoH = 614; // Cover top 60% of the card height

    // ── FRONT DESIGN (left half of texture) ───────────────────────────────────
    if (profileTex.image) {
      const img = profileTex.image as HTMLImageElement;
      const imgW = img.naturalWidth  || img.width  || 1;
      const imgH = img.naturalHeight || img.height || 1;
      const imgAspect  = imgW / imgH;
      const areaAspect = qW / photoH;

      let dW: number, dH: number, dX: number, dY: number;
      if (imgAspect > areaAspect) {
        dH = photoH; dW = dH * imgAspect;
        dX = (qW - dW) / 2; dY = 0;
      } else {
        dW = qW; dH = dW / imgAspect;
        dX = 0; dY = (photoH - dH) / 2;
      }

      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, qW, photoH);
      ctx.clip();
      ctx.drawImage(img, dX, dY, dW, dH);
      ctx.restore();
    }

    const padX = 36;

    // Name (Christian John Comendador)
    ctx.fillStyle = "#111827"; // Slate-900
    ctx.font = "bold 44px Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("Christian John", padX, photoH + 80);
    ctx.fillText("Comendador",     padX, photoH + 140);

    // Subtitle
    ctx.fillStyle = "#6b7280"; // Gray-500
    ctx.font = "28px Arial, sans-serif";
    ctx.fillText("Portfolio · 2026", padX, photoH + 200);

    // Bottom row
    const botY = qH - 48;
    ctx.fillStyle = "#9ca3af";
    ctx.font = "20px Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("Computer Engineering", padX, botY);
    ctx.textAlign = "right";
    ctx.fillText("ID 00110", qW - padX, botY);

    // ── BACK DESIGN (right half of texture) ───────────────────────────────────
    const cx = 512 + 256;
    const cy = 512;

    // Draw decorative dark gray badge
    ctx.beginPath();
    ctx.arc(cx, cy - 60, 48, 0, 2 * Math.PI);
    ctx.fillStyle = "#111827"; // Slate-900
    ctx.fill();

    // Details text on back
    ctx.fillStyle = "#1f2937";
    ctx.font = "bold 36px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("@comendador", cx, cy + 60);

    ctx.fillStyle = "#9ca3af";
    ctx.font = "24px Arial, sans-serif";
    ctx.fillText("christiancomendador.com", cx, cy + 120);

    // Create texture with flipY = false to match GLB UV mapping
    const tex = new THREE.CanvasTexture(canvas);
    tex.flipY = false;
    tex.needsUpdate = true;
    return tex;
  }, [profileTex]);
}

function useBandTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d")!;
    
    // Black background
    ctx.fillStyle = "#111827";
    ctx.fillRect(0, 0, 1024, 1024);
    
    // Draw atom logo
    ctx.translate(512, 512);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 32;
    
    ctx.beginPath();
    ctx.ellipse(0, 0, 300, 100, 0, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.ellipse(0, 0, 300, 100, Math.PI / 3, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.ellipse(0, 0, 300, 100, -Math.PI / 3, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(0, 0, 50, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.resetTransform();

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.flipY = false;
    tex.needsUpdate = true;
    return tex;
  }, []);
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }: BandProps) {
  const band  = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1    = useRef<any>(null);
  const j2    = useRef<any>(null);
  const j3    = useRef<any>(null);
  const card  = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps: any = {
    type: "dynamic" as RigidBodyProps["type"],
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  const { nodes, materials } = useGLTF(cardGLB) as any;
  const bandTex = useBandTexture();
  const cardTex = useCardTexture();

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );
  const [dragged, drag]  = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1,    j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2,    j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => { document.body.style.cursor = "auto"; };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && typeof dragged !== "boolean") {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((r) => r.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }
    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const d = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + d * (maxSpeed - minSpeed)));
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = "chordal";
  bandTex.wrapS = bandTex.wrapT = THREE.RepeatWrapping;

  const lineGeometry = useMemo(() => new MeshLineGeometry(), []);
  const lineMaterial = useMemo(
    () =>
      new MeshLineMaterial({
        color: new THREE.Color("white"),
        depthTest: false,
        resolution: new THREE.Vector2(1000, isMobile ? 2000 : 1000),
        useMap: 1,
        map: bandTex,
        repeat: new THREE.Vector2(-4, 1),
        lineWidth: 1,
      } as any),
    [bandTex, isMobile]
  );

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type={"fixed" as RigidBodyProps["type"]} />

        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps} type={"dynamic" as RigidBodyProps["type"]}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps} type={"dynamic" as RigidBodyProps["type"]}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps} type={"dynamic" as RigidBodyProps["type"]}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={
            dragged
              ? ("kinematicPosition" as RigidBodyProps["type"])
              : ("dynamic"          as RigidBodyProps["type"])
          }
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e: any) => {
              e.target.setPointerCapture(e.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation()))
              );
            }}
          >
            {/* Custom quadrant card texture mapping */}
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardTex}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>

            {/* Metal clip + clamp hardware */}
            <mesh geometry={nodes.clip.geometry}  material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>

      {/* Lanyard strap */}
      <mesh ref={band}>
        <primitive object={lineGeometry} attach="geometry" />
        <primitive object={lineMaterial} attach="material" />
      </mesh>
    </>
  );
}
