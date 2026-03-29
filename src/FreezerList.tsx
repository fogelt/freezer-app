import { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabase'
import { PrimaryButton, FreezerShelf } from '@/ui'

export default function FreezerList() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const shelves = [1, 2, 3, 4, 5, 6]

  useEffect(() => {
    fetchItems()
  }, [])

  async function fetchItems() {
    setLoading(true)
    const { data } = await supabase.from('freezer_items').select('*')
    if (data) setItems(data)
    setLoading(false)
  }

  const handleAddNew = (shelfNumber: number) => {
    const name = window.prompt(`Vad vill du lägga till på hylla ${shelfNumber}?`)
    if (!name) return

    console.log(`Adding ${name} to shelf ${shelfNumber}`)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-12 font-sans text-slate-900">
      <div className="mx-auto max-w-2xl">

        <header className='p-6 m-6 border-b-2 border-brand'>
          <h1 className="text-4xl font-black tracking-tighter text-brand text-center">HABO FRYSEN</h1>
        </header>

        {loading ? (
          <div className="text-center italic text-slate-300">Inventerar...</div>
        ) : (
          shelves.map((num) => (
            <FreezerShelf
              key={num}
              shelfNumber={num}
              items={items}
              onAdd={handleAddNew}
              onDelete={(id) => setItems(items.filter(i => i.id !== id))}
            />
          ))
        )}

      </div>
    </div>
  )
}