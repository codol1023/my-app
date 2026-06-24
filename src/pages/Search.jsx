import { useNavigate } from 'react-router-dom'
import { useState } from "react"
import { useTrip } from "../context/TripContext"
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import Icon from '../components/Icon'
import CityDropdown from '../components/CityDropdown'

export default function Search() {
  const navigate = useNavigate()
  const [flexDate, setFlexDate] = useState(false)
  const [passengers, setPassengers] = useState(1)
  const { origin, setOrigin, destination, setDestination } = useTrip()

  const swap = () => { const t = origin; setOrigin(destination); setDestination(t) }

  return (
    <div className="flex flex-col bg-white" style={{ height: '100%' }}>
      <StatusBar />

      {/* ── 스크롤 영역 ── */}
      <div className="flex-1 overflow-y-auto">
        {/* 파란 헤더 배경 — pt-[69px]로 StatusBar(53px) + 여백(16px) 확보 */}
        <div className="bg-[#132968] pt-[69px] pb-[72px] px-[20px]">
          <p className="text-white text-[16px] font-semibold">어디로 정하시겠습니까, 가영?</p>
          <p className="text-[#f1f2f6] text-[12px] font-normal">기차 · 버스 · 항공을 한눈에</p>
        </div>

        {/* 흰 카드 (음수 마진으로 겹침) */}
        <div className="bg-white rounded-tl-[8px] rounded-tr-[8px] -mt-[8px] px-[16px] pt-[24px] pb-[32px] flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-col gap-[10px]">
              {/* 출발지 — 드롭다운 */}
              <div className="bg-[#f1f2f6] h-[48px] rounded-[8px] flex items-center justify-between px-[16px] relative">
                <CityDropdown
                  value={origin}
                  onChange={setOrigin}
                  placeholder="출발지 입력"
                  iconName="trip_origin"
                  iconColor="#132968"
                />
                <button onClick={swap} className="cursor-pointer ml-[8px] flex-shrink-0">
                  <Icon name="swap_vert" size={24} color="#132968" />
                </button>
              </div>
              {/* 목적지 — 드롭다운 */}
              <div className="bg-[#f1f2f6] h-[48px] rounded-[8px] flex items-center px-[16px] relative">
                <CityDropdown
                  value={destination}
                  onChange={setDestination}
                  placeholder="어디로?"
                  iconName="location_on"
                  iconColor={destination ? '#132968' : '#6f7584'}
                />
              </div>
            </div>

            {/* 날짜 row — gutter 8 */}
            <div className="flex gap-[8px]">
              <button onClick={() => navigate('/date-select')}
                className="cursor-pointer bg-[#f1f2f6] h-[48px] rounded-[8px] flex items-center px-[10px] flex-1 gap-[8px]">
                <Icon name="calendar_month" size={24} color="#6f7584" />
                <span className="text-[#6f7584] text-[14px] font-semibold">출발일</span>
              </button>
              <button className="cursor-pointer bg-[#f1f2f6] h-[48px] rounded-[8px] flex items-center justify-between px-[10px] flex-1">
                <div className="flex items-center gap-[8px]">
                  <Icon name="calendar_month" size={24} color="#6f7584" />
                  <span className="text-[#6f7584] text-[14px] font-semibold">도착일</span>
                </div>
                <Icon name="close" size={24} color="#6f7584" />
              </button>
            </div>

            {/* 유연날짜 토글 */}
            <div className="border border-[#d5d5d5] h-[48px] rounded-[8px] flex items-center justify-between px-[16px]">
              <div className="flex flex-col gap-[2px]">
                <span className="text-[#132968] text-[14px] font-semibold">날짜 유연하게 보기</span>
                <span className="text-[#6f7584] text-[12px]">날짜별 최저가 달력으로 탐색</span>
              </div>
              <button
                onClick={() => { setFlexDate(!flexDate); if (!flexDate) navigate('/flexible') }}
                className={`cursor-pointer h-[34px] w-[66px] rounded-full flex items-center px-[1px] transition-all ${flexDate ? 'bg-[#fa6b6b] justify-end' : 'bg-[#d9d9d9] justify-start'}`}
              >
                <div className="size-[32px] rounded-full bg-white shadow" />
              </button>
            </div>

            {/* 인원 */}
            <div className="bg-[#f1f2f6] h-[48px] rounded-[8px] flex items-center justify-between px-[16px]">
              <div className="flex items-center gap-[8px]">
                <Icon name="person" size={24} color="#132968" />
                <span className="text-[#132968] text-[14px] font-semibold">{passengers} 성인</span>
              </div>
              <div className="flex items-center">
                <button onClick={() => setPassengers(Math.max(1, passengers - 1))} className="cursor-pointer size-[48px] flex items-center justify-center">
                  <Icon name="do_not_disturb_on" size={24} color="#6b7281" />
                </button>
                <span className="text-[14px] font-semibold w-[16px] text-center">{passengers}</span>
                <button onClick={() => setPassengers(passengers + 1)} className="cursor-pointer size-[48px] flex items-center justify-center">
                  <Icon name="add_circle" size={24} color="#6b7281" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 검색 버튼 — BottomNav 바로 위 sticky */}
      <div className="flex-shrink-0 px-[16px] pb-[8px] pt-[8px] bg-white border-t border-[#f0f0f0]">
        <button onClick={() => navigate('/compare')}
          className="cursor-pointer bg-[#fa6b6b] h-[48px] rounded-[8px] flex items-center justify-center w-full">
          <span className="text-white text-[14px] font-medium">검색 Omio</span>
        </button>
      </div>

      <BottomNav />
    </div>
  )
}
