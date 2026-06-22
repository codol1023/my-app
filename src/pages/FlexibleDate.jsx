import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const imgBack = "/assets/f4409b2a-af79-40c8-b4f3-71ca698148b1.png"
const imgChevFwd = "/assets/c8273399-f323-4c54-844d-c0fb0d74ad81.png"
const imgChevBwd = "/assets/0b5df898-c22e-4b20-b178-2a30cc1e7fb1.png"
const imgArrowCTA = "/assets/550185c4-b488-40d9-8da0-059fa59c621e.png"

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

const FREE_CHANGE = new Set(['2026-6-10', '2026-6-11', '2026-6-12'])

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

export default function FlexibleDate() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('전체')
  const [view, setView] = useState('calendar')
  const [year, setYear] = useState(2026)
  const [month, setMonth] = useState(6)
  const [selectedDay, setSelectedDay] = useState(15)
  const graphScrollRef = useRef(null)

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

  // build calendar cells
  const first = firstDayOfWeek(year, month)
  const days = daysInMonth(year, month)
  const cells = []
  for (let i = 0; i < first; i++) cells.push(null)
  for (let d = 1; d <= days; d++) cells.push(d)

  // build graph bars
  const entries = []
  for (let d = 1; d <= days; d++) {
    const k = `${year}-${month}-${d}`
    if (data[k] !== undefined) entries.push({ d, price: data[k] })
  }
  const maxP = entries.length ? Math.max(...entries.map(e => e.price)) : 1
  const BAR_H = 160

  return (
    <div style={{ position: 'relative', width: '402px', height: '874px', background: 'white', overflow: 'hidden', fontFamily: "'Pretendard', sans-serif" }}>

      {/* Status Bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 53, background: '#132968', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', zIndex: 10 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: 'white', letterSpacing: '-0.28px' }}>9:41</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 22, height: 11, border: '1px solid rgba(255,255,255,0.6)', borderRadius: 2.7, padding: 1.5, opacity: 0.85 }}>
            <div style={{ width: '100%', height: '100%', background: 'white', borderRadius: 1.3 }} />
          </div>
        </div>
      </div>

      {/* Nav Header */}
      <div style={{ position: 'absolute', top: 53, left: 0, right: 0, height: 60, background: '#132968', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
        <button onClick={() => navigate(-1)} style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
          <img src={imgBack} style={{ width: 24, height: 24 }} alt="back" />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'white', fontSize: 16, fontWeight: 600 }}>
          <span>파리</span>
          <span>↔</span>
          <span>바르셀로나</span>
        </div>
        <div style={{ border: '1px solid white', borderRadius: 4, padding: '4px 8px', color: 'white', fontSize: 12, fontWeight: 600, cursor: 'pointer', height: 24, display: 'flex', alignItems: 'center' }}>
          수정
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ position: 'absolute', top: 121, left: 9, display: 'flex', gap: 7 }}>
        {['전체', '항공', '기차', '버스'].map(f => (
          <button key={f} onClick={() => { setFilter(f); setSelectedDay(null) }}
            style={{ height: 28, padding: '0 12px', borderRadius: 999, fontSize: 12, fontWeight: 500, cursor: 'pointer', border: filter === f ? '1px solid #132968' : '1px solid #e5e7ee', background: filter === f ? '#132968' : 'transparent', color: filter === f ? 'white' : '#6b7281' }}>
            {f}
          </button>
        ))}
      </div>

      {/* View Toggle */}
      <div style={{ position: 'absolute', top: 161, left: 16, width: 370, height: 48, background: '#f2f3f5', borderRadius: 8, display: 'flex', alignItems: 'center', padding: 5, gap: 5 }}>
        {['calendar', 'graph'].map(v => (
          <button key={v} onClick={() => setView(v)}
            style={{ flex: 1, height: 38, borderRadius: 8, border: '1px solid #e9eaed', fontSize: 14, fontWeight: view === v ? 600 : 500, cursor: 'pointer', background: view === v ? 'white' : 'transparent', color: view === v ? '#132968' : '#6b7281' }}>
            {v === 'calendar' ? '달력 뷰' : '그래프 뷰'}
          </button>
        ))}
      </div>

      {/* Price Info Bar */}
      <div style={{ position: 'absolute', top: 233, left: 16, width: 370, height: 48, background: '#132968', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: '#d9d9d9' }}>이번 달 최저가</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>{lowest ? `${lowest}` : '—'}</span>
      </div>

      {/* Calendar View */}
      <div style={{ position: 'absolute', top: 305, left: 16, width: 370, height: 351, opacity: view === 'calendar' ? 1 : 0, pointerEvents: view === 'calendar' ? 'all' : 'none', transition: 'opacity 0.25s' }}>
        <div style={{ width: '100%', height: '100%', border: '1px solid #d5d5d5', borderRadius: 8, overflow: 'hidden', background: 'white' }}>
          {/* Calendar Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px 0' }}>
            <span style={{ fontSize: 16, fontWeight: 600, color: '#132968' }}>{year}년 {month}월</span>
            <div style={{ display: 'flex', gap: 4 }}>
              <button onClick={() => changeMonth(-1)} style={{ width: 24, height: 24, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <img src={imgChevBwd} style={{ width: 24, height: 24 }} alt="prev" />
              </button>
              <button onClick={() => changeMonth(1)} style={{ width: 24, height: 24, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <img src={imgChevFwd} style={{ width: 24, height: 24 }} alt="next" />
              </button>
            </div>
          </div>

          {/* Day headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginTop: 10, padding: '0 4px' }}>
            {['일','월','화','수','목','금','토'].map((d, i) => (
              <div key={d} style={{ textAlign: 'center', fontSize: 10, fontWeight: 600, color: i === 0 ? '#fa6b6b' : '#6b7281', paddingBottom: 2 }}>{d}</div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '2px 4px' }}>
            {cells.map((d, i) => {
              if (!d) return <div key={`e-${i}`} style={{ height: 48 }} />
              const k = `${year}-${month}-${d}`
              const price = data[k]
              const cls = priceClass(price)
              const isSel = d === selectedDay
              return (
                <div key={d} onClick={() => setSelectedDay(d)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 48, cursor: 'pointer', position: 'relative' }}>
                  <div style={{ position: 'absolute', width: 42, height: 42, borderRadius: '50%', background: isSel ? '#132968' : price !== undefined ? bgColor(cls) : '#f5f5f5', zIndex: 0 }} />
                  <span style={{ fontSize: 12, fontWeight: 600, lineHeight: 1, marginBottom: 2, position: 'relative', zIndex: 1, color: isSel ? 'white' : price !== undefined ? textColor(cls) : '#ccc' }}>{d}</span>
                  {price !== undefined && (
                    <span style={{ fontSize: 10, fontWeight: 400, lineHeight: 1, position: 'relative', zIndex: 1, color: isSel ? 'white' : textColor(cls) }}>₩{price}</span>
                  )}
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '4px 16px', gap: 12, position: 'relative' }}>
            {[['#008026','저렴'],['#c24c00','보통'],['#fd3235','비쌈'],['#006eb5','무료변경']].map(([c,l]) => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: c }}>{l}</span>
              </div>
            ))}
            <span style={{ position: 'absolute', right: 16, fontSize: 12, fontWeight: 600, color: '#afb8c5' }}>단위 : 천원</span>
          </div>
        </div>
      </div>

      {/* Graph View */}
      <div style={{ position: 'absolute', top: 305, left: 16, width: 370, height: 351, border: '1px solid #d5d5d5', borderRadius: 8, background: 'white', overflow: 'hidden', opacity: view === 'graph' ? 1 : 0, pointerEvents: view === 'graph' ? 'all' : 'none', transition: 'opacity 0.25s', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px 16px 0', flexShrink: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#132968', marginBottom: 4 }}>파리 → 바르셀로나 · {year}년 {month}월</div>
          <div style={{ fontSize: 11, color: '#6b7281' }}>날짜별 최저가 추이 (단위: 천원) · 좌우로 스크롤</div>
        </div>
        <div ref={graphScrollRef} style={{ flex: 1, overflowX: 'auto', overflowY: 'hidden', padding: '12px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 230, minWidth: `${entries.length * 34}px` }}>
            {entries.map(e => {
              const cls = priceClass(e.price)
              const barH = Math.max(14, Math.round((e.price / maxP) * BAR_H))
              const isSel = e.d === selectedDay
              return (
                <div key={e.d} onClick={() => setSelectedDay(e.d)}
                  style={{ flexShrink: 0, width: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, height: '100%', justifyContent: 'flex-end', cursor: 'pointer' }}>
                  <span style={{ fontSize: 9, fontWeight: 600, textAlign: 'center', whiteSpace: 'nowrap', color: textColor(cls) }}>₩{e.price}</span>
                  <div style={{ width: '100%', height: barH, borderRadius: '4px 4px 0 0', background: bgColor(cls), border: `1px solid ${cls === 'cheap' ? '#b8d9bf' : cls === 'expensive' ? '#f5c0c0' : '#e0c9b8'}`, outline: isSel ? '2px solid #132968' : 'none', outlineOffset: 1 }} />
                  <span style={{ fontSize: 9, color: '#6b7281', textAlign: 'center' }}>{e.d}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <button onClick={() => navigate('/compare')}
        style={{ position: 'absolute', top: 770, left: 17, width: 370, height: 48, background: '#fa6b6b', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, cursor: 'pointer', border: 'none' }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: 'white' }}>{ctaText}</span>
        <img src={imgArrowCTA} style={{ width: 20, height: 20 }} alt="" />
      </button>

      {/* Bottom Nav */}
      <div style={{ position: 'absolute', top: 818, left: 0, right: 0, height: 56, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-around', borderTop: '1px solid #f0f0f0' }}>
        {['/assets/faca4991-39ba-4c44-b107-77fe323ea546.png', '/assets/0c3781af-023f-492c-a994-45f6c1c4cbfe.png', '/assets/1fa93016-5197-4edc-b8c5-e26585658b35.png', '/assets/54f58d47-a6a9-4b7c-a799-1dc6aa3d90c2.png', '/assets/69d66e6f-dfef-484c-9a21-bed8eb13a6bd.png'].map((src, i) => (
          <div key={i} style={{ width: 80, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={src} style={{ width: 24, height: 24 }} alt="" />
          </div>
        ))}
      </div>
    </div>
  )
}
