import { useState, useRef, useEffect } from 'react'
import Icon from './Icon'

const CITIES = [
  { name: '파리', code: 'CDG', country: '프랑스', icon: 'flight' },
  { name: '바르셀로나', code: 'BCN', country: '스페인', icon: 'flight' },
  { name: '마드리드', code: 'MAD', country: '스페인', icon: 'flight' },
  { name: '런던', code: 'LHR', country: '영국', icon: 'flight' },
  { name: '암스테르담', code: 'AMS', country: '네덜란드', icon: 'flight' },
  { name: '로마', code: 'FCO', country: '이탈리아', icon: 'flight' },
  { name: '베를린', code: 'BER', country: '독일', icon: 'flight' },
  { name: '뮌헨', code: 'MUC', country: '독일', icon: 'flight' },
  { name: '프랑크푸르트', code: 'FRA', country: '독일', icon: 'flight' },
  { name: '취리히', code: 'ZRH', country: '스위스', icon: 'flight' },
  { name: '비엔나', code: 'VIE', country: '오스트리아', icon: 'flight' },
  { name: '브뤼셀', code: 'BRU', country: '벨기에', icon: 'flight' },
  { name: '리스본', code: 'LIS', country: '포르투갈', icon: 'flight' },
  { name: '프라하', code: 'PRG', country: '체코', icon: 'flight' },
  { name: '부다페스트', code: 'BUD', country: '헝가리', icon: 'flight' },
  { name: '아테네', code: 'ATH', country: '그리스', icon: 'flight' },
  { name: '두바이', code: 'DXB', country: 'UAE', icon: 'flight' },
  { name: '서울', code: 'ICN', country: '한국', icon: 'flight' },
  { name: '도쿄', code: 'NRT', country: '일본', icon: 'flight' },
  { name: '싱가포르', code: 'SIN', country: '싱가포르', icon: 'flight' },
]

export default function CityDropdown({ value, onChange, placeholder, iconName, iconColor }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState(value ?? '')
  const ref = useRef(null)

  useEffect(() => { setQuery(value ?? '') }, [value])

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const filtered = query.length > 0
    ? CITIES.filter(c =>
        c.name.includes(query) ||
        c.code.toLowerCase().includes(query.toLowerCase()) ||
        c.country.includes(query)
      )
    : CITIES.slice(0, 8)

  const select = (city) => {
    const label = `${city.name} (${city.code})`
    setQuery(label)
    onChange(label)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative flex-1">
      <div className="flex items-center gap-[8px] h-full">
        <Icon name={iconName} size={24} color={iconColor} />
        <input
          value={query}
          onChange={e => { setQuery(e.target.value); onChange(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="bg-transparent text-[14px] font-semibold outline-none flex-1 min-w-0 placeholder-[#6f7584]"
          style={{ color: query ? '#132968' : undefined }}
        />
        {query && (
          <button onClick={() => { setQuery(''); onChange(''); setOpen(true) }} className="cursor-pointer">
            <Icon name="close" size={18} color="#9ca3af" />
          </button>
        )}
      </div>

      {open && filtered.length > 0 && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.18)] z-50 overflow-hidden max-h-[320px] overflow-y-auto"
          style={{ width: '340px' }}>
          <div className="px-[12px] pt-[12px] pb-[4px]">
            <span className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wider">
              {query ? '검색 결과' : '인기 도시'}
            </span>
          </div>
          {filtered.map((city) => (
            <button key={city.code} onClick={() => select(city)}
              className="cursor-pointer w-full flex items-center gap-[12px] px-[12px] py-[10px] hover:bg-[#f8f9fa] transition-colors">
              <div className="size-[36px] rounded-full bg-[#f1f2f6] flex items-center justify-center flex-shrink-0">
                <Icon name="flight_takeoff" size={18} color="#132968" />
              </div>
              <div className="flex flex-col items-start flex-1 min-w-0">
                <span className="text-[14px] font-semibold text-[#132968] truncate w-full text-left">
                  {city.name} <span className="text-[#6b7281] font-normal text-[12px]">({city.code})</span>
                </span>
                <span className="text-[12px] text-[#9ca3af]">{city.country}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
