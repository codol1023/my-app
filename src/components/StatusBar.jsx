import Icon from './Icon'

export default function StatusBar() {
  return (
    <div className="absolute backdrop-blur-[24px] bg-[#132968] h-[53px] left-0 right-0 top-0 z-10 flex items-center justify-between px-[16px]">
      <span style={{ fontSize: 14, fontWeight: 600, color: 'white', letterSpacing: '-0.28px', fontFamily: 'Pretendard' }}>9:41</span>
      <div className="flex items-center gap-[4px]">
        <Icon name="signal_cellular_alt" size={18} color="white" />
        <Icon name="wifi" size={18} color="white" />
        <Icon name="battery_5_bar" size={18} color="white" />
      </div>
    </div>
  )
}
