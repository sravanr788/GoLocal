import './App.css'
import Navbar from './components/Navbar'
import Events from './components/Events'
import AddEvent from './components/AddEvent'
import EventDetails from './components/EventDetails'
import { Route, Routes, useLocation } from 'react-router-dom'
import { EventsProvider } from './context/EventsContext'
import { AnimatePresence } from 'framer-motion'
import Home from './components/Home'

function App() {
  const location = useLocation();
  
  return (
    <>
      <EventsProvider>
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Events />} />
            <Route path="/home" element={<Home />} />
            <Route path="/create" element={<AddEvent />} />
            <Route path="/event/:eventId" element={<EventDetails />} />
          </Routes>
        </AnimatePresence>
      </EventsProvider>
    </>
  )
}

export default App
