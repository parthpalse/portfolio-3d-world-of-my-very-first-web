import React, { Suspense, useState, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Sky } from '@react-three/drei'
import Model from './components/Model'

const pokemonInfo = {
  Pikachu: (
    <>
      <div style={{ fontStyle: 'italic', color: '#888', marginBottom: '1rem', fontSize: '0.85rem' }}>
        Pokédex Entry — Pikachu — Main character energy
      </div>
      <h3 style={{ margin: '0 0 0.5rem 0', color: '#ff5722' }}>Parth Palse</h3>
      <p style={{ margin: '0.2rem 0', fontWeight: 'bold' }}>B.Tech Electronics &amp; Computer Engineering (EXCP)</p>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>K. J. Somaiya College of Engineering</p>
      <p style={{ margin: '0.5rem 0 0.2rem', fontSize: '0.9rem' }}>Batch of 2028</p>
      <p style={{ margin: '0.2rem 0', fontStyle: 'italic', fontSize: '0.9rem' }}>Honours in Quantum Computing &amp; Generative AI</p>
    </>
  ),
  Ponyta: (
    <>
      <div style={{ fontStyle: 'italic', color: '#888', marginBottom: '1rem', fontSize: '0.85rem' }}>
        Pokédex Entry — Ponyta — Skills in motion
      </div>
      <h3 style={{ margin: '0 0 0.5rem 0', color: '#ff5722' }}>Skills</h3>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>C, Python, Java, JavaScript</p>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>HTML, CSS, PHP, SQL</p>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>React.js, Node.js, Express.js</p>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>Flask, Three.js, Bootstrap</p>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>MongoDB, MySQL</p>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>Git, Netlify, Render</p>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>WebGL, REST APIs, ML Integration</p>
    </>
  ),
  Bulbasaur: (
    <>
      <div style={{ fontStyle: 'italic', color: '#888', marginBottom: '1rem', fontSize: '0.85rem' }}>
        Pokédex Entry — Bulbasaur — Growing through projects
      </div>
      <h3 style={{ margin: '0 0 0.5rem 0', color: '#ff5722' }}>Projects</h3>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}><strong>AlgoVerse</strong> — Algorithm Visualizer</p>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}><strong>ClgBuddy</strong> — Smart Commute Assistant</p>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}><strong>Car Dealership Management System</strong></p>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}><strong>Smart Irrigation System</strong> (Arduino)</p>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}><strong>WBAN Research Work</strong></p>
    </>
  ),
  Magicarp: (
    <>
      <div style={{ fontStyle: 'italic', color: '#888', marginBottom: '1rem', fontSize: '0.85rem' }}>
        Pokédex Entry — Magikarp — Work in progress
      </div>
      <h3 style={{ margin: '0 0 0.5rem 0', color: '#ff5722' }}>Currently Learning</h3>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>Data Structures &amp; Algorithms</p>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>Advanced Web Development</p>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>Machine Learning</p>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>Improving problem solving</p>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>Building better real-world systems</p>
    </>
  ),
  Jigglypuff: (
    <>
      <div style={{ fontStyle: 'italic', color: '#888', marginBottom: '1rem', fontSize: '0.85rem' }}>
        Pokédex Entry — Jigglypuff — Work that speaks
      </div>
      <h3 style={{ margin: '0 0 0.5rem 0', color: '#ff5722' }}>Experience &amp; Achievements</h3>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>Web Developer Intern — GPROBO</p>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>Web Development Intern — KJSCE</p>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>Python for Data Science Certification</p>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>JPMorgan Software Engineering Simulation</p>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>Research Paper on 6G (WBAN)</p>
    </>
  ),
  Poliwag: (
    <>
      <div style={{ fontStyle: 'italic', color: '#888', marginBottom: '1rem', fontSize: '0.85rem' }}>
        Pokédex Entry — Poliwag — Stay connected
      </div>
      <h3 style={{ margin: '0 0 0.5rem 0', color: '#ff5722' }}>Contact</h3>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}><strong>Phone:</strong> +91 9867152408</p>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}><strong>Email:</strong> <a href="mailto:parth.palse@somaiya.edu" style={{ color: '#ff5722', textDecoration: 'none' }}>parth.palse@somaiya.edu</a></p>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}><strong>GitHub:</strong> <a href="https://github.com/parthpalse" target="_blank" rel="noreferrer" style={{ color: '#ff5722', textDecoration: 'none' }}>github.com/parthpalse</a></p>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/parthpalse" target="_blank" rel="noreferrer" style={{ color: '#ff5722', textDecoration: 'none' }}>linkedin.com/in/parthpalse</a></p>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}><strong>Portfolio:</strong> <a href="https://porthfoliorita.netlify.app" target="_blank" rel="noreferrer" style={{ color: '#ff5722', textDecoration: 'none' }}>porthfoliorita.netlify.app</a></p>
    </>
  )
};

const pokemonPositions = {
  Bulbasaur: new THREE.Vector3(-2.5, 1.2, 13),
  Pikachu: new THREE.Vector3(-10.8, 2.1, 5.7),
  Jigglypuff: new THREE.Vector3(-7, 3, -7),
  Ponyta: new THREE.Vector3(13, 1.5, -9),
  Magicarp: new THREE.Vector3(0, 0.78, 9),
  Poliwag: new THREE.Vector3(5, 1.8, 9)
};

function CameraRig({ activePokemon, isMobile }) {
  const { camera, controls } = useThree()

  useFrame(() => {
    if (!controls) return;

    // Smooth interpolation step
    const step = 0.05

    if (activePokemon) {
      const target = pokemonPositions[activePokemon]

      // Move target smoothly
      controls.target.lerp(target, step)

      // To prevent wobble with autoRotate, we adjust the distance and height dynamically
      // instead of hardcoding an absolute position
      const offset = new THREE.Vector3().subVectors(camera.position, controls.target)

      // Smoothly zoom in to a distance of 10 (further out for mobile)
      const targetDist = isMobile ? 15 : 10
      offset.setLength(THREE.MathUtils.lerp(offset.length(), targetDist, step))
      // Smoothly bring the camera down closer to eye level
      const targetHeight = isMobile ? 6 : 4
      offset.y = THREE.MathUtils.lerp(offset.y, targetHeight, step)

      camera.position.copy(controls.target).add(offset)
    } else {
      const defaultTarget = new THREE.Vector3(0, 0, 0)
      controls.target.lerp(defaultTarget, step)

      const offset = new THREE.Vector3().subVectors(camera.position, controls.target)

      // Smoothly zoom back out to a distance of 20 (further out for mobile)
      const targetDist = isMobile ? 35 : 20
      offset.setLength(THREE.MathUtils.lerp(offset.length(), targetDist, step))
      // Bring camera back up to sky view
      const targetHeight = isMobile ? 15 : 10
      offset.y = THREE.MathUtils.lerp(offset.y, targetHeight, step)

      camera.position.copy(controls.target).add(offset)
    }
  })

  return null
}

export default function App() {
  const [activePokemon, setActivePokemon] = useState(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <Canvas camera={{ position: isMobile ? [0, 8, 35] : [0, 5, 20], fov: 50 }}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />

        {/* Background / Environment */}
        <Sky sunPosition={[100, 20, 100]} turbidity={0.1} rayleigh={0.5} />
        <Environment preset="city" />

        {/* 3D Models */}
        <Suspense fallback={null}>
          <Model path="/island.glb" position={[0, -2, 0]} scale={12} rotation={[0, Math.PI / 2, 0]} />

          {/* Pokemon around the island */}
          <Model path="/bulbasaur.glb" position={[-3, 1, 8]} scale={2} rotation={[0, Math.PI * 1.5, 0]} onClick={(e) => { e.stopPropagation(); setActivePokemon('Bulbasaur') }} />
          <Model path="/pikachu.glb" position={[-10.8, 2.1, 5.7]} scale={1} rotation={[0, Math.PI * 1.5, 0]} onClick={(e) => { e.stopPropagation(); setActivePokemon('Pikachu') }} />
          <Model path="/jigglypuff.glb" position={[-7, 3, -7]} scale={1} rotation={[0, Math.PI, 0]} onClick={(e) => { e.stopPropagation(); setActivePokemon('Jigglypuff') }} />
          <Model path="/ponyta.glb" position={[13, 1.5, -9]} scale={0.009} rotation={[0, Math.PI, 0]} onClick={(e) => { e.stopPropagation(); setActivePokemon('Ponyta') }} />
          <Model path="/magicarp.glb" position={[0, 0.78, 9]} scale={0.003} onClick={(e) => { e.stopPropagation(); setActivePokemon('Magicarp') }} />
          <Model path="/poliwag.glb" position={[5, 1.8, 9]} scale={0.1} rotation={[0, Math.PI * 1.5, 0]} onClick={(e) => { e.stopPropagation(); setActivePokemon('Poliwag') }} />

          {/* Ground Shadows */}
          <ContactShadows resolution={1024} scale={30} blur={2} opacity={0.6} far={10} color="#000000" position={[0, -2, 0]} />
        </Suspense>

        {/* Camera Controls */}
        <OrbitControls makeDefault autoRotate autoRotateSpeed={2.0} maxPolarAngle={Math.PI / 2 + 0.1} />
        <CameraRig activePokemon={activePokemon} isMobile={isMobile} />
      </Canvas>

      {/* Intro Overlay */}
      {!activePokemon && (
        <div className="intro-card">
          <h1>Welcome!</h1>
          <p style={{ color: '#555', marginBottom: '1rem', lineHeight: '1.4', marginTop: 0 }}>
            This is Parth Palse's website — a simple way to show my introduction in a creative format.
          </p>
          <ul>
            <li>✨ Wait for the Pokémon to appear, or <strong>click them</strong> to explore.</li>
            <li>🖱️ <strong>Left-click + drag</strong> to rotate the camera.</li>
            <li>🤚 <strong>Right-click + drag</strong> to move around the world.</li>
            <li>🔍 <strong>Scroll</strong> to zoom in and out.</li>
          </ul>
        </div>
      )}

      {/* UI Overlay Card */}
      {activePokemon && (
        <div className="pokemon-card-container">
          <div className="pokemon-card">
            <div style={{ color: '#555', lineHeight: 1.5, margin: '1rem 0' }}>{pokemonInfo[activePokemon]}</div>
            <button onClick={() => setActivePokemon(null)}>Close</button>
          </div>
        </div>
      )}
    </>
  )
}
