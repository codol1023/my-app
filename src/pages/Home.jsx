import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function Home() {
  const navigate = useNavigate()
  const [notes, setNotes] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    fetchNotes()
  }, [])

  async function fetchNotes() {
    const { data } = await supabase.from('notes').select('*')
    setNotes(data || [])
  }

  async function addNote() {
    if (!input) return
    await supabase.from('notes').insert([{ content: input }])
    setInput('')
    fetchNotes()
  }

  return (
    <div>
      <h1>홈 화면</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="메모를 입력하세요"
      />
      <button onClick={addNote}>저장</button>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
      <button onClick={() => navigate('/about')}>About으로 이동</button>
      <button onClick={() => navigate('/contact')}>Contact으로 이동</button>
    </div>
  )
}

export default Home