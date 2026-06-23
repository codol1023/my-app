import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Search from './pages/Search'
import DateSelect from './pages/DateSelect'
import FlexibleDate from './pages/FlexibleDate'
import Compare from './pages/Compare'
import DepartureFlight from './pages/DepartureFlight'
import DepartureTrainBus from './pages/DepartureTrainBus'
import ReturnFlight from './pages/ReturnFlight'
import ReturnFlightList from './pages/ReturnFlightList'

function App() {
  return (
    <BrowserRouter>
      <div className="mobile-frame">
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/date-select" element={<DateSelect />} />
          <Route path="/flexible" element={<FlexibleDate />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/departure" element={<DepartureFlight />} />
          <Route path="/departure-train" element={<DepartureTrainBus />} />
          <Route path="/departure-bus" element={<DepartureTrainBus />} />
          <Route path="/return" element={<ReturnFlight />} />
          <Route path="/return-list" element={<ReturnFlightList />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
