import { useState } from 'react'
import './App.css'

function App() {
  const [size,setSize] = useState(300);

  return (
    <>
      <h1>이미지 변환</h1>
      <div>
        <button onClick={()=>setSize(150)}>작게</button>
        <button onClick={()=>setSize(300)}>중간</button>
        <button onClick={()=>setSize(450)}>크게</button>
     </div> 
      <img src="https://picsum.photos/500" width={size}/>
    </>
  )
}

export default App
