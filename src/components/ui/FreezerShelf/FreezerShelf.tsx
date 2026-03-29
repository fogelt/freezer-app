import { FreezerItemCard, PrimaryButton } from '@/ui'

interface FreezerItem {
  id: string
  name: string
  image_url: string | null
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
    <section className="mb-8">
      <div className="mb-3 flex items-center justify-between border-l-4 border-brand pl-4 pr-1">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-black tracking-tighter text-slate-800">
            HYLLA {shelfNumber}
          </h2>
        </div>

        <div className="w-24">
          <PrimaryButton
            label="+ NY"
            onClick={() => onAdd(shelfNumber)}
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {shelfItems.length > 0 ? (
          <div className="divide-y divide-slate-50">
            {shelfItems.map((item) => (
              <FreezerItemCard key={item.id} item={item} onDelete={onDelete} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-300">
              Tom Hylla
            </p>
          </div>
        )}
      </div>
    </section>
  )
}