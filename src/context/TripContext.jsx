import { createContext, useContext, useState } from 'react'

const TripContext = createContext(null)

const STORAGE_KEY = 'omio_last_origin'

export function TripProvider({ children }) {
  const [origin, setOriginState] = useState(
    () => localStorage.getItem(STORAGE_KEY) || '파리 (CDG)'
  )
  const [destination, setDestination] = useState('')
  const [passengers, setPassengers] = useState(1)

  const setOrigin = (val) => {
    setOriginState(val)
  }

  const saveSearch = () => {
    if (origin) localStorage.setItem(STORAGE_KEY, origin)
  }

  return (
    <TripContext.Provider value={{ origin, setOrigin, destination, setDestination, passengers, setPassengers, saveSearch }}>
      {children}
    </TripContext.Provider>
  )
}

export function useTrip() { return useContext(TripContext) }

export function cityName(str) {
  if (!str) return '?'
  return str.replace(/\s*\([^)]*\)/, '').trim() || str
}
