import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import Icon from '../components/Icon'
import { useState } from 'react'
import StatusBar from '../components/StatusBar'





// 날짜별 기차편 데이터 (최저가 = Compare의 train.price와 일치)
const TRAIN_BY_DATE = {
  13: [
    { id: 1, dep: '06:43', arr: '13:08', company: 'Renfe AVE', price: 138000, tags: ['직항', '최저가'] },
    { id: 2, dep: '09:25', arr: '15:50', company: 'TGV Lyria', price: 155000, tags: ['직항'] },
    { id: 3, dep: '13:10', arr: '19:35', company: 'Renfe AVE', price: 162000, tags: ['직항'] },
  ],
  14: [
    { id: 1, dep: '07:00', arr: '13:25', company: 'Renfe AVE', price: 145000, tags: ['직항', '최저가'] },
    { id: 2, dep: '10:30', arr: '16:55', company: 'TGV Lyria', price: 162000, tags: ['직항'] },
    { id: 3, dep: '14:15', arr: '20:40', company: 'Renfe AVE', price: 170000, tags: ['직항'] },
  ],
  15: [
    { id: 1, dep: '06:43', arr: '13:08', company: 'Renfe AVE', price: 89000,  tags: ['직항', '최저가'] },
    { id: 2, dep: '09:25', arr: '15:50', company: 'Renfe AVE', price: 103000, tags: ['직항'] },
    { id: 3, dep: '12:10', arr: '18:35', company: 'TGV Lyria', price: 115000, tags: ['직항'] },
    { id: 4, dep: '15:00', arr: '21:25', company: 'Renfe AVE', price: 98000,  tags: ['직항'] },
  ],
  16: [
    { id: 1, dep: '07:20', arr: '13:45', company: 'Renfe AVE', price: 120000, tags: ['직항', '최저가'] },
    { id: 2, dep: '10:50', arr: '17:15', company: 'TGV Lyria', price: 135000, tags: ['직항'] },
    { id: 3, dep: '14:30', arr: '20:55', company: 'Renfe AVE', price: 142000, tags: ['직항'] },
  ],
  17: [
    { id: 1, dep: '07:05', arr: '13:30', company: 'Renfe AVE', price: 115000, tags: ['직항', '최저가'] },
    { id: 2, dep: '10:35', arr: '17:00', company: 'TGV Lyria', price: 128000, tags: ['직항'] },
    { id: 3, dep: '14:20', arr: '20:45', company: 'Renfe AVE', price: 138000, tags: ['직항'] },
  ],
  18: [
    { id: 1, dep: '06:55', arr: '13:20', company: 'Renfe AVE', price: 108000, tags: ['직항', '최저가'] },
    { id: 2, dep: '10:25', arr: '16:50', company: 'TGV Lyria', price: 122000, tags: ['직항'] },
    { id: 3, dep: '14:10', arr: '20:35', company: 'Renfe AVE', price: 130000, tags: ['직항'] },
  ],
  19: [
    { id: 1, dep: '07:30', arr: '13:55', company: 'Renfe AVE', price: 130000, tags: ['직항', '최저가'] },
    { id: 2, dep: '11:00', arr: '17:25', company: 'TGV Lyria', price: 145000, tags: ['직항'] },
    { id: 3, dep: '15:40', arr: '22:05', company: 'Renfe AVE', price: 155000, tags: ['직항'] },
  ],
  20: [
    { id: 1, dep: '08:10', arr: '14:35', company: 'Renfe AVE', price: 182000, tags: ['직항', '최저가'] },
    { id: 2, dep: '12:40', arr: '19:05', company: 'TGV Lyria', price: 205000, tags: ['직항'] },
    { id: 3, dep: '16:50', arr: '23:15', company: 'Renfe AVE', price: 218000, tags: ['직항'] },
  ],
  21: [
    { id: 1, dep: '08:40', arr: '15:05', company: 'Renfe AVE', price: 198000, tags: ['직항', '최저가'] },
    { id: 2, dep: '13:10', arr: '19:35', company: 'TGV Lyria', price: 222000, tags: ['직항'] },
    { id: 3, dep: '17:20', arr: '23:45', company: 'Renfe AVE', price: 235000, tags: ['직항'] },
  ],
  22: [
    { id: 1, dep: '07:15', arr: '13:40', company: 'Renfe AVE', price: 152000, tags: ['직항', '최저가'] },
    { id: 2, dep: '11:45', arr: '18:10', company: 'TGV Lyria', price: 168000, tags: ['직항'] },
    { id: 3, dep: '15:55', arr: '22:20', company: 'Renfe AVE', price: 178000, tags: ['직항'] },
  ],
  23: [
    { id: 1, dep: '07:00', arr: '13:25', company: 'Renfe AVE', price: 138000, tags: ['직항', '최저가'] },
    { id: 2, dep: '11:30', arr: '17:55', company: 'TGV Lyria', price: 152000, tags: ['직항'] },
    { id: 3, dep: '15:45', arr: '22:10', company: 'Renfe AVE', price: 162000, tags: ['직항'] },
  ],
}

// 날짜별 버스편 데이터 (최저가 = Compare의 bus.price와 일치)
const BUS_BY_DATE = {
  13: [
    { id: 1, dep: '07:00', arr: '21:50', company: 'FlixBus',   price: 58000, tags: ['직항', '최저가'] },
    { id: 2, dep: '09:30', arr: '00:20+1', company: 'BlaBlaBus', price: 68000, tags: ['직항'] },
    { id: 3, dep: '13:00', arr: '03:50+1', company: 'Ouibus',   price: 62000, tags: ['직항'] },
  ],
  14: [
    { id: 1, dep: '07:30', arr: '22:20', company: 'FlixBus',   price: 62000, tags: ['직항', '최저가'] },
    { id: 2, dep: '10:00', arr: '00:50+1', company: 'BlaBlaBus', price: 72000, tags: ['직항'] },
    { id: 3, dep: '14:00', arr: '04:50+1', company: 'Ouibus',  price: 66000, tags: ['직항'] },
  ],
  15: [
    { id: 1, dep: '07:00', arr: '21:50', company: 'FlixBus',   price: 35000, tags: ['직항', '최저가'] },
    { id: 2, dep: '08:30', arr: '23:20', company: 'BlaBlaBus', price: 42000, tags: ['직항'] },
    { id: 3, dep: '10:00', arr: '00:50+1', company: 'Ouibus',  price: 38000, tags: ['직항'] },
    { id: 4, dep: '14:00', arr: '04:50+1', company: 'FlixBus', price: 29000, tags: ['직항'] },
  ],
  16: [
    { id: 1, dep: '07:15', arr: '22:05', company: 'FlixBus',   price: 52000, tags: ['직항', '최저가'] },
    { id: 2, dep: '09:45', arr: '00:35+1', company: 'BlaBlaBus', price: 62000, tags: ['직항'] },
    { id: 3, dep: '13:30', arr: '04:20+1', company: 'Ouibus',  price: 56000, tags: ['직항'] },
  ],
  17: [
    { id: 1, dep: '07:00', arr: '21:50', company: 'FlixBus',   price: 48000, tags: ['직항', '최저가'] },
    { id: 2, dep: '09:30', arr: '00:20+1', company: 'BlaBlaBus', price: 58000, tags: ['직항'] },
    { id: 3, dep: '13:00', arr: '03:50+1', company: 'Ouibus',  price: 52000, tags: ['직항'] },
  ],
  18: [
    { id: 1, dep: '07:00', arr: '21:50', company: 'FlixBus',   price: 43000, tags: ['직항', '최저가'] },
    { id: 2, dep: '09:30', arr: '00:20+1', company: 'BlaBlaBus', price: 52000, tags: ['직항'] },
    { id: 3, dep: '13:00', arr: '03:50+1', company: 'Ouibus',  price: 47000, tags: ['직항'] },
  ],
  19: [
    { id: 1, dep: '07:30', arr: '22:20', company: 'FlixBus',   price: 55000, tags: ['직항', '최저가'] },
    { id: 2, dep: '10:00', arr: '00:50+1', company: 'BlaBlaBus', price: 65000, tags: ['직항'] },
    { id: 3, dep: '14:00', arr: '04:50+1', company: 'Ouibus',  price: 59000, tags: ['직항'] },
  ],
  20: [
    { id: 1, dep: '08:00', arr: '22:50', company: 'FlixBus',   price: 88000, tags: ['직항', '최저가'] },
    { id: 2, dep: '11:30', arr: '02:20+1', company: 'BlaBlaBus', price: 98000, tags: ['직항'] },
    { id: 3, dep: '15:00', arr: '05:50+1', company: 'Ouibus',  price: 92000, tags: ['직항'] },
  ],
  21: [
    { id: 1, dep: '08:30', arr: '23:20', company: 'FlixBus',   price: 95000, tags: ['직항', '최저가'] },
    { id: 2, dep: '12:00', arr: '02:50+1', company: 'BlaBlaBus', price: 108000, tags: ['직항'] },
    { id: 3, dep: '16:00', arr: '06:50+1', company: 'Ouibus',  price: 102000, tags: ['직항'] },
  ],
  22: [
    { id: 1, dep: '07:30', arr: '22:20', company: 'FlixBus',   price: 68000, tags: ['직항', '최저가'] },
    { id: 2, dep: '10:00', arr: '00:50+1', company: 'BlaBlaBus', price: 78000, tags: ['직항'] },
    { id: 3, dep: '14:00', arr: '04:50+1', company: 'Ouibus',  price: 72000, tags: ['직항'] },
  ],
  23: [
    { id: 1, dep: '07:00', arr: '21:50', company: 'FlixBus',   price: 59000, tags: ['직항', '최저가'] },
    { id: 2, dep: '09:30', arr: '00:20+1', company: 'BlaBlaBus', price: 69000, tags: ['직항'] },
    { id: 3, dep: '13:00', arr: '03:50+1', company: 'Ouibus',  price: 63000, tags: ['직항'] },
  ],
}

const TAG_STYLES = {
  '직항':     'bg-[#e6f5e8] text-[#008026]',
  '최저가':   'bg-[#fff4c2] text-[#c24c00]',
  '가장 빠름': 'bg-[#e6f5e8] text-[#008026]',
}

export default function DepartureTrainBus() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const isBus = location.pathname === '/departure-bus'
  const date = parseInt(searchParams.get('date') ?? '15', 10)

  const options = isBus
    ? (BUS_BY_DATE[date] ?? BUS_BY_DATE[15])
    : (TRAIN_BY_DATE[date] ?? TRAIN_BY_DATE[15])

  const label = isBus ? '버스 출발편' : '기차 출발편'
  const dateLabel = `6월 ${date}일 · 파리 → 바르셀로나`

  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('전체')
  const filters = ['전체', '직항만', '오전 출발', '가격순']

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
        <div className="bg-[#132968] border border-[#d5d5d5] h-[50px] rounded-[8px] flex items-center justify-between px-[30px]">
          <div>
            <p className="text-white text-[16px] font-semibold">{label}</p>
            <p className="text-[#6b7281] text-[14px]">{dateLabel}</p>
          </div>
          <div className="bg-[#3a4a67] h-[20px] px-[12px] rounded-[4px] flex items-center">
            <span className="text-white text-[10px] font-semibold">{options.length}편</span>
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
          {options.map((o) => (
            <button key={o.id} onClick={() => setSelected(o.id)}
              className={`bg-white border-2 rounded-[8px] py-[12px] flex flex-col gap-[8px] w-full transition-colors
                ${selected === o.id ? 'border-[#fa6b6b]' : 'border-[#ccc]'}`}>
              <div className="flex items-center justify-between px-[20px]">
                <div className="flex items-center gap-[8px]">
                  <div className="flex items-center gap-[4px]">
                    <span className="text-[16px] font-semibold text-black">{o.dep}</span>
                    <Icon name="arrow_forward" size={20} color="#132968" />
                    <span className="text-[16px] font-semibold text-black">{o.arr}</span>
                  </div>
                  <div className="bg-[#f2f3f5] h-[28px] px-[12px] rounded-[4px] flex items-center">
                    <span className="text-[#6b7281] text-[12px] font-medium">
                      {isBus ? '14h 50m' : '6h 25m'}
                    </span>
                  </div>
                </div>
                <span className="text-[#ff5553] text-[16px] font-semibold">₩{o.price.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between px-[20px]">
                <span className="text-[#7d8391] text-[14px] font-semibold">{o.company}</span>
                <div className="flex gap-[8px]">
                  {o.tags.map((tag) => (
                    <div key={tag} className={`h-[28px] px-[12px] rounded-[4px] flex items-center ${TAG_STYLES[tag]}`}>
                      <span className="text-[12px] font-medium">{tag}</span>
                    </div>
                  ))}
                  {selected === o.id && (
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
          className={`h-[48px] rounded-[8px] flex items-center justify-center w-full transition-colors
            ${selected ? 'bg-[#fa6b6b]' : 'bg-[#ccc]'}`}>
          <span className="text-white text-[14px] font-medium">
            {selected ? '이 편으로 출발 선택' : '편을 선택해주세요'}
          </span>
        </button>
      </div>
    </div>
  )
}
