import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Create from './pages/Create';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/create' element={<Create/>}/>
          <Route path='/' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
