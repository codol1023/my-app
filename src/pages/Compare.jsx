import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import StatusBar from '../components/StatusBar'

const imgBack = "/assets/5a5b516c-4ac1-4df0-bebc-b3359bd73b61.png"
const imgShare = "/assets/904fbc4c-986a-41d6-9ddb-46d3853b94b0.png"
const imgArrow = "/assets/550185c4-b488-40d9-8da0-059fa59c621e.png"
const imgChevFwd = "/assets/2634baac-2486-4731-9630-64491c9b06d6.png"
const imgChevFwd2 = "/assets/941fea48-c848-4734-bfc6-d48d950adaaf.png"

const DATES = [
  { day: '토', date: 13, price: 110, highlight: 'expensive' },
  { day: '일', date: 14, price: 118, highlight: 'expensive' },
  { day: '월', date: 15, price: 79, selected: true },
  { day: '화', date: 16, price: 98, highlight: 'cheap' },
  { day: '수', date: 17, price: 94, highlight: 'cheap' },
  { day: '목', date: 18, price: 89, highlight: 'cheap' },
  { day: '금', date: 19, price: 107 },
  { day: '토', date: 20, price: 155, highlight: 'expensive' },
  { day: '일', date: 21, price: 172, highlight: 'expensive' },
  { day: '월', date: 22, price: 128 },
  { day: '화', date: 23, price: 112 },
]

const TRANSPORTS = [
  { name: '항공', duration: '1h 50m', price: '₩79,000', count: '12편', badge: '가장 저렴', badgeColor: 'bg-[#eff6ff] text-[#006eb5]', selected: true },
  { name: '기차', duration: '6h 25m', price: '₩103,000', count: '8편', badge: null, selected: false },
  { name: '버스', duration: '14h 50m', price: '₩45,000', count: '6편', badge: '가장 저렴', badgeColor: 'bg-[#e6f5e8] text-[#008026]', selected: false },
]

export default function Compare() {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState(15)

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

      <div className="mt-[113px] px-[16px] pb-[80px] flex flex-col gap-[40px]">
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

        <div className="flex flex-col gap-[56px]">
          <div className="flex flex-col gap-[8px]">
            <div className="flex items-center gap-[4px]">
              <div className="size-[8px] rounded-full bg-[#afb8c5]" />
              <span className="text-[#afb8c5] text-[12px] font-semibold">출발 날짜</span>
            </div>
            <div className="overflow-x-auto">
              <div className="flex gap-[5px] w-max">
                {DATES.map((d) => (
                  <button
                    key={d.date}
                    onClick={() => setSelectedDate(d.date)}
                    className={`size-[48px] flex flex-col items-center justify-center rounded-[8px] border-2 flex-shrink-0
                      ${d.date === selectedDate ? 'bg-[#132968] border-[#132968]'
                        : d.highlight === 'expensive' ? 'border-[#fd3235]'
                        : d.highlight === 'cheap' ? 'border-[#008026]'
                        : 'border-[#e5e7ee]'}`}
                  >
                    <span className={`text-[10px] font-normal ${d.date === selectedDate ? 'text-[#d8d9dd]' : 'text-[#dadbe0]'}`}>{d.day}</span>
                    <span className={`text-[12px] font-semibold ${d.date === selectedDate ? 'text-white' : 'text-[#132968]'}`}>{d.date}</span>
                    <span className={`text-[10px] font-normal
                      ${d.date === selectedDate ? 'text-[#d8d9dd]'
                        : d.highlight === 'expensive' ? 'text-[#fd3235]'
                        : d.highlight === 'cheap' ? 'text-[#008026]'
                        : 'text-[#c24c00]'}`}>
                      ₩{d.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[24px]">
            {TRANSPORTS.map((t) => (
              <button
                key={t.name}
                onClick={() => t.name === '항공' && navigate('/departure')}
                className={`bg-white border-2 rounded-[8px] px-[20px] py-[12px] flex items-center justify-between w-full
                  ${t.selected ? 'border-[#fa6b6b]' : 'border-[#ccc]'}`}
              >
                <div className="flex flex-col gap-[12px] flex-1">
                  <div className="flex items-center gap-[12px]">
                    <span className="text-[16px] font-semibold text-black">{t.name}</span>
                    {t.badge && (
                      <div className={`h-[20px] px-[12px] rounded-[4px] flex items-center ${t.badgeColor}`}>
                        <span className="text-[10px] font-semibold">{t.badge}</span>
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
                      <span className="text-[#ff5553] text-[14px] font-semibold">{t.price}</span>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-[#afb8c5] text-[12px] font-semibold">편수</span>
                      <span className="text-[#132968] text-[14px] font-semibold">{t.count}</span>
                    </div>
                  </div>
                </div>
                <img src={imgChevFwd} className="size-[20px]" alt="" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[10px]">
          <p className="text-[#afb8c5] text-[12px]">카드 탭 → 전체 편 리스트로 이동</p>
          <button className="bg-[#ccc] h-[48px] rounded-[8px] flex items-center justify-center w-full">
            <span className="text-white text-[14px] font-medium">출발 수단을 선택해주세요</span>
          </button>
        </div>
      </div>
    </div>
  )
}
