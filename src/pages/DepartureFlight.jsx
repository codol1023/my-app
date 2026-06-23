import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import Icon from '../components/Icon'

const FLIGHTS_BY_DATE = {
  13: [
    { id: 1, dep: '07:10', arr: '09:00', airline: 'Vueling',    price: 110000, tags: ['직항', '최저가'] },
    { id: 2, dep: '11:30', arr: '13:20', airline: 'Iberia',     price: 128000, tags: ['직항'] },
    { id: 3, dep: '15:45', arr: '17:35', airline: 'Air France', price: 135000, tags: ['직항'] },
  ],
  14: [
    { id: 1, dep: '06:50', arr: '08:40', airline: 'Vueling',    price: 118000, tags: ['직항', '최저가'] },
    { id: 2, dep: '10:20', arr: '12:10', airline: 'Iberia',     price: 132000, tags: ['직항'] },
    { id: 3, dep: '14:40', arr: '16:30', airline: 'Air France', price: 145000, tags: ['직항'] },
  ],
  15: [
    { id: 1, dep: '06:15', arr: '08:05', airline: 'Vueling',    price: 65000,  tags: ['직항', '최저가'] },
    { id: 2, dep: '10:30', arr: '12:20', airline: 'Iberia',     price: 79000,  tags: ['직항'] },
    { id: 3, dep: '14:45', arr: '16:35', airline: 'Air France', price: 65000,  tags: ['직항'] },
  ],
  16: [
    { id: 1, dep: '06:30', arr: '08:20', airline: 'Vueling',    price: 98000,  tags: ['직항', '최저가'] },
    { id: 2, dep: '11:00', arr: '12:50', airline: 'Iberia',     price: 112000, tags: ['직항'] },
    { id: 3, dep: '15:20', arr: '17:10', airline: 'Air France', price: 125000, tags: ['직항'] },
  ],
  17: [
    { id: 1, dep: '07:00', arr: '08:50', airline: 'Vueling',    price: 94000,  tags: ['직항', '최저가'] },
    { id: 2, dep: '10:45', arr: '12:35', airline: 'Iberia',     price: 108000, tags: ['직항'] },
    { id: 3, dep: '15:00', arr: '16:50', airline: 'Air France', price: 120000, tags: ['직항'] },
  ],
  18: [
    { id: 1, dep: '06:45', arr: '08:35', airline: 'Vueling',    price: 89000,  tags: ['직항', '최저가'] },
    { id: 2, dep: '10:15', arr: '12:05', airline: 'Iberia',     price: 103000, tags: ['직항'] },
    { id: 3, dep: '14:30', arr: '16:20', airline: 'Air France', price: 115000, tags: ['직항'] },
  ],
  19: [
    { id: 1, dep: '07:20', arr: '09:10', airline: 'Vueling',    price: 107000, tags: ['직항', '최저가'] },
    { id: 2, dep: '11:40', arr: '13:30', airline: 'Iberia',     price: 122000, tags: ['직항'] },
    { id: 3, dep: '15:55', arr: '17:45', airline: 'Air France', price: 138000, tags: ['직항'] },
  ],
  20: [
    { id: 1, dep: '08:00', arr: '09:50', airline: 'Vueling',    price: 155000, tags: ['직항', '최저가'] },
    { id: 2, dep: '12:10', arr: '14:00', airline: 'Iberia',     price: 178000, tags: ['직항'] },
    { id: 3, dep: '16:30', arr: '18:20', airline: 'Air France', price: 195000, tags: ['직항'] },
  ],
  21: [
    { id: 1, dep: '08:30', arr: '10:20', airline: 'Vueling',    price: 172000, tags: ['직항', '최저가'] },
    { id: 2, dep: '12:50', arr: '14:40', airline: 'Iberia',     price: 198000, tags: ['직항'] },
    { id: 3, dep: '17:00', arr: '18:50', airline: 'Air France', price: 215000, tags: ['직항'] },
  ],
  22: [
    { id: 1, dep: '07:05', arr: '08:55', airline: 'Vueling',    price: 128000, tags: ['직항', '최저가'] },
    { id: 2, dep: '11:20', arr: '13:10', airline: 'Iberia',     price: 145000, tags: ['직항'] },
    { id: 3, dep: '15:35', arr: '17:25', airline: 'Air France', price: 158000, tags: ['직항'] },
  ],
  23: [
    { id: 1, dep: '06:55', arr: '08:45', airline: 'Vueling',    price: 112000, tags: ['직항', '최저가'] },
    { id: 2, dep: '11:10', arr: '13:00', airline: 'Iberia',     price: 130000, tags: ['직항'] },
    { id: 3, dep: '15:25', arr: '17:15', airline: 'Air France', price: 142000, tags: ['직항'] },
  ],
}

const TAG_STYLES = {
  '직항':   'bg-[#e6f5e8] text-[#008026]',
  '최저가': 'bg-[#fff4c2] text-[#c24c00]',
}

export default function DepartureFlight() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const date = parseInt(searchParams.get('date') ?? '15', 10)
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('전체')
  const filters = ['전체', '직항만', '오전 출발', '가격순']
  const flights = FLIGHTS_BY_DATE[date] ?? FLIGHTS_BY_DATE[15]

  return (
    <div className="relative w-full min-h-svh bg-white">
      <StatusBar />

      <div className="absolute bg-[#132968] left-0 right-0 top-[53px] h-[60px] flex items-center justify-between px-[16px]">
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

      <div className="mt-[113px] px-[16px] pb-[100px] flex flex-col gap-[10px]">
        <div className="bg-[#132968] border border-[#d5d5d5] h-[50px] rounded-[8px] flex items-center justify-between px-[16px]">
          <div>
            <p className="text-white text-[16px] font-semibold">항공 출발편</p>
            <p className="text-[#6b7281] text-[14px]">6월 {date}일 · 파리 → 바르셀로나</p>
          </div>
          <div className="bg-[#3a4a67] h-[20px] px-[12px] rounded-[4px] flex items-center">
            <span className="text-white text-[10px] font-semibold">{flights.length}편</span>
          </div>
        </div>

        <div className="flex gap-[10px] overflow-x-auto py-[10px]">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`h-[28px] px-[12px] rounded-full whitespace-nowrap flex-shrink-0 text-[12px] font-medium
                ${filter === f ? 'bg-[#132968] text-white' : 'border border-[#e5e7ee] text-[#6b7281]'}`}>
              {f}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-[24px]">
          {flights.map((f) => (
            <button key={f.id} onClick={() => setSelected(f.id)}
              className={`bg-white border-2 rounded-[8px] py-[12px] flex flex-col gap-[8px] w-full transition-colors
                ${selected === f.id ? 'border-[#fa6b6b]' : 'border-[#ccc]'}`}>
              <div className="flex items-center justify-between px-[20px]">
                <div className="flex items-center gap-[8px]">
                  <div className="flex items-center gap-[4px]">
                    <span className="text-[16px] font-semibold text-black">{f.dep}</span>
                    <Icon name="arrow_forward" size={20} color="#132968" />
                    <span className="text-[16px] font-semibold text-black">{f.arr}</span>
                  </div>
                  <div className="bg-[#f2f3f5] h-[28px] px-[12px] rounded-[4px] flex items-center">
                    <span className="text-[#6b7281] text-[12px] font-medium">1h 50m</span>
                  </div>
                </div>
                <span className="text-[#ff5553] text-[16px] font-semibold">₩{f.price.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between px-[20px]">
                <span className="text-[#7d8391] text-[14px] font-semibold">{f.airline}</span>
                <div className="flex gap-[8px]">
                  {f.tags.map((tag) => (
                    <div key={tag} className={`h-[28px] px-[12px] rounded-[4px] flex items-center ${TAG_STYLES[tag]}`}>
                      <span className="text-[12px] font-medium">{tag}</span>
                    </div>
                  ))}
                  {selected === f.id && (
                    <div className="h-[28px] px-[12px] rounded-[4px] flex items-center bg-black">
                      <span className="text-[12px] font-medium text-white">선택됨</span>
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-[16px] pb-[16px] pt-[8px] bg-white">
        <button onClick={() => selected && navigate('/return')}
          className={`h-[48px] rounded-[8px] flex items-center justify-center w-full transition-colors ${selected ? 'bg-[#fa6b6b]' : 'bg-[#ccc]'}`}>
          <span className="text-white text-[14px] font-medium">
            {selected ? '이 편으로 출발 선택' : '편을 선택해주세요'}
          </span>
        </button>
      </div>
    </div>
  )
}
