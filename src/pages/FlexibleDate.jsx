import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'

const imgBack = "/assets/f4409b2a-af79-40c8-b4f3-71ca698148b1.png"
const imgChevFwd = "/assets/c8273399-f323-4c54-844d-c0fb0d74ad81.png"
const imgChevBwd = "/assets/0b5df898-c22e-4b20-b178-2a30cc1e7fb1.png"
const imgCheck = "/assets/0b1e00da-1b6c-456c-b81f-500c0ec44ee9.png"
const imgCheck2 = "/assets/e2ce479b-570e-42ef-9e24-ba335cd06060.png"
const imgUnfold = "/assets/de8e5d89-121f-41a6-9297-d75eed20aadc.png"

const DAYS = ['일', '월', '화', '수', '목', '금', '토']

const JUNE_PRICES = {
  1: 89000, 2: 95000, 3: 102000, 4: 115000, 5: 120000, 6: 130000,
  7: 118000, 8: 98000, 9: 94000, 10: 89000, 11: 107000, 12: 91000, 13: 110000,
  14: 118000, 15: 79000, 16: 98000, 17: 94000, 18: 89000, 19: 107000, 20: 155000,
  21: 172000, 22: 128000, 23: 112000, 24: 105000, 25: 162000, 26: 168000, 27: 180000,
  28: 110000, 29: 110000, 30: 105000,
}

const JUNE_WEEKS = [
  [null, 1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12, 13],
  [14, 15, 16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25, 26, 27],
  [28, 29, 30, null, null, null, null],
]

const getPriceColor = (price) => {
  if (!price) return ''
  if (price <= 100000) return 'text-[#008026]'
  if (price <= 130000) return 'text-[#c24c00]'
  return 'text-[#fd3235]'
}

export default function FlexibleDate() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const [step, setStep] = useState(1)

  const formatPrice = (p) => p ? `₩${Math.round(p / 1000)}` : ''

  const handleSelect = (day) => {
    if (!day) return
    setSelected(day)
    if (step === 1) setStep(2)
  }

  return (
    <div className="relative w-full min-h-svh bg-white pb-[56px]">
      <StatusBar />

      <div className="absolute bg-[#132968] left-0 right-0 top-[53px] h-[60px] flex items-center px-[16px] gap-[8px]">
        <button onClick={() => navigate(-1)} className="size-[48px] flex items-center justify-center">
          <img src={imgBack} className="size-[24px]" alt="뒤로" />
        </button>
        <div>
          <p className="text-white text-[16px] font-semibold">유연한 날짜 탐색</p>
          <p className="text-[#f1f2f6] text-[12px]">날짜별 최저가를 확인하세요</p>
        </div>
      </div>

      <div className="mt-[113px] px-[16px] flex flex-col gap-[20px]">
        {step === 2 && selected && (
          <div className="bg-[#e6f5e8] border border-[#57f3a7] rounded-[8px] h-[48px] flex items-center justify-between px-[20px]">
            <div className="flex items-center gap-[8px]">
              <img src={imgCheck} className="size-[24px]" alt="" />
              <div>
                <p className="text-[#008026] text-[14px] font-semibold">가는 날 선택 완료</p>
                <p className="text-[#00e275] text-[12px]">6월 {selected}일</p>
              </div>
            </div>
            <button onClick={() => { setSelected(null); setStep(1) }}
              className="border border-[#bfd6ee] rounded-[4px] h-[20px] px-[10px] flex items-center">
              <span className="text-[#006eb5] text-[10px] font-semibold">변경</span>
            </button>
          </div>
        )}

        <div className="border-2 border-[#132968] rounded-[8px] overflow-hidden">
          <div className="bg-[#132968] flex items-center justify-between px-[12px] py-[10px]">
            <p className="text-white text-[16px] font-semibold">
              {step === 1 ? '가는 날 선택' : '오는 날 선택'}
            </p>
            <div className="bg-[#3a4a67] rounded-[4px] h-[28px] px-[12px] flex items-center gap-[4px]">
              <span className="text-white text-[12px] font-medium">자동 오픈</span>
              <img src={imgUnfold} className="size-[20px]" alt="" />
            </div>
          </div>

          <div className="bg-white px-[12px] py-[16px]">
            <div className="flex items-center justify-between mb-[12px]">
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
                <div key={d} className="flex-1 flex items-center justify-center h-[32px]">
                  <span className={`text-[10px] font-semibold ${i === 0 ? 'text-[#fa6b6b]' : 'text-[#6b7281]'}`}>{d}</span>
                </div>
              ))}
            </div>

            {JUNE_WEEKS.map((week, wi) => (
              <div key={wi} className="flex">
                {week.map((day, di) => {
                  const price = JUNE_PRICES[day]
                  const isSelected = day === selected
                  const isDepart = step === 2 && day === 15
                  return (
                    <button
                      key={di}
                      onClick={() => handleSelect(day)}
                      className="flex-1 flex flex-col items-center justify-center py-[4px] rounded-[8px]"
                      style={{ opacity: day ? 1 : 0 }}
                    >
                      <div className={`size-[34px] rounded-full flex items-center justify-center mb-[2px]
                        ${isSelected ? 'bg-[#132968]' : isDepart ? 'bg-[#fa6b6b]' : ''}`}>
                        <span className={`text-[12px] font-semibold ${isSelected || isDepart ? 'text-white' : 'text-[#132968]'}`}>
                          {day || ''}
                        </span>
                      </div>
                      {price && (
                        <span className={`text-[9px] font-normal ${getPriceColor(price)}`}>
                          {formatPrice(price)}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate('/compare')}
          className={`h-[48px] rounded-[8px] flex items-center justify-center w-full ${selected ? 'bg-[#fa6b6b]' : 'bg-[#ccc]'}`}
        >
          <span className="text-white text-[14px] font-medium">
            {selected ? `${selected}일로 날짜 보기` : '날짜를 선택해주세요'}
          </span>
        </button>
      </div>

      <BottomNav />
    </div>
  )
}
