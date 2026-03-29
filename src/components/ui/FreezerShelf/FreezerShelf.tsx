import { FreezerItemCard, PrimaryButton } from '@/ui'

interface FreezerItem {
  id: string
  name: string
  description: string | null
  shelf_number: number
}

interface Props {
  shelfNumber: number
  items: FreezerItem[]
  onAdd: (shelf: number) => void
  onDelete: (id: string) => void
}

export default function FreezerShelf({ shelfNumber, items, onAdd, onDelete }: Props) {
  const shelfItems = items.filter(item => item.shelf_number === shelfNumber)

  return (
    <section className="mb-10">
      <div className="mb-3 flex items-center gap-3 border-l-4 border-brand pl-4">
        <h2 className="text-xl font-black tracking-tighter text-slate-800">
          Hylla {shelfNumber}
        </h2>
        <span className="text-[10px] font-bold text-slate-300">
          ({shelfItems.length})
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="divide-y divide-slate-50">
          {shelfItems.map((item) => (
            <FreezerItemCard key={item.id} item={item} onDelete={onDelete} />
          ))}

          <div className="flex items-center justify-center p-3 bg-slate-50/30">
            <div className="w-full max-w-[140px]">
              <PrimaryButton
                label="+ LÄGG TILL"
                onClick={() => onAdd(shelfNumber)}
                className="py-2 text-[10px] bg-white border border-slate-200 text-slate-400 shadow-none hover:text-brand hover:border-brand"
              />
            </div>
          </div>
        </div>

        {shelfItems.length === 0 && (
          <div className="p-6 text-center text-[9px] italic text-slate-300 border-t border-slate-50">
            Inga varor sparade
          </div>
        )}
      </div>
    </section>
  )
}