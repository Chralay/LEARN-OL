import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import OpenlayerShow from './components/OpenlayerShow'
import OpenlayerSimple from './components/OpenlayerSimple'

function App() {

  return (
    <div style={{width: '100%', height: '100%'}}>
      {/* <OpenlayerShow /> */}
      <OpenlayerSimple />

      {/* React.StrictMode */}
    </div>
      
  )
}

export default App
