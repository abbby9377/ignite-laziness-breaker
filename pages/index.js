import { useState, useEffect } from 'react'

const prompts = [
  "今天有什麼讓你產生一點點好奇心？",
  "今天觀察到哪個微小細節讓你印象深刻？",
  "你今天完成了哪一件原本懶得做的小事？"
]

export default function Home() {
  const [answer, setAnswer] = useState('')
  const [history, setHistory] = useState([])
  const [submitted, setSubmitted] = useState(false)

  const today = new Date().toLocaleDateString()
  const prompt = prompts[today.length % prompts.length]

  useEffect(() => {
    const stored = localStorage.getItem('ignite-history')
    if (stored) {
      setHistory(JSON.parse(stored))
    }
  }, [])

  const handleSubmit = () => {
    if (!answer.trim()) return
    const newEntry = { date: today, prompt, answer }
    const newHistory = [...history, newEntry]
    setHistory(newHistory)
    localStorage.setItem('ignite-history', JSON.stringify(newHistory))
    setAnswer('')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2000)
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🔥 今日覺察</h1>
      <div className="max-w-xl mx-auto bg-gray-100 p-6 rounded shadow">
        <p className="mb-2 italic text-gray-700">🧠 問題：{prompt}</p>
        <textarea
          className="w-full p-2 border rounded mb-4"
          rows={3}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="寫下你的回應..."
        />
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          提交
        </button>
        {submitted && <p className="text-green-600 mt-2">✅ 已打卡！</p>}
      </div>

      <div className="max-w-xl mx-auto mt-10">
        <h2 className="text-xl font-semibold mb-4">📘 回答紀錄</h2>
        <ul className="space-y-3">
          {history.map((entry, index) => (
            <li key={index} className="bg-white border p-3 rounded">
              <p className="text-sm text-gray-500">{entry.date} — {entry.prompt}</p>
              <p>{entry.answer}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
