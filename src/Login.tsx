import { useState } from 'react'
import { supabase } from '@/utils'
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
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-slate-100">
          <h1 className="text-4xl font-black tracking-tighter text-brand text-center pb-4">
            Habo frysen
          </h1>

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