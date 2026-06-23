import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import Icon from '../components/Icon'

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
            <div className="bg-[#f1f2f6] h-[48px] rounded-[8px] flex items-center justify-between px-[16px]">
              <div className="flex items-center gap-[8px]">
                <Icon name="trip_origin" size={24} color="#132968" />
                <span className="text-[#132968] text-[14px] font-semibold">파리 (CDG)</span>
              </div>
              <Icon name="swap_vert" size={24} color="#132968" />
            </div>
            <div className="bg-[#f1f2f6] h-[48px] rounded-[8px] flex items-center px-[16px]">
              <div className="flex items-center gap-[8px]">
                <Icon name="location_on" size={24} color="#6f7584" />
                <span className="text-[#6f7584] text-[14px] font-semibold">어디로?</span>
              </div>
            </div>
          </div>

          <div className="flex gap-[10px]">
            <button onClick={() => navigate('/date-select')}
              className="bg-[#f1f2f6] h-[48px] rounded-[8px] flex items-center px-[10px] flex-1 gap-[4px]">
              <Icon name="calendar_month" size={24} color="#6f7584" />
              <span className="text-[#6f7584] text-[14px] font-semibold">출발일</span>
            </button>
            <div className="bg-[#f1f2f6] h-[48px] rounded-[8px] flex items-center justify-between px-[10px] flex-1">
              <div className="flex items-center gap-[4px]">
                <Icon name="calendar_month" size={24} color="#6f7584" />
                <span className="text-[#6f7584] text-[14px] font-semibold">도착일</span>
              </div>
              <Icon name="close" size={24} color="#6f7584" />
            </div>
          </div>

          <div className="border border-[#d5d5d5] h-[48px] rounded-[8px] flex items-center justify-between px-[16px]">
            <div className="flex flex-col gap-[2px]">
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

          <div className="bg-[#f1f2f6] h-[48px] rounded-[8px] flex items-center justify-between px-[16px]">
            <div className="flex items-center gap-[8px]">
              <Icon name="person" size={24} color="#132968" />
              <span className="text-[#132968] text-[14px] font-semibold">{passengers} 성인</span>
            </div>
            <div className="flex items-center">
              <button onClick={() => setPassengers(Math.max(1, passengers - 1))} className="size-[48px] flex items-center justify-center">
                <Icon name="do_not_disturb_on" size={24} color="#6b7281" />
              </button>
              <span className="text-[14px] font-semibold w-[16px] text-center">{passengers}</span>
              <button onClick={() => setPassengers(passengers + 1)} className="size-[48px] flex items-center justify-center">
                <Icon name="add_circle" size={24} color="#6b7281" />
              </button>
            </div>
          </div>
        </div>

        <button onClick={() => navigate('/compare')}
          className="bg-[#fa6b6b] h-[48px] rounded-[8px] flex items-center justify-center w-full">
          <span className="text-white text-[14px] font-medium">검색 Omio</span>
        </button>
      </div>

      <BottomNav />
    </div>
  )
}
