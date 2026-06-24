import Icon from './Icon'

export default function BottomNav() {
  return (
    <div className="flex-shrink-0 h-[56px] bg-white flex items-center justify-around px-[16px] border-t border-[#f0f0f0]">
      <Icon name="search" size={24} color="#132968" />
      <Icon name="explore" size={24} color="#9ca3af" />
      <Icon name="favorite" size={24} color="#9ca3af" />
      <Icon name="confirmation_number" size={24} color="#9ca3af" />
      <Icon name="person" size={24} color="#9ca3af" />
    </div>
  )
}
