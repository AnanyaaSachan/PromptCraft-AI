/**
 * Button — Reusable button with primary / secondary / ghost variants.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {function} [props.onClick]
 * @param {'primary'|'secondary'|'ghost'} [props.variant='primary']
 * @param {boolean} [props.disabled]
 * @param {boolean} [props.isLoading]
 * @param {string} [props.className]
 * @param {'button'|'submit'|'reset'} [props.type='button']
 */
function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  isLoading = false,
  className = '',
  type = 'button',
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 select-none'

  const variants = {
    primary:
      'bg-blue-600 text-white px-5 py-2.5 hover:bg-blue-700 active:bg-blue-800 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none',
    secondary:
      'bg-white text-blue-600 px-5 py-2.5 border border-blue-200 hover:bg-blue-50 active:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed',
    ghost:
      'bg-transparent text-gray-600 px-4 py-2 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${base} ${variants[variant] ?? variants.primary} ${className}`}
    >
      {isLoading ? (
        <>
          <svg
            className="w-4 h-4 animate-spin flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          <span>Generating…</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
