import { createContext, useContext, useState } from 'react'

const TripContext = createContext(null)

export function TripProvider({ children }) {
  const [origin, setOrigin] = useState('파리 (CDG)')
  const [destination, setDestination] = useState('')
  return (
    <TripContext.Provider value={{ origin, setOrigin, destination, setDestination }}>
      {children}
    </TripContext.Provider>
  )
}

export function useTrip() { return useContext(TripContext) }

// 도시명만 추출 (예: "파리 (CDG)" → "파리")
export function cityName(str) {
  if (!str) return '?'
  return str.replace(/\s*\([^)]*\)/, '').trim() || str
}
