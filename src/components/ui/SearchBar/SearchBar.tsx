import { Search, X } from 'lucide-react';

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function SearchInput({ value, onChange, placeholder = "SÖK I FRYSEN..." }: Props) {
  return (
    <div className="sticky top-0 z-30 bg-white/80 p-4 backdrop-blur-md border-b border-slate-50 my-4">
      <div className="relative flex items-center group">
        <Search
          className={`absolute left-4 transition-colors ${value ? 'text-brand' : 'text-slate-400'}`}
          size={18}
        />

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-2xl bg-slate-100 py-4 pl-12 pr-12 text-xs font-black tracking-widest uppercase outline-brand transition-all focus:bg-white focus:shadow-xl focus:shadow-brand/10 border-none"
        />

        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-4 flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-slate-500 hover:bg-slate-300 active:scale-90 transition-all"
          >
            <X size={14} strokeWidth={3} />
          </button>
        )}
      </div>
    </div>
  );
}