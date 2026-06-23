import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import Icon from '../components/Icon'

const DATES = [
  { day: '토', date: 13, price: 110, highlight: 'expensive' },
  { day: '일', date: 14, price: 118, highlight: 'expensive' },
  { day: '월', date: 15, price: 79,  highlight: 'cheap' },
  { day: '화', date: 16, price: 98,  highlight: 'cheap' },
  { day: '수', date: 17, price: 94,  highlight: 'cheap' },
  { day: '목', date: 18, price: 89,  highlight: 'cheap' },
  { day: '금', date: 19, price: 107 },
  { day: '토', date: 20, price: 155, highlight: 'expensive' },
  { day: '일', date: 21, price: 172, highlight: 'expensive' },
  { day: '월', date: 22, price: 128 },
  { day: '화', date: 23, price: 112 },
]

const TRANSPORT_BY_DATE = {
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
}

function getBadge(key, data) {
  const prices = { flight: data.flight.price, train: data.train.price, bus: data.bus.price }
  const min = Math.min(...Object.values(prices))
  if (prices[key] === min) return { text: '가장 저렴', color: 'bg-[#eff6ff] text-[#006eb5]' }
  if (key === 'flight') return { text: '가장 빠름', color: 'bg-[#e6f5e8] text-[#008026]' }
  return null
}

export default function Compare() {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState(15)
  const [selectedTransport, setSelectedTransport] = useState(null)

  const data = TRANSPORT_BY_DATE[selectedDate]
  const TRANSPORTS = [
    { id: 'flight', name: '항공', route: '/departure',       ...data.flight },
    { id: 'train',  name: '기차', route: '/departure-train', ...data.train  },
    { id: 'bus',    name: '버스', route: '/departure-bus',   ...data.bus    },
  ]

  const handleTransportClick = (t) => {
    setSelectedTransport(t.id)
    navigate(`${t.route}?date=${selectedDate}`)
  }

  return (
    <div className="relative w-full min-h-svh bg-white">
      <StatusBar />

      <div className="absolute bg-[#132968] left-0 right-0 top-[53px] h-[60px] flex items-center justify-between px-[16px]">
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

      <div className="mt-[113px] px-[16px] pb-[80px] flex flex-col gap-[40px]">
        <div className="bg-[#f1f2f6] border border-[#d5d5d5] h-[50px] rounded-[8px] flex items-center justify-between px-[16px]">
          <div>
            <div className="flex items-center gap-[4px]">
              <span className="text-[#132968] text-[16px] font-semibold">파리</span>
              <Icon name="arrow_forward" size={20} color="#132968" />
              <span className="text-[#132968] text-[16px] font-semibold">바르셀로나 · 왕복</span>
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
            <div className="overflow-x-auto">
              <div className="flex gap-[5px] w-max">
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
                        <span className="text-[#ff5553] text-[14px] font-semibold">₩{t.price.toLocaleString()}</span>
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

        <div className="flex flex-col gap-[10px]">
          <p className="text-[#afb8c5] text-[12px]">카드 탭 → 전체 편 리스트로 이동</p>
          <button
            onClick={() => { const t = TRANSPORTS.find(t => t.id === selectedTransport); if (t) navigate(`${t.route}?date=${selectedDate}`) }}
            className={`h-[48px] rounded-[8px] flex items-center justify-center w-full transition-colors ${selectedTransport ? 'bg-[#fa6b6b]' : 'bg-[#ccc]'}`}
          >
            <span className="text-white text-[14px] font-medium">
              {selectedTransport ? `${TRANSPORTS.find(t => t.id === selectedTransport)?.name} 편 보기` : '출발 수단을 선택해주세요'}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
