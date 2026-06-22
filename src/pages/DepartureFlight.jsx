import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import StatusBar from '../components/StatusBar'

const imgBack = "/assets/742a60c5-4905-4d96-b93b-83c13794dbfd.png"
const imgShare = "/assets/fbc6d178-7d9a-427b-af4f-36457ef79fae.png"
const imgArrow = "/assets/5508c0d6-9325-4cc0-a5b6-5af21a64710d.png"
const imgChevFwd = "/assets/70129f0e-45a3-4d8d-8628-62de71e52f95.png"

const FLIGHTS = [
  { id: 1, dep: '06:15', arr: '08:05', airline: 'Vueling', price: 65000, tags: ['직항', '최저가'] },
  { id: 2, dep: '10:30', arr: '12:20', airline: 'Iberia', price: 79000, tags: ['직항', '선택됨'] },
  { id: 3, dep: '14:45', arr: '16:35', airline: 'Air France', price: 65000, tags: ['직항'] },
]

const TAG_STYLES = {
  '직항': 'bg-[#e6f5e8] text-[#008026]',
  '최저가': 'bg-[#fff4c2] text-[#c24c00]',
  '소요시간': 'bg-[#f2f3f5] text-[#6b7281]',
  '선택됨': 'bg-black text-white',
}

export default function DepartureFlight() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(2)
  const [filter, setFilter] = useState('전체')
  const filters = ['전체', '직항만', '오전 출발', '가격순']

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

      <div className="mt-[113px] px-[16px] pb-[100px] flex flex-col gap-[10px]">
        <div className="bg-[#132968] border border-[#d5d5d5] h-[50px] rounded-[8px] flex items-center justify-between px-[30px]">
          <div>
            <p className="text-white text-[16px] font-semibold">항공 출발편</p>
            <p className="text-[#6b7281] text-[14px]">6월 15일 (일) · 파리 → 바르셀로나</p>
          </div>
          <div className="bg-[#3a4a67] h-[20px] px-[12px] rounded-[4px] flex items-center">
            <span className="text-white text-[10px] font-semibold">12편</span>
          </div>
        </div>

        <div className="flex gap-[10px] overflow-x-auto py-[10px]">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`h-[28px] px-[12px] rounded-full whitespace-nowrap flex-shrink-0 text-[12px] font-medium
                ${filter === f ? 'bg-[#132968] text-white' : 'border border-[#e5e7ee] text-[#6b7281]'}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-[24px]">
          {FLIGHTS.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelected(f.id)}
              className={`bg-white border-2 rounded-[8px] py-[12px] flex flex-col gap-[8px] w-full
                ${selected === f.id ? 'border-[#fa6b6b]' : 'border-[#ccc]'}`}
            >
              <div className="flex items-center justify-between px-[20px]">
                <div className="flex items-center gap-[8px]">
                  <div className="flex items-center gap-[4px]">
                    <span className="text-[16px] font-semibold text-black">{f.dep}</span>
                    <img src={imgArrow} className="size-[20px]" alt="→" />
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
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-[16px] pb-[16px] pt-[8px] bg-white">
        <button
          onClick={() => navigate('/return')}
          className="bg-[#fa6b6b] h-[48px] rounded-[8px] flex items-center justify-center w-full"
        >
          <span className="text-white text-[14px] font-medium">이 편으로 출발 선택</span>
        </button>
      </div>
    </div>
  )
}
