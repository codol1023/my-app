import { useTrip, cityName } from '../context/TripContext'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import StatusBar from '../components/StatusBar'
import Icon from '../components/Icon'

const DAY_KO = ['일','월','화','수','목','금','토']

const PRICE_MAP = {
  1:128,2:175,3:130,4:122,5:119,6:95,7:97,8:160,9:115,10:99,
  11:92,12:91,13:110,14:118,15:79,16:98,17:94,18:89,19:107,20:155,
  21:172,22:128,23:112,24:109,25:162,26:168,27:180,28:182,29:110,30:105,
  31:107,32:105,33:172,34:168,35:172,36:145,37:138
}

function getTransportData(dateNum) {
  const base = PRICE_MAP[dateNum] ?? 120
  return {
    flight: { price: base * 1000, count: Math.max(4, 12 - Math.floor(base / 20)), dur: '1h 50m · 직항' },
    train:  { price: Math.round(base * 950), count: Math.max(3, 9 - Math.floor(base / 25)), dur: '6h 25m' },
  }
}

function buildDate(dateNum) {
  const month = dateNum <= 30 ? 6 : 7
  const day   = dateNum <= 30 ? dateNum : dateNum - 30
  const dow   = new Date(2026, month - 1, day).getDay()
  const price = PRICE_MAP[dateNum] ?? 120
  return { dateNum, month, day, dayKo: DAY_KO[dow], price, expensive: price >= 145 }
}

const DEPARTURE_PRICE = 79000
const TRANSPORT_LABELS = { flight: '항공', train: '기차' }

export default function ReturnFlight() {
  const navigate = useNavigate()
  const { origin, destination, isOneway } = useTrip()
  const orig = cityName(origin) || '파리'
  const dest = cityName(destination) || '목적지'
  const [searchParams] = useSearchParams()

  const selectedType  = searchParams.get('selected')
  const selectedPrice = parseInt(searchParams.get('returnprice') ?? '0', 10)
  const depDate       = parseInt(searchParams.get('depdate') ?? '15', 10)
  const depPrice      = parseInt(searchParams.get('depprice') ?? String(DEPARTURE_PRICE), 10)
  const depTime       = searchParams.get('deptime') ?? ''
  const depAirline    = searchParams.get('depairline') ? decodeURIComponent(searchParams.get('depairline')) : '항공'
  const retTime       = searchParams.get('rettime') ?? ''
  const retAirline    = searchParams.get('retairline') ? decodeURIComponent(searchParams.get('retairline')) : ''
  const depDayKo      = DAY_KO[new Date(2026, 5, depDate).getDay()]
  const initReturn    = parseInt(searchParams.get('date') ?? String(depDate), 10)

  // 출발일 당일부터 14일치 (당일치기 포함)
  const returnDates = Array.from({ length: 14 }, (_, i) => buildDate(depDate + i))

  const validInit = returnDates.find(d => d.dateNum === initReturn)
  const [selectedDate, setSelectedDate] = useState(
    validInit ? initReturn : returnDates[0]?.dateNum ?? depDate
  )

  // 편도 검색으로 온 경우 처음부터 편도 상태
  const [oneway, setOneway] = useState(isOneway)

  const data = getTransportData(selectedDate)
  const cheapestType = data.flight.price <= data.train.price ? 'flight' : 'train'
  const totalPrice = depPrice + (selectedType ? selectedPrice : 0)
  const canProceed = oneway || !!selectedType

  const dateScrollRef = useRef(null)
  useEffect(() => {
    if (!dateScrollRef.current) return
    const idx = returnDates.findIndex(d => d.dateNum === selectedDate)
    if (idx < 0) return
    const chipW = 56
    const containerW = dateScrollRef.current.clientWidth
    const target = idx * chipW - containerW / 2 + 24
    dateScrollRef.current.scrollLeft = Math.max(0, target)
  }, [selectedDate])

  const handleTransportClick = (type) => {
    const t = data[type]
    navigate(`/return-list?type=${type}&date=${selectedDate}&depdate=${depDate}&depprice=${depPrice}&deptime=${depTime}&depairline=${encodeURIComponent(depAirline)}&count=${t.count}&minprice=${t.price}`)
  }

  return (
    <div className="flex flex-col bg-white" style={{ height: '100%' }}>
      <div className="flex-shrink-0 pt-[53px]">
        <StatusBar />
        <div className="bg-[#132968] h-[60px] flex items-center justify-between px-[16px]">
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
      </div>

      <div className="flex-1 overflow-y-auto px-[16px] py-[16px] flex flex-col gap-[16px]">

        {/* 경로 */}
        <div className="bg-[#f1f2f6] border border-[#d5d5d5] h-[50px] rounded-[8px] flex items-center justify-between px-[16px]">
          <div>
            <div className="flex items-center gap-[4px]">
              <span className="text-[#132968] text-[16px] font-semibold">{orig}</span>
              <Icon name="arrow_forward" size={20} color="#132968" />
              <span className="text-[#132968] text-[16px] font-semibold">{dest} · {oneway ? '편도' : '왕복'}</span>
            </div>
            <p className="text-[#6b7281] text-[14px]">성인 1명</p>
          </div>
          <button onClick={() => navigate('/')} className="border border-[#bfd6ee] rounded-[4px] h-[20px] px-[10px] flex items-center">
            <span className="text-[#006eb5] text-[10px] font-semibold">경로 수정</span>
          </button>
        </div>

        {/* 출발편 선택 완료 */}
        <div className="bg-[#e6f5e8] border border-[#57f3a7] h-[50px] rounded-[8px] flex items-center justify-between px-[20px]">
          <div className="flex items-center gap-[8px]">
            <Icon name="check_box" size={24} color="#008026" />
            <div>
              <p className="text-[#008026] text-[16px] font-semibold">출발편 선택 완료</p>
              <p className="text-[#00e275] text-[12px]">6/{depDate}({depDayKo}) · {depAirline} · ₩{depPrice.toLocaleString()}{depTime ? ` · ${depTime}` : ''}</p>
            </div>
          </div>
          <button onClick={() => navigate('/compare')} className="bg-white border border-[#bfd6ee] rounded-[4px] h-[20px] px-[10px] flex items-center">
            <span className="text-[#006eb5] text-[10px] font-semibold">변경</span>
          </button>
        </div>

        {/* 리턴편 선택 박스 (편도선택 체크박스 포함) */}
        <div className="border-2 border-[#132968] rounded-[8px]">

          {/* 헤더 + 날짜슬라이더 + 이동수단 카드 — oneway 시 접힘 */}
          <div className={`transition-all duration-300 overflow-hidden ${oneway ? 'max-h-0' : 'max-h-[700px]'}`}>
            <div className="bg-[#132968] flex items-center justify-between px-[12px] py-[10px] rounded-tl-[6px] rounded-tr-[6px]">
              <p className="text-white text-[16px] font-semibold">리턴편 선택</p>
              <div className="bg-[#3a4a67] rounded-[4px] h-[28px] px-[12px] flex items-center gap-[4px]">
                <span className="text-white text-[12px] font-medium">자동 오픈</span>
                <Icon name="arrow_downward_alt" size={20} color="white" />
              </div>
            </div>

            <div className="bg-white px-[12px] py-[16px] flex flex-col gap-[16px]">
              {/* 날짜 슬라이더 */}
              <div className="flex flex-col gap-[8px]">
                <span className="text-[#6b7281] text-[10px]">리턴 날짜 (6/{depDate} 당일부터)</span>
                <div ref={dateScrollRef} className="overflow-x-auto">
                  <div className="flex gap-[8px] w-max">
                    {returnDates.map((d) => (
                      <button key={d.dateNum}
                        onClick={() => setSelectedDate(d.dateNum)}
                        className={`size-[48px] flex flex-col items-center justify-center rounded-[8px] border-2 flex-shrink-0
                          ${d.dateNum === selectedDate ? 'bg-[#132968] border-[#132968]'
                            : d.expensive ? 'border-[#fd3235]' : 'border-[#e5e7ee]'}`}>
                        <span className={`text-[10px] font-normal ${d.dateNum === selectedDate ? 'text-[#d8d9dd]' : 'text-[#dadbe0]'}`}>{d.dayKo}</span>
                        <span className={`text-[12px] font-semibold ${d.dateNum === selectedDate ? 'text-white' : 'text-[#132968]'}`}>{d.day}</span>
                        <span className={`text-[10px] font-normal ${d.dateNum === selectedDate ? 'text-[#d8d9dd]' : d.expensive ? 'text-[#fd3235]' : 'text-[#c24c00]'}`}>₩{d.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 교통수단 카드 */}
              <div className="flex flex-col gap-[12px]">
                {['flight', 'train'].map((type) => {
                  const t = data[type]
                  const isSelected = selectedType === type
                  const isCheapest = type === cheapestType
                  return (
                    <button key={type} onClick={() => handleTransportClick(type)}
                      className={`bg-white border-2 rounded-[8px] py-[18px] px-[20px] flex flex-col gap-[12px] w-full transition-colors
                        ${isSelected ? 'border-[#fa6b6b]' : 'border-[#ccc]'}`}>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-[12px]">
                          <span className="text-[16px] font-semibold text-black">{TRANSPORT_LABELS[type]}</span>
                          {isCheapest && (
                            <div className="h-[20px] px-[12px] rounded-[4px] flex items-center bg-[#e6f5e8]">
                              <span className="text-[10px] font-semibold text-[#008026]">가장 저렴</span>
                            </div>
                          )}
                        </div>
                        <span className="text-[#ff5553] text-[16px] font-semibold">
                          {isSelected ? `₩${selectedPrice.toLocaleString()}` : `₩${t.price.toLocaleString()}`}
                        </span>
                      </div>
                      <div className="flex items-center justify-between w-full">
                        <span className="text-[#7d8391] text-[14px] font-semibold">{t.dur}</span>
                        <div className="flex items-center gap-[4px]">
                          <span className="text-[#132968] text-[14px] font-semibold">{t.count}편</span>
                          <Icon name="chevron_right" size={20} color="#afb8c5" />
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 구분선 */}
            <div className="h-[1px] bg-[#e5e7ee] mx-[12px]" />
          </div>

          {/* 편도선택 체크박스 — 항상 표시, 박스 하단 */}
          <button
            onClick={() => setOneway(!oneway)}
            className={`cursor-pointer flex items-center gap-[8px] px-[12px] py-[12px] w-full
              ${oneway ? 'rounded-[6px]' : 'rounded-bl-[6px] rounded-br-[6px]'}`}>
            <Icon name={oneway ? 'check_box' : 'check_box_outline_blank'} size={24} color={oneway ? '#008026' : '#6b7281'} />
            <span className={`text-[14px] font-semibold ${oneway ? 'text-[#008026]' : 'text-[#132968]'}`}>편도선택</span>
          </button>
        </div>

        {/* 왕복 합계 (리턴 선택 후, 편도 아닐 때만) */}
        {selectedType && !oneway && (
          <div className="bg-white border-2 border-[#f1f2f6] rounded-[8px] py-[12px] flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[10px] px-[20px] text-[14px] font-normal">
              <div className="flex items-center justify-between">
                <span className="text-[#7d8391]">출발 · 6/{depDate}({depDayKo}) · {depAirline}{depTime ? ` · ${depTime}` : ''}</span>
                <span className="text-[#132968]">₩{depPrice.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                {(() => {
                  const rd = returnDates.find(d => d.dateNum === selectedDate)
                  return (
                    <span className="text-[#7d8391]">
                      리턴 · {rd?.month ?? 6}/{rd?.day ?? selectedDate}({rd?.dayKo ?? ''}) · {retAirline || TRANSPORT_LABELS[selectedType]}{retTime ? ` · ${retTime}` : ''}
                    </span>
                  )
                })()}
                <span className="text-[#132968]">₩{selectedPrice.toLocaleString()}</span>
              </div>
            </div>
            <div className="h-[1px] bg-[#f1f2f6] mx-[20px]" />
            <div className="flex items-center justify-between px-[20px]">
              <span className="text-[#132968] text-[16px] font-semibold">왕복 합계</span>
              <span className="text-[#132968] text-[20px] font-semibold">₩{totalPrice.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex-shrink-0 px-[16px] pb-[16px] pt-[8px] bg-white border-t border-[#f0f0f0]">
        <button
          onClick={() => canProceed && alert('예약이 완료되었습니다! 🎉')}
          className={`h-[48px] rounded-[8px] flex items-center justify-center w-full transition-colors
            ${canProceed ? 'bg-[#fa6b6b]' : 'bg-[#ccc]'}`}>
          <span className="text-white text-[14px] font-medium">
            {oneway
              ? `편도 ₩${depPrice.toLocaleString()} · 결제하기`
              : selectedType
                ? `왕복 ₩${totalPrice.toLocaleString()} · 결제하기`
                : '리턴편을 선택해주세요'}
          </span>
        </button>
      </div>
    </div>
  )
}
