import { useNavigate } from 'react-router-dom'

function Contact() {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Contact 화면</h1>
      <button onClick={() => navigate('/')}>홈으로 이동</button>
    </div>
  )
}

export default Contact