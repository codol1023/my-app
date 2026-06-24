import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import Icon from '../components/Icon'

const PRICE_DATA = {
  전체: {
    '2026-6-1':128,'2026-6-2':175,'2026-6-3':130,'2026-6-4':122,'2026-6-5':119,'2026-6-6':95,
    '2026-6-7':97,'2026-6-8':160,'2026-6-9':115,'2026-6-10':99,'2026-6-11':92,'2026-6-12':91,'2026-6-13':110,
    '2026-6-14':118,'2026-6-15':79,'2026-6-16':98,'2026-6-17':94,'2026-6-18':89,'2026-6-19':107,'2026-6-20':155,
    '2026-6-21':172,'2026-6-22':128,'2026-6-23':112,'2026-6-24':109,'2026-6-25':162,'2026-6-26':169,
    '2026-7-1':115,'2026-7-2':132,'2026-7-3':148,'2026-7-4':99,'2026-7-5':88,'2026-7-6':104,
    '2026-7-7':121,'2026-7-8':135,'2026-7-9':101,'2026-7-10':96,'2026-7-11':143,'2026-7-12':158,
    '2026-7-15':89,'2026-7-16':94,'2026-7-17':110,'2026-7-29':84,'2026-7-30':92,'2026-7-31':109,
  },
  항공: {
    '2026-6-1':145,'2026-6-2':198,'2026-6-3':155,'2026-6-4':139,'2026-6-5':132,'2026-6-6':109,
    '2026-6-7':112,'2026-6-8':182,'2026-6-9':128,'2026-6-10':118,'2026-6-11':105,'2026-6-12':108,'2026-6-13':125,
    '2026-6-14':135,'2026-6-15':89,'2026-6-16':115,'2026-6-17':110,'2026-6-18':102,'2026-6-19':124,'2026-6-20':177,
    '2026-6-21':195,'2026-6-22':145,'2026-6-23':130,'2026-6-24':122,'2026-6-25':185,'2026-6-26':192,
  },
  기차: {
    '2026-6-1':89,'2026-6-2':102,'2026-6-3':95,'2026-6-4':88,'2026-6-5':82,'2026-6-6':71,
    '2026-6-7':74,'2026-6-8':110,'2026-6-9':85,'2026-6-10':79,'2026-6-11':68,'2026-6-12':72,'2026-6-13':88,
    '2026-6-14':92,'2026-6-15':55,'2026-6-16':78,'2026-6-17':71,'2026-6-18':62,'2026-6-19':85,'2026-6-20':118,
    '2026-6-21':132,'2026-6-22':94,'2026-6-23':82,'2026-6-24':78,'2026-6-25':115,'2026-6-26':122,
  },
  버스: {
    '2026-6-1':62,'2026-6-2':78,'2026-6-3':69,'2026-6-4':58,'2026-6-5':54,'2026-6-6':45,
    '2026-6-7':48,'2026-6-8':82,'2026-6-9':61,'2026-6-10':55,'2026-6-11':44,'2026-6-12':48,'2026-6-13':65,
    '2026-6-14':68,'2026-6-15':35,'2026-6-16':52,'2026-6-17':47,'2026-6-18':41,'2026-6-19':59,'2026-6-20':88,
    '2026-6-21':95,'2026-6-22':67,'2026-6-23':55,'2026-6-24':51,'2026-6-25':82,'2026-6-26':89,
  }
}

function priceClass(p) {
  if (p === undefined) return ''
  if (p <= 95) return 'cheap'
  if (p <= 140) return 'normal'
  return 'expensive'
}
function bgColor(cls) {
  if (cls === 'cheap') return '#e8f0ea'
  if (cls === 'normal') return '#f0ece8'
  if (cls === 'expensive') return '#fde8e8'
  return '#f5f5f5'
}
function textColor(cls) {
  if (cls === 'cheap') return '#008026'
  if (cls === 'normal') return '#c24c00'
  if (cls === 'expensive') return '#fd3235'
  return '#6b7281'
}
function daysInMonth(y, m) { return new Date(y, m, 0).getDate() }
function firstDayOfWeek(y, m) { return new Date(y, m - 1, 1).getDay() }
function lowestInMonth(y, m, filter) {
  const data = PRICE_DATA[filter]
  let min = Infinity, minDay = null
  for (let d = 1; d <= daysInMonth(y, m); d++) {
    const k = `${y}-${m}-${d}`
    if (data[k] !== undefined && data[k] < min) { min = data[k]; minDay = d }
  }
  if (!minDay) return null
  const dt = new Date(y, m - 1, minDay)
  const days = ['일','월','화','수','목','금','토']
  return `${m}/${minDay}(${days[dt.getDay()]}) ₩${min.toLocaleString()}`
}

const DAYS_KO = ['일','월','화','수','목','금','토']

export default function FlexibleDate() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('전체')
  const [view, setView] = useState('calendar')
  const [year, setYear] = useState(2026)
  const [month, setMonth] = useState(6)
  const [selectedDay, setSelectedDay] = useState(null)

  const data = PRICE_DATA[filter]
  const lowest = lowestInMonth(year, month, filter)

  function changeMonth(dir) {
    let m = month + dir, y = year
    if (m > 12) { m = 1; y++ }
    if (m < 1) { m = 12; y-- }
    setMonth(m); setYear(y); setSelectedDay(null)
  }

  const ctaText = selectedDay
    ? `${month}월 ${selectedDay}일로 교통편 보기`
    : `${month}월 교통편 검색하기`

  const first = firstDayOfWeek(year, month)
  const days = daysInMonth(year, month)
  const cells = []
  for (let i = 0; i < first; i++) cells.push(null)
  for (let d = 1; d <= days; d++) cells.push(d)

  const entries = []
  for (let d = 1; d <= days; d++) {
    const k = `${year}-${month}-${d}`
    if (data[k] !== undefined) entries.push({ d, price: data[k] })
  }
  const maxP = entries.length ? Math.max(...entries.map(e => e.price)) : 1
  const BAR_H = 160

  return (
    <div className="flex flex-col bg-white" style={{ height: '100%' }}>
      <StatusBar />

      {/* ── 고정 헤더 ── */}
      <div className="flex-shrink-0 pt-[53px]">
        <div className="bg-[#132968] h-[60px] flex items-center justify-between px-[16px]">
          <button onClick={() => navigate(-1)} className="cursor-pointer size-[48px] flex items-center justify-center">
            <Icon name="arrow_back_ios_new" size={24} color="white" />
          </button>
          <div className="flex items-center gap-[8px] text-white text-[16px] font-semibold">
            <span>파리</span><span>↔</span><span>바르셀로나</span>
          </div>
          <div className="border border-white rounded-[4px] h-[24px] px-[8px] flex items-center cursor-pointer">
            <span className="text-white text-[12px] font-semibold">수정</span>
          </div>
        </div>

        {/* Filter Tabs — gutter 8 */}
        <div className="bg-white px-[16px] py-[10px] flex gap-[8px] border-b border-[#f0f0f0]">
          {['전체','항공','기차','버스'].map(f => (
            <button key={f} onClick={() => { setFilter(f); setSelectedDay(null) }}
              className={`h-[28px] px-[12px] rounded-full text-[12px] font-medium cursor-pointer
                ${filter === f ? 'bg-[#132968] text-white border border-[#132968]' : 'border border-[#e5e7ee] text-[#6b7281] bg-transparent'}`}>
              {f}
            </button>
          ))}
        </div>

        {/* View Toggle — gutter 8 */}
        <div className="bg-white px-[16px] py-[8px]">
          <div className="h-[48px] bg-[#f2f3f5] rounded-[8px] flex items-center p-[5px] gap-[8px]">
            {['calendar','graph'].map(v => (
              <button key={v} onClick={() => setView(v)}
                className={`cursor-pointer flex-1 h-[38px] rounded-[8px] border border-[#e9eaed] text-[14px]
                  ${view === v ? 'bg-white text-[#132968] font-semibold' : 'bg-transparent text-[#6b7281] font-medium'}`}>
                {v === 'calendar' ? '달력 뷰' : '그래프 뷰'}
              </button>
            ))}
          </div>
        </div>

        {/* Price Info Bar */}
        <div className="mx-[16px] mb-[8px] h-[48px] bg-[#132968] rounded-[8px] flex items-center justify-between px-[20px]">
          <span className="text-[#d9d9d9] text-[14px] font-medium">이번 달 최저가</span>
        <span className="text-white text-[14px] font-bold">{lowest ?? '—'}</span>
      </div>

      </div>{/* end fixed header */}

      {/* ── 스크롤 영역 ── */}
      <div className="flex-1 overflow-y-auto px-[16px] py-[12px] flex flex-col gap-[12px]">

      {/* Calendar View */}
      <div className={`transition-opacity duration-200 ${view === 'calendar' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none absolute'}`}>
        <div className="border border-[#d5d5d5] rounded-[8px] overflow-hidden bg-white">
          <div className="flex items-center justify-between px-[16px] pt-[14px] pb-[4px]">
            <span className="text-[#132968] text-[16px] font-semibold">{year}년 {month}월</span>
            <div className="flex">
              <button onClick={() => changeMonth(-1)} className="size-[48px] flex items-center justify-center">
                <Icon name="chevron_left" size={24} color="#132968" />
              </button>
              <button onClick={() => changeMonth(1)} className="size-[48px] flex items-center justify-center">
                <Icon name="chevron_right" size={24} color="#132968" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 px-[4px] mb-[2px]">
            {DAYS_KO.map((d, i) => (
              <div key={d} className="flex items-center justify-center h-[32px]">
                <span className={`text-[10px] font-semibold ${i === 0 ? 'text-[#fa6b6b]' : 'text-[#6b7281]'}`}>{d}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 px-[4px] pb-[4px]">
            {cells.map((d, i) => {
              if (!d) return <div key={`e-${i}`} className="h-[48px]" />
              const k = `${year}-${month}-${d}`
              const price = data[k]
              const cls = priceClass(price)
              const isSel = d === selectedDay
              return (
                <div key={d} onClick={() => setSelectedDay(d)}
                  className="flex flex-col items-center justify-center h-[48px] cursor-pointer relative">
                  {isSel && (
                    <div className="absolute size-[42px] rounded-full bg-[#132968]" />
                  )}
                  <span className="relative z-10 text-[12px] font-semibold mb-[2px]"
                    style={{ color: isSel ? 'white' : price !== undefined ? textColor(cls) : '#ccc' }}>{d}</span>
                  {price !== undefined && (
                    <span className="relative z-10 text-[10px]"
                      style={{ color: isSel ? 'white' : textColor(cls) }}>₩{price}</span>
                  )}
                </div>
              )
            })}
          </div>

          <div className="flex items-center px-[16px] py-[4px] gap-[12px] relative">
            {[['#008026','저렴'],['#c24c00','보통'],['#fd3235','비쌈'],['#006eb5','무료변경']].map(([c,l]) => (
              <div key={l} className="flex items-center gap-[4px]">
                <div className="size-[8px] rounded-full" style={{ background: c }} />
                <span className="text-[12px] font-semibold" style={{ color: c }}>{l}</span>
              </div>
            ))}
            <span className="absolute right-[16px] text-[12px] font-semibold text-[#afb8c5]">단위 : 천원</span>
          </div>
        </div>
      </div>

      {/* Graph View */}
      <div className={`h-[351px] border border-[#d5d5d5] rounded-[8px] bg-white overflow-hidden flex flex-col transition-opacity duration-200 ${view === 'graph' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="px-[16px] pt-[16px] flex-shrink-0">
          <div className="text-[14px] font-semibold text-[#132968] mb-[4px]">파리 → 바르셀로나 · {year}년 {month}월</div>
          <div className="text-[11px] text-[#6b7281]">날짜별 최저가 추이 (단위: 천원) · 좌우로 스크롤</div>
        </div>
        <div className="flex-1 overflow-x-auto overflow-y-hidden px-[16px] py-[12px]">
          <div className="flex items-end gap-[6px] h-[230px]" style={{ minWidth: `${entries.length * 34}px` }}>
            {entries.map(e => {
              const cls = priceClass(e.price)
              const barH = Math.max(14, Math.round((e.price / maxP) * BAR_H))
              const isSel = e.d === selectedDay
              return (
                <div key={e.d} onClick={() => setSelectedDay(e.d)}
                  className="flex-shrink-0 w-[28px] flex flex-col items-center gap-[3px] h-full justify-end cursor-pointer">
                  <span className="text-[9px] font-semibold text-center whitespace-nowrap" style={{ color: textColor(cls) }}>₩{e.price}</span>
                  <div className="w-full rounded-t-[4px]"
                    style={{ height: barH, background: bgColor(cls), border: `1px solid ${cls === 'cheap' ? '#b8d9bf' : cls === 'expensive' ? '#f5c0c0' : '#e0c9b8'}`, outline: isSel ? '2px solid #132968' : 'none', outlineOffset: 1 }} />
                  <span className="text-[9px] text-[#6b7281] text-center">{e.d}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <button onClick={() => navigate(`/compare${selectedDay ? `?date=${selectedDay}` : ''}`)}
        className="w-full h-[48px] bg-[#fa6b6b] rounded-[8px] flex items-center justify-center gap-[4px] border-none cursor-pointer">
        <span className="text-white text-[14px] font-medium">{ctaText}</span>
        <Icon name="arrow_forward" size={20} color="white" />
      </button>

      </div>{/* end scroll area */}

      <BottomNav />
    </div>
  )
}
