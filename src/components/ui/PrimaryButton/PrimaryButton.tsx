interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  loading?: boolean;
}

export default function PrimaryButton({ label, loading, ...props }: Props) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className="group relative w-full cursor-pointer overflow-hidden rounded-xl bg-brand p-4 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-brand/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-700 group-hover:[transform:skew(-12deg)_translateX(100%)]">
        <div className="relative h-full w-8 bg-white/20" />
      </div>

      <span className="flex items-center justify-center gap-2">
        {loading ? (
          <>
            <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Laddar...
          </>
        ) : (
          label
        )}
      </span>
    </button>
  );
}