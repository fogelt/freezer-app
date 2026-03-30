import { Trash2, Snowflake } from 'lucide-react'
import { PrimaryButton } from '@/ui'

interface FreezerItem {
  id: string;
  name: string;
  image_url: string | null;
  shelf_number: number;
}

interface Props {
  item: FreezerItem;
  onDelete?: (id: string) => void;
}

export default function FreezerItemCard({ item, onDelete }: Props) {
  return (
    <div className="flex items-center justify-between bg-white p-4 transition-colors active:bg-slate-50 border-b border-slate-50">
      <div className="flex items-center gap-4 overflow-hidden">
        <div className="h-32 w-32 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50 shadow-inner flex items-center justify-center">
          {item.image_url ? (
            <img
              src={item.image_url}
              className="h-full w-full object-cover"
              alt={item.name}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <Snowflake size={24} className="text-slate-200" strokeWidth={1.5} />
          )}
        </div>

        <h3 className="text-sm font-black tracking-widest text-slate-800 uppercase">
          {item.name}
        </h3>
      </div>

      {onDelete && (
        <div className="w-14 shrink-0">
          <PrimaryButton
            variant="danger"
            label={<Trash2 size={20} strokeWidth={3} />}
            onClick={() => { onDelete(item.id); }}
            aria-label="Ta bort"
          />
        </div>
      )}
    </div>
  );
}