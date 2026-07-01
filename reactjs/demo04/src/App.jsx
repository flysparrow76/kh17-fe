import { useState } from 'react'
import './App.css'

function App() {
  const [size,setSize] = useState(300);

  return (
    <>
      <h1>이미지 변환</h1>
        <button onClick={()=>setSize(150)}>작게</button>
        <button onClick={()=>setSize(300)}>중간</button>
        <button onClick={()=>setSize(450)}>크게</button>

        <div>현재 크기 : {size}px
        <button onClick={()=>setSize(size+10)}>+</button>
        <button onClick={()=>setSize(size-10)}>-</button>
        </div>
      <img src="https://picsum.photos/300"
      className='target' width={size} height={size}/>
    </>
  )
}

export default App
