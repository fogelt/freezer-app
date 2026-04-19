interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: React.ReactNode; // Changed from string to ReactNode
  loading?: boolean;
  variant?: 'primary' | 'danger';
}

export default function PrimaryButton({
  label,
  loading,
  variant = 'primary',
  className = '',
  ...props
}: Props) {

  const variantClasses = variant === 'danger'
    ? "bg-red-600 hover:shadow-red-500/20"
    : "bg-brand hover:shadow-brand/20";

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`nav-item
        group relative w-full cursor-pointer overflow-hidden rounded-xl p-4 font-bold text-white shadow-lg transition-all 
        hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 border-2 border-black
        ${variantClasses}
        ${className}
      `}
    >
      <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-700 group-hover:[transform:skew(-12deg)_translateX(100%)]">
        <div className="relative h-full w-8 bg-white/20" />
      </div>

      <span className="flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
        {loading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        ) : (
          label
        )}
      </span>
    </button>
  );
}