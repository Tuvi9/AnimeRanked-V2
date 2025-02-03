import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Create from './pages/Create';
import Login from './pages/Login'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/create' element={<Create/>}/>
          <Route path='/' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
