import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'

const imgCircle = "https://www.figma.com/api/mcp/asset/d37e4e2f-af9b-4f8a-9263-b45e72053c49"
const imgLocation = "https://www.figma.com/api/mcp/asset/04799a48-3974-4bd7-bf96-00670a5c4bc1"
const imgCalendar = "https://www.figma.com/api/mcp/asset/a021c597-aa5a-4330-beec-f06a2fb7837b"
const imgCalendar2 = "https://www.figma.com/api/mcp/asset/29f4631a-9b2d-44e4-a005-745eac49e690"
const imgClose = "https://www.figma.com/api/mcp/asset/2600c4ad-2a3c-42cd-a26b-170d7ea016d6"
const imgPerson = "https://www.figma.com/api/mcp/asset/5955395a-126d-4d96-b1d2-20885bb322af"
const imgMinus = "https://www.figma.com/api/mcp/asset/a6cd7f38-bde7-4650-ac75-16c1f9d7e1f5"
const imgPlus = "https://www.figma.com/api/mcp/asset/46601088-3538-4fb7-9df1-aa3bb2c75bb1"
const imgSwap = "https://www.figma.com/api/mcp/asset/974bb182-c997-4c7c-aff4-ebec3b5f53c9"
const imgChevFwd = "https://www.figma.com/api/mcp/asset/4053a4eb-29cd-4707-9c6b-360893f541cb"
const imgChevBwd = "https://www.figma.com/api/mcp/asset/d090958c-e841-4e4e-acdc-e09ad94accba"
const imgEllipse = "https://www.figma.com/api/mcp/asset/a29c4611-5d7c-4a8b-82b5-de3edd89ad45"
const imgEllipseRed = "https://www.figma.com/api/mcp/asset/11cc3751-3ab1-4206-b2c3-6b583cb2227b"
const imgEllipseBlue = "https://www.figma.com/api/mcp/asset/35840b6c-2305-4b99-b6f0-5e3ce4deffbe"
const imgEllipseSelected = "https://www.figma.com/api/mcp/asset/1f1fe947-4ba8-42b3-9c22-1a002933daeb"

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
  const [flexDate, setFlexDate] = useState(false)
  const [departDay, setDepartDay] = useState(null)
  const [returnDay, setReturnDay] = useState(null)
  const [selectingReturn, setSelectingReturn] = useState(false)

  const handleDayClick = (day) => {
    if (!day) return
    if (!departDay || selectingReturn === false) {
      setDepartDay(day)
      setReturnDay(null)
      setSelectingReturn(true)
    } else {
      if (day > departDay) {
        setReturnDay(day)
        setSelectingReturn(false)
      } else {
        setDepartDay(day)
        setReturnDay(null)
      }
    }
  }

  const isInRange = (day) => {
    if (!departDay || !returnDay || !day) return false
    return day > departDay && day < returnDay
  }

  const isDepart = (day) => day === departDay
  const isReturn = (day) => day === returnDay

  const getDayStyle = (day) => {
    if (!day) return 'opacity-0'
    if (isDepart(day) || isReturn(day)) return 'bg-[#132968]'
    if (isInRange(day)) return 'bg-[#e9f3ff]'
    return ''
  }

  const getDayTextColor = (day) => {
    if (!day) return 'text-transparent'
    if (isDepart(day) || isReturn(day)) return 'text-white'
    return 'text-black'
  }

  return (
    <div className="relative w-full min-h-svh bg-white pb-[56px]">
      <StatusBar />

      <div className="absolute bg-[#132968] left-0 right-0 top-[53px] h-[60px] flex flex-col justify-center px-[20px]">
        <p className="text-white text-[16px] font-semibold">어디로 정하시겠습니까, 가영?</p>
        <p className="text-[#f1f2f6] text-[12px]">기차 · 버스 · 항공을 한눈에</p>
      </div>

      <div className="mt-[113px] px-[16px] pb-[24px] flex flex-col gap-[24px]">
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

          <div className="flex gap-[10px]">
            <div className="bg-[#f1f2f6] h-[48px] rounded-[8px] flex items-center px-[10px] flex-1">
              <img src={imgCalendar} className="size-[24px] mr-[4px]" alt="" />
              <span className="text-[#6f7584] text-[14px] font-semibold">
                {departDay ? `6월 ${departDay}일` : '출발일'}
              </span>
            </div>
            <div className="bg-[#f1f2f6] h-[48px] rounded-[8px] flex items-center justify-between px-[10px] flex-1">
              <div className="flex items-center gap-[4px]">
                <img src={imgCalendar} className="size-[24px]" alt="" />
                <span className="text-[#6f7584] text-[14px] font-semibold">
                  {returnDay ? `6월 ${returnDay}일` : '도착일'}
                </span>
              </div>
              <img src={imgClose} className="size-[24px]" alt="" />
            </div>
          </div>

          <div className="border border-[#d5d5d5] h-[48px] rounded-[8px] flex items-center justify-between px-[30px]">
            <div className="flex flex-col gap-[4px]">
              <span className="text-[#132968] text-[14px] font-semibold">날짜 유연하게 보기</span>
              <span className="text-[#6f7584] text-[12px]">날짜별 최저가 달력으로 탐색</span>
            </div>
            <button
              onClick={() => { setFlexDate(!flexDate); if (!flexDate) navigate('/flexible') }}
              className={`h-[34px] w-[66px] rounded-full flex items-center px-[1px] transition-all ${flexDate ? 'bg-[#fa6b6b] justify-end' : 'bg-[#d9d9d9] justify-start'}`}
            >
              <div className="size-[32px] rounded-full bg-white shadow" />
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="bg-[#fff7ec] border-2 border-[#d5d5d5] border-b-0 rounded-tl-[8px] rounded-tr-[8px] h-[48px] flex items-center px-[30px]">
            <img src={imgCalendar2} className="size-[24px] mr-[4px]" alt="" />
            <div className="flex flex-col">
              <span className="text-[#d5d5d5] text-[12px]">가는 날</span>
              <span className="text-[#fa6b6b] text-[14px] font-semibold">
                {departDay ? `6월 ${departDay}일 선택됨` : '6월 15일 (일) 선택 중...'}
              </span>
            </div>
          </div>

          <div className="border-2 border-[#d5d5d5] bg-white px-[17px] py-[20px]">
            <div className="flex items-center justify-between px-[12px] mb-[12px]">
              <span className="text-[#132968] text-[16px] font-semibold">2026년 6월</span>
              <div className="flex">
                <button className="size-[48px] flex items-center justify-center">
                  <img src={imgChevBwd} className="size-[24px]" alt="" />
                </button>
                <button className="size-[48px] flex items-center justify-center">
                  <img src={imgChevFwd} className="size-[24px]" alt="" />
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
                  <button
                    key={di}
                    onClick={() => handleDayClick(day)}
                    className={`flex-1 flex items-center justify-center size-[48px] p-[4px]`}
                  >
                    <div className={`size-[41px] rounded-full flex items-center justify-center relative ${getDayStyle(day)}`}>
                      <span className={`text-[10px] font-semibold z-10 ${getDayTextColor(day)}`}>{day || ''}</span>
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>

          <div className="bg-[#f1f2f6] border-2 border-[#d5d5d5] border-t-0 rounded-bl-[8px] rounded-br-[8px] h-[48px] flex items-center justify-between px-[30px]">
            <div className="flex items-center gap-[4px]">
              <img src={imgCalendar} className="size-[24px]" alt="" />
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
        </div>

        <div className="bg-[#f1f2f6] h-[48px] rounded-[8px] flex items-center justify-between px-[30px]">
          <div className="flex items-center gap-[4px]">
            <img src={imgPerson} className="size-[24px]" alt="" />
            <span className="text-[#132968] text-[14px] font-semibold">1 성인</span>
          </div>
          <div className="flex items-center">
            <button className="size-[48px] flex items-center justify-center">
              <img src={imgMinus} className="size-[24px]" alt="-" />
            </button>
            <span className="text-[14px] font-semibold">1</span>
            <button className="size-[48px] flex items-center justify-center">
              <img src={imgPlus} className="size-[24px]" alt="+" />
            </button>
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
