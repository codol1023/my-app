const imgSearch = "/assets/0c3781af-023f-492c-a994-45f6c1c4cbfe.png"
const imgExplore = "/assets/faca4991-39ba-4c44-b107-77fe323ea546.png"
const imgFavorite = "/assets/1fa93016-5197-4edc-b8c5-e26585658b35.png"
const imgTicket = "/assets/54f58d47-a6a9-4b7c-a799-1dc6aa3d90c2.png"
const imgPerson = "/assets/69d66e6f-dfef-484c-9a21-bed8eb13a6bd.png"

export default function BottomNav() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[56px] bg-white flex items-center justify-around px-[16px]">
      <img src={imgSearch} className="size-[24px]" alt="검색" />
      <img src={imgExplore} className="size-[24px]" alt="탐색" />
      <img src={imgFavorite} className="size-[24px]" alt="찜" />
      <img src={imgTicket} className="size-[24px]" alt="티켓" />
      <img src={imgPerson} className="size-[24px]" alt="프로필" />
    </div>
  )
}
