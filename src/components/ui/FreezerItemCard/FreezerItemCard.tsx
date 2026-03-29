interface FreezerItem {
  id: string;
  name: string;
  description: string | null;
  shelf_number: number;
}

interface Props {
  item: FreezerItem;
  onDelete?: (id: string) => void;
}

export default function FreezerItemCard({ item, onDelete }: Props) {
  return (
    <div className="group flex items-center justify-between border-b border-slate-100 bg-white p-5 transition-all hover:bg-slate-50/50">
      <div className="flex flex-col gap-1">
        {/* Name: Bold and primary */}
        <h3 className="text-base font-black tracking-tighter text-slate-800">
          {item.name}
        </h3>

        {item.description && (
          <p className="text-[10px] lowercase tracking-normal text-slate-400">
            {item.description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end">
          <span className="text-[9px] font-bold text-slate-300">Hylla</span>
          <span className="font-mono text-xl font-black text-brand leading-none">
            {item.shelf_number}
          </span>
        </div>

        {onDelete && (
          <button
            onClick={() => onDelete(item.id)}
            className="opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer text-slate-300 hover:text-red-500"
            title="Ta bort"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}