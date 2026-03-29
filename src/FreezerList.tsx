import { useState, useEffect } from 'react'
import { supabase } from '@/utils'
import { FreezerShelf, AddItemForm } from '@/ui'

export default function FreezerList() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeShelf, setActiveShelf] = useState<number | null>(null)

  const shelves = [1, 2, 3, 4, 5, 6, 7]

  useEffect(() => {
    fetchItems()
  }, [])

  async function fetchItems() {
    setLoading(true)
    const { data, error } = await supabase
      .from('freezer_items')
      .select('id, name, shelf_number, image_url')
      .order('created_at', { ascending: false })

    if (error) console.error(error)
    if (data) setItems(data)
    setLoading(false)
  }

  const handleAddNew = (shelfNumber: number) => {
    setActiveShelf(shelfNumber)
  }

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('freezer_items').delete().eq('id', id)
    if (!error) {
      setItems(prev => prev.filter(i => i.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-12 font-sans text-slate-900">
      <div className="mx-auto max-w-2xl pb-20">

        <header className='p-6 mb-12 border-b-2 border-brand'>
          <h1 className="text-4xl font-black tracking-tighter text-brand text-center uppercase">
            HABO FRYSEN
          </h1>
        </header>

        {loading ? (
          <div className="text-center italic text-slate-300 animate-pulse uppercase tracking-widest text-xs">
            Inventerar...
          </div>
        ) : (
          <div className="space-y-4">
            {shelves.map((num) => (
              <FreezerShelf
                key={num}
                shelfNumber={num}
                items={items}
                onAdd={handleAddNew}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {activeShelf !== null && (
          <AddItemForm
            shelfNumber={activeShelf}
            onClose={() => setActiveShelf(null)}
            onSuccess={() => {
              fetchItems()
              setActiveShelf(null)
            }}
          />
        )}

      </div>
    </div>
  )
}