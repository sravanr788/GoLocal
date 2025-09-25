import './App.css'
import Navbar from './components/Navbar'
import Events from './components/Events'
import AddEvent from './components/AddEvent'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/create" element={<AddEvent />} />
      </Routes>
    </>
  )
}

export default App
