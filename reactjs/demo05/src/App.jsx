import { useState } from 'react'
import './App.css'

function App() {
  const [amount, setAmount] = useState(0);
  return (
    <>
      <h1>이체 금액 입력</h1>

        <input value={amount} readOnly/>

      <div class="cell">
            <button onClick={()=>setAmount(amount+10000000)}>천만</button>
            <button onClick={()=>setAmount(amount+1000000)}>백만</button>
            <button onClick={()=>setAmount(amount+100000)}>십만</button>
            <button onClick={()=>setAmount(amount+10000)}>만</button>
            <button onClick={()=>setAmount(amount+1000)}>천</button>
            <button onClick={()=>setAmount(amount+100)}>백</button>
            <button onClick={()=>setAmount(amount+10)}>십</button>
            <button onClick={()=>setAmount(amount+1)}>일</button>
            <button onClick={()=>setAmount(parseInt(amount/10))}>지우기</button>
            <button onClick={()=>setAmount(0)}>전체지우기</button>
        </div>
    </>
  )
}

export default App
