import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import StatusBar from '../components/StatusBar'

const imgBack = "https://www.figma.com/api/mcp/asset/995a2a80-b777-4d81-82a3-698d4c94c9a9"
const imgShare = "https://www.figma.com/api/mcp/asset/edf2578f-22ee-4361-9cc1-1b5aa571cb1a"
const imgArrow = "https://www.figma.com/api/mcp/asset/7066fbc0-9e54-406e-b72c-355fdf80ed6c"
const imgCheck = "https://www.figma.com/api/mcp/asset/9ca9e13e-591e-4983-9786-b5bce758e889"
const imgChevFwd = "https://www.figma.com/api/mcp/asset/70129f0e-45a3-4d8d-8628-62de71e52f95"
const imgDownward = "https://www.figma.com/api/mcp/asset/bd141235-2f4b-4cc4-833f-35364f305094"

const RETURN_DATES = [
  { day: '목', date: 25, price: 162, expensive: true },
  { day: '금', date: 26, price: 168, expensive: true },
  { day: '토', date: 27, price: 180, expensive: true },
  { day: '일', date: 28, price: 182, expensive: true },
  { day: '월', date: 29, price: 110, selected: true },
  { day: '화', date: 30, price: 105 },
  { day: '수', date: 1, price: 107 },
  { day: '목', date: 2, price: 105 },
  { day: '금', date: 3, price: 172, expensive: true },
  { day: '토', date: 4, price: 168, expensive: true },
]

const RETURN_OPTIONS = [
  { type: '항공', duration: '1h 50m · 직항', price: 103000, count: '9편', badge: '가장 저렴', badgeColor: 'bg-[#e6f5e8] text-[#008026]', selected: true },
  { type: '기차', duration: '6h 25m', price: 98000, count: '6편', badge: null, selected: false },
]

export default function ReturnFlight() {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState(29)
  const [selectedOption, setSelectedOption] = useState(0)
  const [done, setDone] = useState(false)

  const totalPrice = 79000 + RETURN_OPTIONS[selectedOption].price

  return (
    <div className="relative w-full min-h-svh bg-white">
      <StatusBar />

      <div className="absolute bg-[#132968] left-0 right-0 top-[53px] h-[60px] flex items-center justify-between px-[16px]">
        <button onClick={() => navigate(-1)} className="size-[48px] flex items-center justify-center">
          <img src={imgBack} className="size-[24px]" alt="뒤로" />
        </button>
        <p className="text-white text-[16px] font-semibold">교통편 비교</p>
        <div className="flex items-center">
          <div className="border border-white rounded-[4px] h-[24px] px-[8px] flex items-center">
            <span className="text-white text-[12px] font-semibold">수정</span>
          </div>
          <button className="size-[48px] flex items-center justify-center">
            <img src={imgShare} className="size-[24px]" alt="공유" />
          </button>
        </div>
      </div>

      <div className="mt-[113px] px-[16px] pb-[120px] flex flex-col gap-[20px]">
        <div className="flex flex-col gap-[10px]">
          <div className="bg-[#f1f2f6] border border-[#d5d5d5] h-[50px] rounded-[8px] flex items-center justify-between px-[30px]">
            <div>
              <div className="flex items-center gap-[4px]">
                <span className="text-[#132968] text-[16px] font-semibold">파리</span>
                <img src={imgArrow} className="size-[24px]" alt="→" />
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
              <img src={imgCheck} className="size-[24px]" alt="" />
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

        <div className="border-2 border-[#132968] rounded-[8px] overflow-hidden">
          <div className="bg-[#132968] flex items-center justify-between px-[12px] py-[10px]">
            <p className="text-white text-[16px] font-semibold">리턴편 선택</p>
            <div className="bg-[#3a4a67] rounded-[4px] h-[28px] px-[12px] flex items-center gap-[4px]">
              <span className="text-white text-[12px] font-medium">자동 오픈</span>
              <img src={imgDownward} className="size-[20px]" alt="" />
            </div>
          </div>

          <div className="bg-white px-[12px] py-[20px] flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[8px]">
              <span className="text-[#6b7281] text-[10px]">리턴 날짜 (6/15 이후)</span>
              <div className="overflow-x-auto">
                <div className="flex gap-[5px] w-max">
                  {RETURN_DATES.map((d) => (
                    <button
                      key={`${d.day}-${d.date}`}
                      onClick={() => setSelectedDate(d.date)}
                      className={`size-[48px] flex flex-col items-center justify-center rounded-[8px] border-2 flex-shrink-0
                        ${d.date === selectedDate ? 'bg-[#132968] border-[#132968]'
                          : d.expensive ? 'border-[#fd3235]'
                          : 'border-[#e5e7ee]'}`}
                    >
                      <span className={`text-[10px] font-normal ${d.date === selectedDate ? 'text-[#d8d9dd]' : 'text-[#dadbe0]'}`}>{d.day}</span>
                      <span className={`text-[12px] font-semibold ${d.date === selectedDate ? 'text-white' : 'text-[#132968]'}`}>{d.date}</span>
                      <span className={`text-[10px] font-normal ${d.date === selectedDate ? 'text-[#d8d9dd]' : d.expensive ? 'text-[#fd3235]' : 'text-[#c24c00]'}`}>
                        ₩{d.price}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[12px]">
              {RETURN_OPTIONS.map((opt, idx) => (
                <button
                  key={opt.type}
                  onClick={() => setSelectedOption(idx)}
                  className={`bg-white border-2 rounded-[8px] py-[18px] px-[20px] flex flex-col gap-[12px] w-full
                    ${selectedOption === idx ? 'border-[#fa6b6b]' : 'border-[#ccc]'}`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-[12px]">
                      <span className="text-[16px] font-semibold text-black">{opt.type}</span>
                      {opt.badge && (
                        <div className={`h-[20px] px-[12px] rounded-[4px] flex items-center ${opt.badgeColor}`}>
                          <span className="text-[10px] font-semibold">{opt.badge}</span>
                        </div>
                      )}
                    </div>
                    <span className="text-[#ff5553] text-[16px] font-semibold">₩{opt.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[#7d8391] text-[14px] font-semibold">{opt.duration}</span>
                    <div className="flex items-center gap-[4px]">
                      <span className="text-[#132968] text-[14px] font-semibold">{opt.count}</span>
                      <img src={imgChevFwd} className="size-[20px]" alt="" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-[#f1f2f6] rounded-[8px] py-[12px] flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[10px] px-[20px] text-[14px] font-normal">
            <div className="flex items-center justify-between">
              <span className="text-[#7d8391]">출발 · 6/15 항공</span>
              <span className="text-[#132968]">₩79,000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#7d8391]">리턴 · 6/{selectedDate} 항공</span>
              <span className="text-[#132968]">₩{RETURN_OPTIONS[selectedOption].price.toLocaleString()}</span>
            </div>
          </div>
          <div className="h-[1px] bg-[#f1f2f6] mx-[20px]" />
          <div className="flex items-center justify-between px-[20px]">
            <span className="text-[#132968] text-[16px] font-semibold">왕복 합계</span>
            <span className="text-[#132968] text-[20px] font-semibold">₩{totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-[16px] pb-[16px] pt-[8px] bg-white">
        <button
          onClick={() => alert('예약이 완료되었습니다! 🎉')}
          className="bg-[#fa6b6b] h-[48px] rounded-[8px] flex items-center justify-center w-full"
        >
          <span className="text-white text-[14px] font-medium">왕복 ₩{totalPrice.toLocaleString()} · 결제하기</span>
        </button>
      </div>
    </div>
  )
}
