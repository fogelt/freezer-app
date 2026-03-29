import { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabase'
import { FreezerItemCard, PrimaryButton } from '@/ui'

interface FreezerItem {
  id: string
  name: string
  description: string | null
  shelf_number: number
}

export default function FreezerList() {
  const [items, setItems] = useState<FreezerItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchItems()
  }, [])

  async function fetchItems() {
    setLoading(true)
    const { data, error } = await supabase
      .from('freezer_items')
      .select('*')
      .order('shelf_number', { ascending: true })

    if (error) {
      console.error('Error fetching:', error.message)
    } else if (data) {
      setItems(data)
    }
    setLoading(false)
  }

  async function handleDelete(id: string) {
    const confirmDelete = window.confirm("Vill du ta bort denna vara?")
    if (!confirmDelete) return

    const { error } = await supabase
      .from('freezer_items')
      .delete()
      .eq('id', id)

    if (error) {
      alert("Kunde inte ta bort varan")
    } else {
      setItems(items.filter(item => item.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-12 font-sans text-slate-900">
      <div className="mx-auto max-w-2xl">

        <header className="mb-10 flex flex-col gap-6 border-b-2 border-brand/20 pb-6">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-brand text-center">
              Habo Frysen
            </h1>
          </div>

          <div className="w-full">
            <PrimaryButton
              label="+ Ny Vara"
              onClick={() => alert('Här ska vi lägga till formuläret!')}
            />
          </div>
        </header>

        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
          {loading ? (
            <div className="flex items-center justify-center p-20 italic text-slate-300 animate-pulse">
              Läser in frysen...
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {items.map((item) => (
                <FreezerItemCard
                  key={item.id}
                  item={item}
                  onDelete={handleDelete}
                />
              ))}

              {items.length === 0 && (
                <div className="flex flex-col items-center justify-center p-16 text-center">
                  <p className="text-xs italic text-slate-400">Frysen är tom.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}