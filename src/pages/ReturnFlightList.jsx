import { useTrip, cityName } from '../context/TripContext'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import Icon from '../components/Icon'

const AIRLINES = ['Vueling', 'Iberia', 'Air France', 'easyJet', 'Ryanair', 'Transavia', 'Volotea', 'Iberia Express', 'Air Nostrum', 'Binter', 'Norwegian', 'Wizz Air']
const TRAIN_COMPANIES = ['Renfe AVE', 'TGV Lyria', 'Renfe Alvia', 'Ouigo España', 'Renfe Avant', 'Renfe MD', 'TER', 'Intercités', 'SNCF TGV']

function generateOptions(count, minPrice, type) {
  const companies = type === 'flight' ? AIRLINES : TRAIN_COMPANIES
  const durationLabel = type === 'flight' ? '1h 50m' : '6h 25m'
  const durationH = type === 'flight' ? 1 : 6
  const durationM = type === 'flight' ? 50 : 25
  const arrOffset = durationH * 60 + durationM

  return Array.from({ length: count }, (_, i) => {
    const depH = 6 + Math.floor(i * (16 / Math.max(count - 1, 1)))
    const depM = (i * 13) % 60
    const totalArrMin = depH * 60 + depM + arrOffset
    const arrH = Math.floor(totalArrMin / 60) % 24
    const arrM = totalArrMin % 60
    const priceStep = Math.round(minPrice * 0.07 / 1000) * 1000
    const price = minPrice + i * priceStep
    const fmt = (n) => String(n).padStart(2, '0')
    return {
      id: i + 1,
      dep: `${fmt(depH)}:${fmt(depM)}`,
      arr: `${fmt(arrH)}:${fmt(arrM)}`,
      company: companies[i % companies.length],
      price,
      duration: durationLabel,
      isLowest: i === 0,
    }
  })
}

const TAG_STYLES = {
  '직항':   'bg-[#e6f5e8] text-[#008026]',
  '최저가': 'bg-[#fff4c2] text-[#c24c00]',
}

export default function ReturnFlightList() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const type     = searchParams.get('type')     ?? 'flight'
  const date     = parseInt(searchParams.get('date')     ?? '29',     10)
  const count    = parseInt(searchParams.get('count')    ?? '9',      10)
  const minPrice = parseInt(searchParams.get('minprice') ?? '103000', 10)

  const options = generateOptions(count, minPrice, type)
  const isFlight = type === 'flight'
  const label = isFlight ? '항공 리턴편' : '기차 리턴편'

  const { origin, destination } = useTrip()
  const orig = cityName(origin) || "파리"
  const dest = cityName(destination) || "목적지"
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('전체')
  const filters = ['전체', '직항만', '오전 출발', '가격순']

  const handleConfirm = () => {
    if (!selected) return
    const sel = options.find(o => o.id === selected)
    navigate(`/return?selected=${type}&returnprice=${sel.price}&date=${date}`)
  }

  return (
    <div className="flex flex-col bg-white" style={{ height: '100%' }}>

      {/* ── 고정 헤더 ── */}
      <div className="flex-shrink-0 pt-[53px]">
        <StatusBar />
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

        <div className="bg-[#132968] border-b border-[#d5d5d5] h-[50px] flex items-center justify-between px-[16px]">
          <div>
            <p className="text-white text-[16px] font-semibold">{label}</p>
            <p className="text-[#6b7281] text-[14px]">6월 {date}일 (월) · {dest} → {orig}</p>
          </div>
          <div className="bg-[#3a4a67] h-[20px] px-[12px] rounded-[4px] flex items-center">
            <span className="text-white text-[10px] font-semibold">{count}편</span>
          </div>
        </div>

        <div className="flex gap-[10px] overflow-x-auto px-[16px] py-[10px] bg-white border-b border-[#f0f0f0]">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`h-[28px] px-[12px] rounded-full whitespace-nowrap flex-shrink-0 text-[12px] font-medium
                ${filter === f ? 'bg-[#132968] text-white' : 'border border-[#e5e7ee] text-[#6b7281]'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── 스크롤 영역 ── */}
      <div className="flex-1 overflow-y-auto px-[16px] py-[16px] flex flex-col gap-[16px]">
        {options.map((o) => (
          <button key={o.id} onClick={() => setSelected(o.id)}
            className={`bg-white border-2 rounded-[8px] py-[12px] flex flex-col gap-[8px] w-full transition-colors
              ${selected === o.id ? 'border-[#fa6b6b]' : 'border-[#ccc]'}`}>
            <div className="flex items-center justify-between px-[20px]">
              <div className="flex items-center gap-[8px]">
                <div className="flex items-center gap-[4px]">
                  <span className="text-[16px] font-semibold text-black">{o.dep}</span>
                  <Icon name="arrow_forward" size={20} color="#132968" />
                  <span className="text-[16px] font-semibold text-black">{o.arr}</span>
                </div>
                <div className="bg-[#f2f3f5] h-[28px] px-[12px] rounded-[4px] flex items-center">
                  <span className="text-[#6b7281] text-[12px] font-medium">{o.duration}</span>
                </div>
              </div>
              <span className="text-[#ff5553] text-[16px] font-semibold">₩{o.price.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between px-[20px]">
              <span className="text-[#7d8391] text-[14px] font-semibold">{o.company}</span>
              <div className="flex gap-[8px]">
                <div className={`h-[28px] px-[12px] rounded-[4px] flex items-center ${TAG_STYLES['직항']}`}>
                  <span className="text-[12px] font-medium">직항</span>
                </div>
                {o.isLowest && (
                  <div className={`h-[28px] px-[12px] rounded-[4px] flex items-center ${TAG_STYLES['최저가']}`}>
                    <span className="text-[12px] font-medium">최저가</span>
                  </div>
                )}
                {selected === o.id && (
                  <div className="h-[28px] px-[12px] rounded-[4px] flex items-center bg-black">
                    <span className="text-[12px] font-medium text-white">선택됨</span>
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* ── 고정 푸터 ── */}
      <div className="flex-shrink-0 px-[16px] pb-[16px] pt-[8px] bg-white border-t border-[#f0f0f0]">
        <button onClick={handleConfirm}
          className={`h-[48px] rounded-[8px] flex items-center justify-center w-full transition-colors
            ${selected ? 'bg-[#fa6b6b]' : 'bg-[#ccc]'}`}>
          <span className="text-white text-[14px] font-medium">
            {selected ? '이 편으로 도착 선택' : '편을 선택해주세요'}
          </span>
        </button>
      </div>
    </div>
  )
}
