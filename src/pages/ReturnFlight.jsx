import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import Icon from '../components/Icon'

const RETURN_DATES = [
  { day: '목', date: 25, price: 162, expensive: true },
  { day: '금', date: 26, price: 168, expensive: true },
  { day: '토', date: 27, price: 180, expensive: true },
  { day: '일', date: 28, price: 182, expensive: true },
  { day: '월', date: 29, price: 110 },
  { day: '화', date: 30, price: 105 },
  { day: '수', date: 1,  price: 107 },
  { day: '목', date: 2,  price: 105 },
  { day: '금', date: 3,  price: 172, expensive: true },
  { day: '토', date: 4,  price: 168, expensive: true },
]

const RETURN_BY_DATE = {
  25: { flight: { price: 162000, count: 7,  dur: '1h 50m' }, train: { price: 195000, count: 5, dur: '6h 25m' }, bus: { price: 88000,  count: 3, dur: '14h 50m' } },
  26: { flight: { price: 168000, count: 8,  dur: '1h 50m' }, train: { price: 202000, count: 5, dur: '6h 25m' }, bus: { price: 92000,  count: 3, dur: '14h 50m' } },
  27: { flight: { price: 180000, count: 6,  dur: '1h 50m' }, train: { price: 215000, count: 4, dur: '6h 25m' }, bus: { price: 99000,  count: 3, dur: '14h 50m' } },
  28: { flight: { price: 182000, count: 6,  dur: '1h 50m' }, train: { price: 218000, count: 4, dur: '6h 25m' }, bus: { price: 102000, count: 3, dur: '14h 50m' } },
  29: { flight: { price: 103000, count: 9,  dur: '1h 50m' }, train: { price: 98000,  count: 6, dur: '6h 25m' }, bus: { price: 52000,  count: 5, dur: '14h 50m' } },
  30: { flight: { price: 98000,  count: 10, dur: '1h 50m' }, train: { price: 92000,  count: 7, dur: '6h 25m' }, bus: { price: 48000,  count: 5, dur: '14h 50m' } },
  1:  { flight: { price: 107000, count: 9,  dur: '1h 50m' }, train: { price: 101000, count: 6, dur: '6h 25m' }, bus: { price: 55000,  count: 5, dur: '14h 50m' } },
  2:  { flight: { price: 105000, count: 9,  dur: '1h 50m' }, train: { price: 99000,  count: 6, dur: '6h 25m' }, bus: { price: 53000,  count: 5, dur: '14h 50m' } },
  3:  { flight: { price: 172000, count: 7,  dur: '1h 50m' }, train: { price: 205000, count: 4, dur: '6h 25m' }, bus: { price: 95000,  count: 3, dur: '14h 50m' } },
  4:  { flight: { price: 168000, count: 8,  dur: '1h 50m' }, train: { price: 198000, count: 5, dur: '6h 25m' }, bus: { price: 90000,  count: 3, dur: '14h 50m' } },
}

const TRANSPORT_KEYS = [
  { id: 'flight', label: '항공' },
  { id: 'train',  label: '기차' },
  { id: 'bus',    label: '버스' },
]

function cheapest(data) {
  return Object.entries({ flight: data.flight.price, train: data.train.price, bus: data.bus.price })
    .reduce((a, b) => a[1] < b[1] ? a : b)[0]
}

const DEPARTURE_PRICE = 79000

export default function ReturnFlight() {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState(29)
  const [selectedOption, setSelectedOption] = useState(null)

  const data = RETURN_BY_DATE[selectedDate]
  const cheapKey = cheapest(data)

  const OPTIONS = TRANSPORT_KEYS.map(t => ({ ...t, ...data[t.id] }))
  const selPrice = selectedOption !== null ? OPTIONS[selectedOption].price : null
  const totalPrice = DEPARTURE_PRICE + (selPrice ?? 0)

  return (
    <div className="flex flex-col bg-white" style={{ height: '100svh' }}>

      {/* ── 고정 헤더 ── */}
      <div className="flex-shrink-0">
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
      </div>

      {/* ── 스크롤 영역 ── */}
      <div className="flex-1 overflow-y-auto px-[16px] py-[16px] flex flex-col gap-[16px]">

        {/* 경로 + 출발편 확인 */}
        <div className="flex flex-col gap-[10px]">
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

          <div className="bg-[#e6f5e8] border border-[#57f3a7] h-[50px] rounded-[8px] flex items-center justify-between px-[20px]">
            <div className="flex items-center gap-[8px]">
              <Icon name="check_box" size={24} color="#008026" />
              <div>
                <p className="text-[#008026] text-[16px] font-semibold">출발편 선택 완료</p>
                <p className="text-[#00e275] text-[14px]">6/15(일) · Iberia · ₩79,000 · 10:30</p>
              </div>
            </div>
            <button className="bg-white border border-[#bfd6ee] rounded-[4px] h-[20px] px-[10px] flex items-center">
              <span className="text-[#006eb5] text-[10px] font-semibold">변경</span>
            </button>
          </div>
        </div>

        {/* 리턴편 선택 박스 */}
        <div className="border-2 border-[#132968] rounded-[8px] overflow-hidden">
          <div className="bg-[#132968] flex items-center justify-between px-[12px] py-[10px]">
            <p className="text-white text-[16px] font-semibold">리턴편 선택</p>
            <div className="bg-[#3a4a67] rounded-[4px] h-[28px] px-[12px] flex items-center gap-[4px]">
              <span className="text-white text-[12px] font-medium">자동 오픈</span>
              <Icon name="arrow_downward_alt" size={20} color="white" />
            </div>
          </div>

          <div className="bg-white px-[12px] py-[16px] flex flex-col gap-[16px]">
            {/* 날짜 스크롤 */}
            <div className="flex flex-col gap-[8px]">
              <span className="text-[#6b7281] text-[10px]">리턴 날짜 (6/15 이후)</span>
              <div className="overflow-x-auto">
                <div className="flex gap-[5px] w-max">
                  {RETURN_DATES.map((d) => (
                    <button key={`${d.day}-${d.date}`}
                      onClick={() => { setSelectedDate(d.date); setSelectedOption(null) }}
                      className={`size-[48px] flex flex-col items-center justify-center rounded-[8px] border-2 flex-shrink-0
                        ${d.date === selectedDate ? 'bg-[#132968] border-[#132968]' : d.expensive ? 'border-[#fd3235]' : 'border-[#e5e7ee]'}`}>
                      <span className={`text-[10px] font-normal ${d.date === selectedDate ? 'text-[#d8d9dd]' : 'text-[#dadbe0]'}`}>{d.day}</span>
                      <span className={`text-[12px] font-semibold ${d.date === selectedDate ? 'text-white' : 'text-[#132968]'}`}>{d.date}</span>
                      <span className={`text-[10px] font-normal ${d.date === selectedDate ? 'text-[#d8d9dd]' : d.expensive ? 'text-[#fd3235]' : 'text-[#c24c00]'}`}>₩{d.price}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 수단 카드 (날짜에 따라 count, price 변동) */}
            <div className="flex flex-col gap-[12px]">
              {OPTIONS.map((opt, idx) => (
                <button key={opt.id} onClick={() => setSelectedOption(idx)}
                  className={`bg-white border-2 rounded-[8px] py-[18px] px-[20px] flex flex-col gap-[12px] w-full transition-colors
                    ${selectedOption === idx ? 'border-[#fa6b6b]' : 'border-[#ccc]'}`}>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-[12px]">
                      <span className="text-[16px] font-semibold text-black">{opt.label}</span>
                      {opt.id === cheapKey && (
                        <div className="h-[20px] px-[12px] rounded-[4px] flex items-center bg-[#e6f5e8]">
                          <span className="text-[10px] font-semibold text-[#008026]">가장 저렴</span>
                        </div>
                      )}
                    </div>
                    <span className="text-[#ff5553] text-[16px] font-semibold">₩{opt.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[#7d8391] text-[14px] font-semibold">{opt.dur}</span>
                    <div className="flex items-center gap-[4px]">
                      <span className="text-[#132968] text-[14px] font-semibold">{opt.count}편</span>
                      <Icon name="chevron_right" size={20} color="#afb8c5" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 왕복 합계 */}
        <div className="bg-white border-2 border-[#f1f2f6] rounded-[8px] py-[12px] flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[10px] px-[20px] text-[14px] font-normal">
            <div className="flex items-center justify-between">
              <span className="text-[#7d8391]">출발 · 6/15 항공</span>
              <span className="text-[#132968]">₩{DEPARTURE_PRICE.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#7d8391]">리턴 · 6/{selectedDate} {selectedOption !== null ? OPTIONS[selectedOption].label : '—'}</span>
              <span className="text-[#132968]">{selPrice ? `₩${selPrice.toLocaleString()}` : '—'}</span>
            </div>
          </div>
          <div className="h-[1px] bg-[#f1f2f6] mx-[20px]" />
          <div className="flex items-center justify-between px-[20px]">
            <span className="text-[#132968] text-[16px] font-semibold">왕복 합계</span>
            <span className="text-[#132968] text-[20px] font-semibold">
              {selPrice ? `₩${totalPrice.toLocaleString()}` : '—'}
            </span>
          </div>
        </div>
      </div>

      {/* ── 고정 푸터 ── */}
      <div className="flex-shrink-0 px-[16px] pb-[16px] pt-[8px] bg-white border-t border-[#f0f0f0]">
        <button onClick={() => selectedOption !== null && alert('예약이 완료되었습니다! 🎉')}
          className={`h-[48px] rounded-[8px] flex items-center justify-center w-full transition-colors
            ${selectedOption !== null ? 'bg-[#fa6b6b]' : 'bg-[#ccc]'}`}>
          <span className="text-white text-[14px] font-medium">
            {selectedOption !== null ? `왕복 ₩${totalPrice.toLocaleString()} · 결제하기` : '리턴편을 선택해주세요'}
          </span>
        </button>
      </div>
    </div>
  )
}
