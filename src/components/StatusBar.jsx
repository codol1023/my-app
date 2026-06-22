const imgCap = "/assets/e10e95f2-0fc7-4730-9208-67fe14b13157.png"
const imgWifi = "/assets/ed295803-6478-4702-8ed2-c4488e1cbff1.png"
const imgCell = "/assets/45bc6f96-d0e8-44e0-aa06-343c865b98f1.png"

export default function StatusBar() {
  return (
    <div className="absolute backdrop-blur-[24px] bg-[#132968] h-[53px] left-0 right-0 top-0 z-10">
      <div className="absolute right-[26px] top-[21px] flex items-center gap-[4px]">
        <img src={imgCell} className="h-[11px] w-[17px]" alt="" />
        <img src={imgWifi} className="h-[11px] w-[15px]" alt="" />
        <div className="relative h-[11px] w-[22px] border border-white/60 rounded-[2.6px] opacity-35">
          <div className="absolute bg-white h-[7px] left-[2px] top-[1px] w-[18px] rounded-[1px]" />
        </div>
        <img src={imgCap} className="h-[4px] w-[1.3px]" alt="" />
      </div>
      <div className="absolute left-[21px] top-1/2 -translate-y-1/2">
        <p className="text-white text-[14px] font-semibold tracking-[-0.28px]">9:41</p>
      </div>
    </div>
  )
}
