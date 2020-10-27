import dynamic from 'next/dynamic'
import { OrbitControls } from '@react-three/drei'
import LDom from '@/components/dom/_layout'
import { Suspense } from 'react'
// import Bird from "../components/Bird";

const Bird = dynamic(() => import('../components/canvas/Bird'), { ssr: false })

const Birds = () => {
  return new Array(5).fill().map((_, i) => {
    const x = (7.5 + Math.random() * 15) * (Math.round(Math.random()) ? -1 : 1)
    const y = -10 + Math.random() * 20
    const z = -2.5 + Math.random() * 5
    const bird = ['stork', 'parrot', 'flamingo'][Math.round(Math.random() * 2)]
    let speed = bird === 'stork' ? 0.5 : bird === 'flamingo' ? 2 : 5
    let factor =
      bird === 'stork' ? 0.5 + Math.random() : bird === 'flamingo' ? 0.25 + Math.random() : 1 + Math.random() - 0.5

    return (
      <Bird
        key={i}
        position={[x, y, z]}
        rotation={[0, x > 0 ? Math.PI : 0, 0]}
        speed={speed}
        factor={factor}
        url={`/glb/${bird}.glb`}
      />
    )
  })
}

const BirdsCanvas = () => {
  return (
    <group position={[0, 0, -25]}>
      <ambientLight intensity={2} />
      <pointLight position={[40, 40, 40]} />
      <OrbitControls />
      <Suspense fallback={null}>
        <Birds />
      </Suspense>
    </group>
  )
}

const BoxesDom = () => {
  return <h1>BIRDS DOM</h1>
}

const BirdsPage = () => {
  return (
    <>
      <LDom>
        <BoxesDom />
      </LDom>
      <BirdsCanvas />
    </>
  )
}

export default BirdsPage