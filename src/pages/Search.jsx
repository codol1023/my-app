import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import Icon from '../components/Icon'

export default function Search() {
  const navigate = useNavigate()
  const [flexDate, setFlexDate] = useState(false)
  const [passengers, setPassengers] = useState(1)
  const [origin, setOrigin] = useState('파리 (CDG)')
  const [destination, setDestination] = useState('')

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
              {/* 출발지 */}
              <div className="bg-[#f1f2f6] h-[48px] rounded-[8px] flex items-center justify-between px-[16px]">
                <div className="flex items-center gap-[8px] flex-1">
                  <Icon name="trip_origin" size={24} color="#132968" />
                  <input
                    value={origin}
                    onChange={e => setOrigin(e.target.value)}
                    placeholder="출발지 입력"
                    className="bg-transparent text-[#132968] text-[14px] font-semibold outline-none flex-1 min-w-0"
                  />
                </div>
                <button onClick={swap} className="cursor-pointer ml-[8px]">
                  <Icon name="swap_vert" size={24} color="#132968" />
                </button>
              </div>
              {/* 목적지 */}
              <div className="bg-[#f1f2f6] h-[48px] rounded-[8px] flex items-center px-[16px] gap-[8px]">
                <Icon name="location_on" size={24} color={destination ? '#132968' : '#6f7584'} />
                <input
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                  placeholder="어디로?"
                  className="bg-transparent text-[14px] font-semibold outline-none flex-1 min-w-0 placeholder-[#6f7584]"
                  style={{ color: destination ? '#132968' : undefined }}
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

          <button onClick={() => navigate('/compare')}
            className="cursor-pointer bg-[#fa6b6b] h-[48px] rounded-[8px] flex items-center justify-center w-full">
            <span className="text-white text-[14px] font-medium">검색 Omio</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
