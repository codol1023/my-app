import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'

const imgCircle = "/assets/ad040b28-ae44-4ae4-b832-a1b79882862b.png"
const imgLocation = "/assets/22da6ea7-f6a1-4763-ace1-f44d12ee519a.png"
const imgCalendar = "/assets/64b28a3d-21ea-46a1-b050-67857937482e.png"
const imgClose = "/assets/bd551e32-71d1-4353-b3d8-4f9149875313.png"
const imgPerson = "/assets/d84570d9-c1c7-477a-a9bf-0aedf4658f3e.png"
const imgMinus = "/assets/b070dd25-bb90-4bff-92ba-1e66a28c52c4.png"
const imgPlus = "/assets/42dc366c-84d4-40ac-93ce-e0416ef73976.png"
const imgSwap = "/assets/d77f90cf-d6a9-4069-b443-cf28e095a904.png"
const imgToggleOff = "/assets/5f96c425-f5a2-4f8e-aab8-06d4ae6eec25.png"

export default function Search() {
  const navigate = useNavigate()
  const [flexDate, setFlexDate] = useState(false)
  const [passengers, setPassengers] = useState(1)

  return (
    <div className="relative w-full min-h-svh bg-white">
      <StatusBar />
      <div className="absolute bg-[#132968] left-0 right-0 top-[53px] h-[248px]" />
      <div className="absolute bg-white rounded-tl-[8px] rounded-tr-[8px] left-0 right-0 top-[301px] bottom-0" />

      <div className="absolute left-[20px] right-[20px] top-[241px]">
        <p className="text-white text-[16px] font-semibold leading-normal">어디로 정하시겠습니까, 가영?</p>
        <p className="text-[#f1f2f6] text-[12px] font-normal">기차 · 버스 · 항공을 한눈에</p>
      </div>

      <div className="absolute left-[16px] right-[16px] top-[325px] flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-col gap-[10px]">
            <div className="bg-[#f1f2f6] h-[48px] rounded-[8px] flex items-center justify-between px-[30px]">
              <div className="flex items-center gap-[4px]">
                <img src={imgCircle} className="size-[24px]" alt="" />
                <span className="text-[#132968] text-[14px] font-semibold">파리 (CDG)</span>
              </div>
              <img src={imgSwap} className="size-[24px]" alt="" />
            </div>
            <div className="bg-[#f1f2f6] h-[48px] rounded-[8px] flex items-center px-[30px]">
              <div className="flex items-center gap-[4px]">
                <img src={imgLocation} className="size-[24px]" alt="" />
                <span className="text-[#6f7584] text-[14px] font-semibold">어디로?</span>
              </div>
            </div>
          </div>

          <div className="flex gap-[10px]">
            <button
              onClick={() => navigate('/date-select')}
              className="bg-[#f1f2f6] h-[48px] rounded-[8px] flex items-center px-[10px] flex-1"
            >
              <div className="flex items-center gap-[4px]">
                <img src={imgCalendar} className="size-[24px]" alt="" />
                <span className="text-[#6f7584] text-[14px] font-semibold">출발일</span>
              </div>
            </button>
            <div className="bg-[#f1f2f6] h-[48px] rounded-[8px] flex items-center justify-between px-[10px] flex-1">
              <div className="flex items-center gap-[4px]">
                <img src={imgCalendar} className="size-[24px]" alt="" />
                <span className="text-[#6f7584] text-[14px] font-semibold">도착일</span>
              </div>
              <img src={imgClose} className="size-[24px]" alt="" />
            </div>
          </div>

          <div className="border border-[#d5d5d5] h-[48px] rounded-[8px] flex items-center justify-between px-[30px]">
            <div className="flex flex-col gap-[4px]">
              <span className="text-[#132968] text-[14px] font-semibold">날짜 유연하게 보기</span>
              <span className="text-[#6f7584] text-[12px] font-normal">날짜별 최저가 달력으로 탐색</span>
            </div>
            <button
              onClick={() => { setFlexDate(!flexDate); if (!flexDate) navigate('/flexible') }}
              className={`h-[34px] w-[66px] rounded-full flex items-center px-[1px] transition-all ${flexDate ? 'bg-[#fa6b6b] justify-end' : 'bg-[#d9d9d9] justify-start'}`}
            >
              <div className="size-[32px] rounded-full bg-white shadow" />
            </button>
          </div>

          <div className="bg-[#f1f2f6] h-[48px] rounded-[8px] flex items-center justify-between px-[30px]">
            <div className="flex items-center gap-[4px]">
              <img src={imgPerson} className="size-[24px]" alt="" />
              <span className="text-[#132968] text-[14px] font-semibold">{passengers} 성인</span>
            </div>
            <div className="flex items-center">
              <button onClick={() => setPassengers(Math.max(1, passengers - 1))} className="size-[48px] flex items-center justify-center">
                <img src={imgMinus} className="size-[24px]" alt="-" />
              </button>
              <span className="text-[14px] font-semibold w-[16px] text-center">{passengers}</span>
              <button onClick={() => setPassengers(passengers + 1)} className="size-[48px] flex items-center justify-center">
                <img src={imgPlus} className="size-[24px]" alt="+" />
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('/compare')}
          className="bg-[#fa6b6b] h-[48px] rounded-[8px] flex items-center justify-center w-full"
        >
          <span className="text-white text-[14px] font-medium">검색 Omio</span>
        </button>
      </div>

      <BottomNav />
    </div>
  )
}
