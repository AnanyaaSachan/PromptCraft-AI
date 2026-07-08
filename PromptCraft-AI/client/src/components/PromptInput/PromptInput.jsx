import Button from '../Button/Button'

const MAX_CHARS = 500

/**
 * PromptInput — Textarea for the user's idea with char counter and generate button.
 *
 * @param {object} props
 * @param {string} props.value
 * @param {function} props.onChange
 * @param {function} props.onGenerate
 * @param {boolean} [props.isLoading]
 */
function PromptInput({ value, onChange, onGenerate, isLoading = false }) {
  const charCount = value.length
  const isOverLimit = charCount > MAX_CHARS
  const isEmpty = charCount === 0

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      if (!isEmpty && !isOverLimit && !isLoading) onGenerate()
    }
  }

  const countColor = isOverLimit
    ? 'text-red-500'
    : charCount > MAX_CHARS * 0.8
    ? 'text-amber-500'
    : 'text-gray-400'

  return (
    <section id="prompt-section" className="w-full max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 transition-shadow hover:shadow-md">

        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Describe Your Idea</h2>
          <p className="text-sm text-gray-500">
            Type anything — we'll craft the perfect prompt and generate your image.
          </p>
        </div>

        {/* Textarea */}
        <div className="relative">
          <textarea
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            placeholder="e.g. A poster for my juice shop's monsoon offer"
            rows={5}
            disabled={isLoading}
            aria-label="Describe your idea"
            className={`w-full resize-none rounded-xl border px-4 py-3 text-sm sm:text-base text-gray-800
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed leading-relaxed
              ${isOverLimit ? 'border-red-300 focus:ring-red-400 focus:border-red-400' : 'border-gray-200'}`}
          />
          <span className={`absolute bottom-3 right-3 text-xs font-medium tabular-nums ${countColor}`}>
            {charCount}/{MAX_CHARS}
          </span>
        </div>

        {isOverLimit && (
          <p className="text-red-500 text-xs mt-1.5">
            Shorten your input to {MAX_CHARS} characters or fewer.
          </p>
        )}

        {/* Footer row */}
        <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-gray-400 hidden sm:block">
            Press{' '}
            <kbd className="bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded text-gray-500 font-mono text-[11px]">
              Ctrl+Enter
            </kbd>{' '}
            to generate
          </p>
          <Button
            variant="primary"
            onClick={onGenerate}
            isLoading={isLoading}
            disabled={isEmpty || isOverLimit}
            className="w-full sm:w-auto px-6 py-2.5 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
            </svg>
            Generate Image
          </Button>
        </div>
      </div>
    </section>
  )
}

export default PromptInput
