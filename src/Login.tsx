import { useState } from 'react'
import { supabase } from '@/utils'
import { PrimaryButton } from '@/ui'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isShowing, setIsShowing] = useState(false)
  const [message, setMessage] = useState('HEJ')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
    setLoading(false)
  }

  const handlePress = () => {
    setIsShowing(!isShowing)
    setMessage('Pressed')
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">

      {/* SIDEBAR CONTAINER */}
      <div
        className={`
        overflow-hidden duration-500
        ${isShowing ? 'w-64' : 'w-0'}
      `}
      >
        <div className="w-64 p-6 bg-slate-300 h-full">
          <p>{message}</p>
        </div>
      </div>

      {/* MODAL CONTAINER */}
      {/* flex-1 ensures this div takes up all remaining space */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-slate-100">
          <h1 className="text-4xl font-black tracking-tighter text-brand text-center pb-4">
            Habo frysen
          </h1>

          <button
            onClick={handlePress}
            className="mb-6 w-full py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Toggle Sidebar
          </button>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="E-post"
              className="w-full rounded-lg border border-slate-200 p-3 outline-brand"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Lösenord"
              className="w-full rounded-lg border border-slate-200 p-3 outline-brand"
              onChange={(e) => setPassword(e.target.value)}
            />
            <PrimaryButton type="submit" label="Logga in" loading={loading} />
          </form>
        </div>
      </div>
    </div>
  );
}