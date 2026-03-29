import { useState, useEffect } from 'react'
import { supabase } from './components/utils/supabase'

interface FreezerItem {
  id: string
  name: string
  description: string | null
  shelf_number: number
}

export default function FreezerList() {
  const [items, setItems] = useState<FreezerItem[]>([])

  useEffect(() => {
    fetchItems()
  }, [])

  async function fetchItems() {
    const { data } = await supabase
      .from('freezer_items')
      .select('*')
      .order('shelf_number', { ascending: true })
    if (data) setItems(data)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-blue-600">🧊 Inventory</h1>
            <button onClick={() => supabase.auth.signOut()} className="text-xs font-bold text-slate-400 hover:text-red-500 uppercase cursor-pointer">
              Sign Out
            </button>
          </div>
          <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-bold text-blue-700">{items.length} Items</span>
        </header>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <ul className="divide-y divide-slate-100">
            {items.map((item) => (
              <li key={item.id} className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors">
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800">{item.name}</span>
                  <span className="text-sm text-slate-500 italic">{item.description}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black uppercase text-slate-300 leading-none mb-1">Shelf</span>
                  <span className="text-xl font-mono font-black text-blue-500 leading-none">{item.shelf_number}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}