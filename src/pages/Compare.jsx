import { useTrip, cityName } from '../context/TripContext'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import StatusBar from '../components/StatusBar'
import Icon from '../components/Icon'

// 2026년 6월 전체 요일 매핑
const DAY_NAMES = ['일','월','화','수','목','금','토']
function dayOf(date) { return DAY_NAMES[new Date(2026, 5, date).getDay()] }

const TRANSPORT_BY_DATE = {
  1:  { flight: { price: 128000, count: '10편', duration: '1h 50m' }, train: { price: 155000, count: '6편', duration: '6h 25m' }, bus: { price: 68000, count: '4편', duration: '14h 50m' } },
  2:  { flight: { price: 175000, count: '7편',  duration: '1h 50m' }, train: { price: 208000, count: '4편', duration: '6h 25m' }, bus: { price: 95000, count: '3편', duration: '14h 50m' } },
  3:  { flight: { price: 130000, count: '9편',  duration: '1h 50m' }, train: { price: 158000, count: '6편', duration: '6h 25m' }, bus: { price: 70000, count: '4편', duration: '14h 50m' } },
  4:  { flight: { price: 122000, count: '10편', duration: '1h 50m' }, train: { price: 148000, count: '7편', duration: '6h 25m' }, bus: { price: 65000, count: '5편', duration: '14h 50m' } },
  5:  { flight: { price: 119000, count: '10편', duration: '1h 50m' }, train: { price: 145000, count: '7편', duration: '6h 25m' }, bus: { price: 62000, count: '5편', duration: '14h 50m' } },
  6:  { flight: { price: 95000,  count: '11편', duration: '1h 50m' }, train: { price: 118000, count: '8편', duration: '6h 25m' }, bus: { price: 50000, count: '6편', duration: '14h 50m' } },
  7:  { flight: { price: 97000,  count: '11편', duration: '1h 50m' }, train: { price: 120000, count: '8편', duration: '6h 25m' }, bus: { price: 52000, count: '5편', duration: '14h 50m' } },
  8:  { flight: { price: 160000, count: '8편',  duration: '1h 50m' }, train: { price: 188000, count: '5편', duration: '6h 25m' }, bus: { price: 85000, count: '3편', duration: '14h 50m' } },
  9:  { flight: { price: 115000, count: '10편', duration: '1h 50m' }, train: { price: 140000, count: '7편', duration: '6h 25m' }, bus: { price: 62000, count: '5편', duration: '14h 50m' } },
  10: { flight: { price: 99000,  count: '11편', duration: '1h 50m' }, train: { price: 122000, count: '8편', duration: '6h 25m' }, bus: { price: 53000, count: '5편', duration: '14h 50m' } },
  11: { flight: { price: 92000,  count: '12편', duration: '1h 50m' }, train: { price: 112000, count: '9편', duration: '6h 25m' }, bus: { price: 48000, count: '6편', duration: '14h 50m' } },
  12: { flight: { price: 91000,  count: '12편', duration: '1h 50m' }, train: { price: 110000, count: '9편', duration: '6h 25m' }, bus: { price: 47000, count: '6편', duration: '14h 50m' } },
  13: { flight: { price: 110000, count: '9편',  duration: '1h 50m' }, train: { price: 138000, count: '6편', duration: '6h 25m' }, bus: { price: 58000, count: '4편', duration: '14h 50m' } },
  14: { flight: { price: 118000, count: '10편', duration: '1h 50m' }, train: { price: 145000, count: '7편', duration: '6h 25m' }, bus: { price: 62000, count: '4편', duration: '14h 50m' } },
  15: { flight: { price: 79000,  count: '12편', duration: '1h 50m' }, train: { price: 103000, count: '8편', duration: '6h 25m' }, bus: { price: 45000, count: '6편', duration: '14h 50m' } },
  16: { flight: { price: 98000,  count: '11편', duration: '1h 50m' }, train: { price: 120000, count: '8편', duration: '6h 25m' }, bus: { price: 52000, count: '5편', duration: '14h 50m' } },
  17: { flight: { price: 94000,  count: '11편', duration: '1h 50m' }, train: { price: 115000, count: '8편', duration: '6h 25m' }, bus: { price: 48000, count: '5편', duration: '14h 50m' } },
  18: { flight: { price: 89000,  count: '12편', duration: '1h 50m' }, train: { price: 108000, count: '9편', duration: '6h 25m' }, bus: { price: 43000, count: '6편', duration: '14h 50m' } },
  19: { flight: { price: 107000, count: '10편', duration: '1h 50m' }, train: { price: 130000, count: '7편', duration: '6h 25m' }, bus: { price: 55000, count: '5편', duration: '14h 50m' } },
  20: { flight: { price: 155000, count: '8편',  duration: '1h 50m' }, train: { price: 182000, count: '5편', duration: '6h 25m' }, bus: { price: 88000, count: '3편', duration: '14h 50m' } },
  21: { flight: { price: 172000, count: '7편',  duration: '1h 50m' }, train: { price: 198000, count: '5편', duration: '6h 25m' }, bus: { price: 95000, count: '3편', duration: '14h 50m' } },
  22: { flight: { price: 128000, count: '10편', duration: '1h 50m' }, train: { price: 152000, count: '6편', duration: '6h 25m' }, bus: { price: 68000, count: '4편', duration: '14h 50m' } },
  23: { flight: { price: 112000, count: '11편', duration: '1h 50m' }, train: { price: 138000, count: '7편', duration: '6h 25m' }, bus: { price: 59000, count: '5편', duration: '14h 50m' } },
  24: { flight: { price: 109000, count: '11편', duration: '1h 50m' }, train: { price: 134000, count: '7편', duration: '6h 25m' }, bus: { price: 57000, count: '5편', duration: '14h 50m' } },
  25: { flight: { price: 162000, count: '7편',  duration: '1h 50m' }, train: { price: 192000, count: '4편', duration: '6h 25m' }, bus: { price: 88000, count: '3편', duration: '14h 50m' } },
  26: { flight: { price: 169000, count: '7편',  duration: '1h 50m' }, train: { price: 200000, count: '4편', duration: '6h 25m' }, bus: { price: 92000, count: '3편', duration: '14h 50m' } },
  27: { flight: { price: 145000, count: '9편',  duration: '1h 50m' }, train: { price: 172000, count: '5편', duration: '6h 25m' }, bus: { price: 78000, count: '4편', duration: '14h 50m' } },
  28: { flight: { price: 138000, count: '9편',  duration: '1h 50m' }, train: { price: 164000, count: '6편', duration: '6h 25m' }, bus: { price: 73000, count: '4편', duration: '14h 50m' } },
  29: { flight: { price: 115000, count: '10편', duration: '1h 50m' }, train: { price: 140000, count: '7편', duration: '6h 25m' }, bus: { price: 60000, count: '5편', duration: '14h 50m' } },
  30: { flight: { price: 108000, count: '10편', duration: '1h 50m' }, train: { price: 132000, count: '7편', duration: '6h 25m' }, bus: { price: 56000, count: '5편', duration: '14h 50m' } },
}

// 가격 기반 하이라이트
function getHighlight(price) {
  if (price <= 100) return 'cheap'
  if (price >= 145) return 'expensive'
  return null
}

// 6월 1-30 전체 날짜 동적 생성
const JUNE_PRICES = {
  1:128,2:175,3:130,4:122,5:119,6:95,7:97,8:160,9:115,10:99,11:92,12:91,
  13:110,14:118,15:79,16:98,17:94,18:89,19:107,20:155,21:172,22:128,23:112,
  24:109,25:162,26:169,27:145,28:138,29:115,30:108,
}
const DATES = Array.from({ length: 30 }, (_, i) => {
  const date = i + 1
  const price = JUNE_PRICES[date]
  return { day: dayOf(date), date, price, highlight: getHighlight(price) }
})

function getBadge(key, data) {
  const prices = { flight: data.flight.price, train: data.train.price, bus: data.bus.price }
  const min = Math.min(...Object.values(prices))
  if (prices[key] === min) return { text: '가장 저렴', color: 'bg-[#eff6ff] text-[#006eb5]' }
  if (key === 'flight') return { text: '가장 빠름', color: 'bg-[#e6f5e8] text-[#008026]' }
  return null
}

export default function Compare() {
  const navigate = useNavigate()
  const { origin, destination, passengers } = useTrip()
  const orig = cityName(origin) || "파리"
  const dest = cityName(destination) || "목적지"
  const [searchParams] = useSearchParams()
  const initDate = parseInt(searchParams.get('date') ?? '15', 10)
  const [selectedDate, setSelectedDate] = useState(
    (initDate >= 1 && initDate <= 30) ? initDate : 15
  )
  const [selectedTransport, setSelectedTransport] = useState(null)
  const dateScrollRef = useRef(null)

  useEffect(() => {
    if (!dateScrollRef.current) return
    const idx = DATES.findIndex(d => d.date === selectedDate)
    if (idx < 0) return
    const chipW = 56 // 48px chip + 8px gap
    const containerW = dateScrollRef.current.clientWidth
    const target = idx * chipW - containerW / 2 + 24
    dateScrollRef.current.scrollLeft = Math.max(0, target)
  }, [selectedDate])

  const data = TRANSPORT_BY_DATE[selectedDate]
  const TRANSPORTS = [
    { id: 'flight', name: '항공', route: '/departure',       ...data.flight },
    { id: 'train',  name: '기차', route: '/departure-train', ...data.train  },
    { id: 'bus',    name: '버스', route: '/departure-bus',   ...data.bus    },
  ]

  const handleTransportClick = (t) => {
    setSelectedTransport(t.id)
    const count = parseInt(t.count)
    navigate(`${t.route}?date=${selectedDate}&count=${count}&minprice=${t.price}`)
  }

  return (
    <div className="flex flex-col bg-white" style={{ height: '100%' }}>
      <StatusBar />

      {/* 고정 헤더 */}
      <div className="flex-shrink-0 pt-[53px]">
        <div className="bg-[#132968] h-[60px] flex items-center justify-between px-[16px]">
          <button onClick={() => navigate(-1)} className="size-[48px] flex items-center justify-center">
            <Icon name="arrow_back_ios_new" size={24} color="white" />
          </button>
          <p className="text-white text-[16px] font-semibold">교통편 비교</p>
          <div className="flex items-center">
            <div className="border border-white rounded-[4px] h-[24px] px-[8px] flex items-center">
              <span className="text-white text-[12px] font-semibold">수정</span>
            </div>
            <button className="size-[48px] flex items-center justify-center">
              <Icon name="ios_share" size={24} color="white" />
            </button>
          </div>
        </div>
      </div>

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto px-[16px] py-[16px] flex flex-col gap-[24px]">
        <div className="bg-[#f1f2f6] border border-[#d5d5d5] h-[50px] rounded-[8px] flex items-center justify-between px-[16px]">
          <div>
            <div className="flex items-center gap-[4px]">
              <span className="text-[#132968] text-[16px] font-semibold">{orig}</span>
              <Icon name="arrow_forward" size={20} color="#132968" />
              <span className="text-[#132968] text-[16px] font-semibold">{dest} · 왕복</span>
            </div>
            <p className="text-[#6b7281] text-[14px]">성인 1명</p>
          </div>
          <button className="border border-[#bfd6ee] rounded-[4px] h-[20px] px-[10px] flex items-center">
            <span className="text-[#006eb5] text-[10px] font-semibold">경로 수정</span>
          </button>
        </div>

        <div className="flex flex-col gap-[56px]">
          <div className="flex flex-col gap-[8px]">
            <div className="flex items-center gap-[4px]">
              <div className="size-[8px] rounded-full bg-[#afb8c5]" />
              <span className="text-[#afb8c5] text-[12px] font-semibold">출발 날짜</span>
            </div>
            <div ref={dateScrollRef} className="overflow-x-auto">
              <div className="flex gap-[8px] w-max">
                {DATES.map((d) => (
                  <button key={d.date}
                    onClick={() => { setSelectedDate(d.date); setSelectedTransport(null) }}
                    className={`size-[48px] flex flex-col items-center justify-center rounded-[8px] border-2 flex-shrink-0
                      ${d.date === selectedDate ? 'bg-[#132968] border-[#132968]'
                        : d.highlight === 'expensive' ? 'border-[#fd3235]'
                        : d.highlight === 'cheap'     ? 'border-[#008026]'
                        : 'border-[#e5e7ee]'}`}
                  >
                    <span className={`text-[10px] font-normal ${d.date === selectedDate ? 'text-[#d8d9dd]' : 'text-[#dadbe0]'}`}>{d.day}</span>
                    <span className={`text-[12px] font-semibold ${d.date === selectedDate ? 'text-white' : 'text-[#132968]'}`}>{d.date}</span>
                    <span className={`text-[10px] font-normal ${d.date === selectedDate ? 'text-[#d8d9dd]' : d.highlight === 'expensive' ? 'text-[#fd3235]' : d.highlight === 'cheap' ? 'text-[#008026]' : 'text-[#c24c00]'}`}>
                      ₩{d.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[24px]">
            {TRANSPORTS.map((t) => {
              const badge = getBadge(t.id, data)
              return (
                <button key={t.id} onClick={() => handleTransportClick(t)}
                  className={`bg-white border-2 rounded-[8px] px-[20px] py-[12px] flex items-center justify-between w-full transition-colors
                    ${selectedTransport === t.id ? 'border-[#fa6b6b]' : 'border-[#ccc]'}`}
                >
                  <div className="flex flex-col gap-[12px] flex-1">
                    <div className="flex items-center gap-[12px]">
                      <span className="text-[16px] font-semibold text-black">{t.name}</span>
                      {badge && (
                        <div className={`h-[20px] px-[12px] rounded-[4px] flex items-center ${badge.color}`}>
                          <span className="text-[10px] font-semibold">{badge.text}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-[20px]">
                      <div className="flex flex-col items-start">
                        <span className="text-[#afb8c5] text-[12px] font-semibold">소요시간</span>
                        <span className="text-[#132968] text-[14px] font-semibold">{t.duration}</span>
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-[#afb8c5] text-[12px] font-semibold">최저가</span>
                        <span className="text-[#ff5553] text-[14px] font-semibold">₩{(t.price * passengers).toLocaleString()}</span>
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-[#afb8c5] text-[12px] font-semibold">편수</span>
                        <span className="text-[#132968] text-[14px] font-semibold">{t.count}</span>
                      </div>
                    </div>
                  </div>
                  <Icon name="chevron_right" size={20} color="#afb8c5" />
                </button>
              )
            })}
          </div>
        </div>

      </div>

      {/* 고정 CTA */}
      <div className="flex-shrink-0 px-[16px] pb-[16px] pt-[8px] bg-white border-t border-[#f0f0f0]">
        <button
          onClick={() => { const t = TRANSPORTS.find(t => t.id === selectedTransport); if (t) navigate(`${t.route}?date=${selectedDate}&count=${parseInt(t.count)}&minprice=${t.price}`) }}
          className={`h-[48px] rounded-[8px] flex items-center justify-center w-full transition-colors ${selectedTransport ? 'bg-[#fa6b6b]' : 'bg-[#ccc]'}`}
        >
          <span className="text-white text-[14px] font-medium">
            {selectedTransport ? `${TRANSPORTS.find(t => t.id === selectedTransport)?.name} 편 보기` : '출발 수단을 선택해주세요'}
          </span>
        </button>
      </div>
    </div>
  )
}
