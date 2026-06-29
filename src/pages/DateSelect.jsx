import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import Icon from '../components/Icon'
import CityDropdown from '../components/CityDropdown'
import { useTrip } from '../context/TripContext'

const DAYS = ['일', '월', '화', '수', '목', '금', '토']
const JUNE_2026 = [
  [null, 1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12, 13],
  [14, 15, 16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25, 26, 27],
  [28, 29, 30, null, null, null, null],
]

export default function DateSelect() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { origin, setOrigin, destination, setDestination, passengers, setPassengers, saveSearch, setIsOneway } = useTrip()
  const swap = () => { const t = origin; setOrigin(destination); setDestination(t) }
  const [flexDate, setFlexDate] = useState(false)
  const [departDay, setDepartDay] = useState(null)
  const [returnDay, setReturnDay] = useState(null)
  const [selectingReturn, setSelectingReturn] = useState(false)
  const [roundtrip, setRoundtrip] = useState(searchParams.get('roundtrip') === '1')

  const canSearch = !!(origin.trim() && destination.trim() && departDay)
  const handleSearch = () => {
    if (!canSearch) return
    saveSearch()
    setIsOneway(!roundtrip || !returnDay)
    navigate(`/compare${departDay ? `?date=${departDay}` : ''}`)
  }

  const enableRoundtrip = () => {
    setRoundtrip(true)
    if (departDay) setSelectingReturn(true)
  }

  const handleDayClick = (day) => {
    if (!day) return
    if (!roundtrip) {
      setDepartDay(day)
      setReturnDay(null)
    } else if (!departDay || !selectingReturn) {
      setDepartDay(day); setReturnDay(null); setSelectingReturn(true)
    } else {
      if (day > departDay) { setReturnDay(day); setSelectingReturn(false) }
      else { setDepartDay(day); setReturnDay(null) }
    }
  }

  const isInRange = (day) => departDay && returnDay && day && day > departDay && day < returnDay
  const getDayBg = (day) => {
    if (!day) return ''
    if (day === departDay || day === returnDay) return 'bg-[#132968]'
    if (isInRange(day)) return 'bg-[#e9f3ff]'
    return ''
  }
  const getDayText = (day) => {
    if (!day) return 'text-transparent'
    if (day === departDay || day === returnDay) return 'text-white'
    return 'text-black'
  }

  return (
    <div className="flex flex-col bg-white" style={{ height: '100%' }}>
      <StatusBar />

      {/* ── 스크롤 영역 ── */}
      <div className="flex-1 overflow-y-auto">
        {/* 파란 헤더 */}
        <div className="bg-[#132968] pt-[69px] pb-[20px] px-[20px]">
          <p className="text-white text-[16px] font-semibold">어디로 정하시겠습니까, 가영?</p>
          <p className="text-[#f1f2f6] text-[12px]">기차 · 버스 · 항공을 한눈에</p>
        </div>

        <div className="px-[16px] pt-[16px] pb-[32px] flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[10px]">
            {/* 출발지 — 드롭다운 */}
            <div className="bg-[#f1f2f6] h-[48px] rounded-[8px] flex items-center justify-between px-[16px] relative">
              <CityDropdown value={origin} onChange={setOrigin} placeholder="출발지 입력" iconName="trip_origin" iconColor="#132968" />
              <button onClick={swap} className="cursor-pointer ml-[8px] flex-shrink-0">
                <Icon name="swap_vert" size={24} color="#132968" />
              </button>
            </div>
            {/* 목적지 — 드롭다운 */}
            <div className="bg-[#f1f2f6] h-[48px] rounded-[8px] flex items-center px-[16px] relative">
              <CityDropdown value={destination} onChange={setDestination} placeholder="어디로?" iconName="location_on" iconColor={destination ? '#132968' : '#6f7584'} />
            </div>

            {/* 날짜 row — gutter 8 */}
            <div className="flex gap-[8px]">
              <div className="bg-[#f1f2f6] h-[48px] rounded-[8px] flex items-center px-[10px] flex-1 gap-[8px]">
                <Icon name="calendar_month" size={24} color="#6f7584" />
                <span className="text-[#6f7584] text-[14px] font-semibold">
                  {departDay ? `6월 ${departDay}일` : '출발일'}
                </span>
              </div>
              {roundtrip ? (
                <div className="bg-[#f1f2f6] h-[48px] rounded-[8px] flex items-center justify-between px-[10px] flex-1">
                  <div className="flex items-center gap-[8px]">
                    <Icon name="calendar_month" size={24} color="#6f7584" />
                    <span className="text-[#6f7584] text-[14px] font-semibold">
                      {returnDay ? `6월 ${returnDay}일` : '오는 날'}
                    </span>
                  </div>
                  {returnDay && <button onClick={() => { setReturnDay(null); setSelectingReturn(true) }} className="cursor-pointer">
                    <Icon name="close" size={24} color="#6f7584" />
                  </button>}
                </div>
              ) : (
                <button onClick={enableRoundtrip}
                  className="cursor-pointer bg-[#f1f2f6] h-[48px] rounded-[8px] flex items-center px-[10px] flex-1 gap-[8px]">
                  <Icon name="add" size={24} color="#6f7584" />
                  <span className="text-[#6f7584] text-[14px] font-semibold">+왕복선택</span>
                </button>
              )}
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
          </div>

          {/* 달력 */}
          <div className="flex flex-col">
            <div className="bg-[#fff7ec] border-2 border-[#d5d5d5] border-b-0 rounded-tl-[8px] rounded-tr-[8px] h-[48px] flex items-center px-[16px] gap-[8px]">
              <Icon name="calendar_month" size={24} color="#fa6b6b" />
              <div className="flex flex-col">
                <span className="text-[#d5d5d5] text-[12px]">가는 날</span>
                <span className="text-[#fa6b6b] text-[14px] font-semibold">
                  {roundtrip && selectingReturn && departDay ? '오는 날 선택 중...' : departDay ? `6월 ${departDay}일 선택됨` : '가는 날 선택 중...'}
                </span>
              </div>
            </div>

            <div className="border-2 border-[#d5d5d5] bg-white px-[17px] py-[20px]">
              <div className="flex items-center justify-between px-[12px] mb-[12px]">
                <span className="text-[#132968] text-[16px] font-semibold">2026년 6월</span>
                <div className="flex">
                  <button className="cursor-pointer size-[48px] flex items-center justify-center">
                    <Icon name="chevron_left" size={24} color="#132968" />
                  </button>
                  <button className="cursor-pointer size-[48px] flex items-center justify-center">
                    <Icon name="chevron_right" size={24} color="#132968" />
                  </button>
                </div>
              </div>

              <div className="flex mb-[4px]">
                {DAYS.map((d, i) => (
                  <div key={d} className="flex-1 flex items-center justify-center h-[48px]">
                    <span className={`text-[10px] font-semibold ${i === 0 ? 'text-[#fa6b6b]' : 'text-[#6b7281]'}`}>{d}</span>
                  </div>
                ))}
              </div>

              {JUNE_2026.map((week, wi) => (
                <div key={wi} className="flex">
                  {week.map((day, di) => (
                    <button key={di} onClick={() => handleDayClick(day)}
                      className="cursor-pointer flex-1 flex items-center justify-center size-[48px] p-[4px]">
                      <div className={`size-[41px] rounded-full flex items-center justify-center ${getDayBg(day)}`}>
                        <span className={`text-[10px] font-semibold ${getDayText(day)}`}>{day || ''}</span>
                      </div>
                    </button>
                  ))}
                </div>
              ))}
            </div>

            {roundtrip ? (
              <div className="bg-[#f1f2f6] border-2 border-[#d5d5d5] border-t-0 rounded-bl-[8px] rounded-br-[8px] h-[48px] flex items-center justify-between px-[16px]">
                <div className="flex items-center gap-[8px]">
                  <Icon name="calendar_month" size={24} color="#6f7584" />
                  <div className="flex flex-col">
                    <span className="text-[#d5d5d5] text-[12px]">오는 날</span>
                    <span className="text-[#132968] text-[14px] font-semibold">
                      {returnDay ? `6월 ${returnDay}일` : '날짜 선택'}
                    </span>
                  </div>
                </div>
                {returnDay && (
                  <div className="bg-[#fa6b6b] h-[20px] px-[12px] rounded-[4px] flex items-center">
                    <span className="text-white text-[10px] font-semibold">+14일</span>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={enableRoundtrip}
                className="cursor-pointer bg-[#f1f2f6] border-2 border-[#d5d5d5] border-t-0 rounded-bl-[8px] rounded-br-[8px] h-[48px] flex items-center px-[16px] gap-[8px] w-full">
                <Icon name="add" size={24} color="#6f7584" />
                <span className="text-[#6f7584] text-[14px] font-semibold">+왕복선택</span>
              </button>
            )}
          </div>

          {/* 인원 — context 연동 */}
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

      {/* 검색 버튼 sticky — 경로+날짜 미입력 시 비활성 */}
      <div className="flex-shrink-0 px-[16px] pb-[8px] pt-[8px] bg-white border-t border-[#f0f0f0]">
        <button onClick={handleSearch}
          className={`cursor-pointer h-[48px] rounded-[8px] flex items-center justify-center w-full transition-colors ${canSearch ? 'bg-[#fa6b6b]' : 'bg-[#ccc] cursor-not-allowed'}`}>
          <span className="text-white text-[14px] font-medium">
            {departDay ? (roundtrip ? (returnDay ? '왕복 검색 Omio' : '편도로 검색 Omio') : '편도로 검색 Omio') : '날짜를 선택해주세요'}
          </span>
        </button>
      </div>

      <BottomNav />
    </div>
  )
}
