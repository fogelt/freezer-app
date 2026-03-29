import { useState, useEffect } from 'react'
import { supabase } from '@/utils'
import { FreezerShelf, AddItemForm, SearchBar } from '@/ui'

export default function FreezerList() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeShelf, setActiveShelf] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

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

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">

      <div className="mx-auto max-w-2xl p-4 md:p-12 pb-20">
        <header className='p-6 mb-8 border-b-2 border-brand'>
          <h1 className="text-4xl font-black tracking-tighter text-brand text-center uppercase">
            HABO FRYSEN
          </h1>
        </header>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {loading ? (
          <div className="text-center italic text-slate-300 animate-pulse uppercase tracking-widest text-xs py-20">
            Inventerar...
          </div>
        ) : (
          <div className="space-y-4">
            {shelves.map((num) => (
              <FreezerShelf
                key={num}
                shelfNumber={num}
                items={filteredItems}
                onAdd={handleAddNew}
                onDelete={handleDelete}
              />
            ))}

            {filteredItems.length === 0 && searchQuery !== '' && (
              <div className="py-20 text-center text-slate-300 font-bold uppercase tracking-widest text-[10px]">
                Hittade inga varor som matchar "{searchQuery}"
              </div>
            )}
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