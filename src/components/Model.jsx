import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ path, ...props }) {
  const { scene } = useGLTF(path)
  
  // Clone the scene so we can reuse the same model if needed
  // and traverse to cast/receive shadows
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
    }
  })

  return <primitive object={scene} {...props} />
}

// Preload models for performance
useGLTF.preload('/island.glb')
useGLTF.preload('/bulbasaur.glb')
useGLTF.preload('/pikachu.glb')
useGLTF.preload('/jigglypuff.glb')
useGLTF.preload('/ponyta.glb')
useGLTF.preload('/magicarp.glb')
useGLTF.preload('/poliwag.glb')
