import { useState } from 'react'
import { supabase } from './components/utils/supabase'
import { PrimaryButton } from '@/ui'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6 font-sans text-slate-900">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-slate-100">
        <h1 className="mb-2 text-2xl font-bold text-brand text-center uppercase tracking-widest">
          Habo frysen
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="E-post"
            required
            className="w-full rounded-lg border border-slate-200 p-3 outline-brand"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Lösenord"
            required
            className="w-full rounded-lg border border-slate-200 p-3 outline-brand"
            onChange={(e) => setPassword(e.target.value)}
          />
          <PrimaryButton
            type="submit"
            label="Logga in"
            loading={loading}
          />
        </form>
      </div>
    </div>
  )
}