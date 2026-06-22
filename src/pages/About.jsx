import { useNavigate } from 'react-router-dom'

function About() {
  const navigate = useNavigate()

  return (
    <div>
      <h1>About 화면</h1>
      <button onClick={() => navigate('/')}>홈으로 이동</button>
    </div>
  )
}

export default About