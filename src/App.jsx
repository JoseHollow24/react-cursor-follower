import { useState } from "react"
import { useEffect } from "react"

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0})

  //ponter move
  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY} = event
      console.log('handleMove', { clientX, clientY })
      setPosition({ x: clientX, y: clientY })

    }
    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    } 

    //component cleanUp
    //when componen did unmount or before reestart useEfect
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  },[enabled])
  
  //changeBodyClassname
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)
  
    return () => {
      document.body.classList.remove('no-cursor',)
    }
  }, [enabled])
  
  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: '#09f',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -15,
        top: -15,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px, ${position.y}px)`
        }}>
      </div>
      <button onClick={() => setEnabled(!enabled)}>{enabled ? 'Desactivar' : 'Activar'} seguir puntero</button>
    </ >
  )
}

function App() {
  return (
    < FollowMouse />
  )
}

export default App
