import { useState, useEffect } from 'react'
import { supabase } from './components/utils/supabase/supabase'
import Login from './Login'
import FreezerList from './FreezerList'

export default function App() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) return <div className="flex h-screen items-center justify-center text-slate-400">Loading...</div>

  return session ? <FreezerList /> : <Login />
}