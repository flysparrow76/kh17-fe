import { useState } from 'react'
import './App.css'

function App() {
  const [role, setRole] = useState("primary");
  return (

    <div className="container my-5">
      {/* 점보트론 */}
      <div className='row'>
        <div className='col'>
          <div className='p-4 bg-dark text-light rounded'>
            <h1>색상 변경 예제</h1>
            <p>버튼을 눌러 색상을 변경하도록 처리합니다.</p>
          </div>
        </div>
      </div>

      {/* 실제화면 */}
      <div className='row mt-4'>
        <div className='col'>
          <button type='button' className='btn btn-primary'
            onClick={()=>setRole("primary")}>primary</button>
          <button type='button' className='btn btn-secondary'
            onClick={()=>setRole("secondary")}>secondary</button>
          <button type='button' className='btn btn-success'
            onClick={()=>setRole("success")}>success</button>
          <button type='button' className='btn btn-info'
            onClick={()=>setRole("info")}>info</button>
          <button type='button' className='btn btn-warning'
            onClick={()=>setRole("warning")}>warning</button>
          <button type='button' className='btn btn-danger'
            onClick={()=>setRole("danger")}>danger</button>
        </div>
      </div>

      <div className='row mt-4'>
        <div className='col text-center'>
          <h2 className={`text-${role}`}>Hello ReactJS!</h2>
        </div>
      </div>
    </div>

  )
}

export default App
