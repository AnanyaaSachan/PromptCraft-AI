import { memo } from 'react'

/**
 * Loader — Skeleton + spinner with animated progress messages.
 * @param {object} props
 * @param {string} [props.message] - Rotating status text from useGenerate.
 */
const Loader = memo(function Loader({ message = 'Generating your image…' }) {
  return (
    <div
      className="w-full max-w-3xl mx-auto px-4 pb-8 animate-fade-in"
      aria-busy="true"
      aria-label="Generating image"
      role="status"
    >
      {/* Spinner + status */}
      <div className="flex flex-col items-center justify-center py-10 gap-4">
        <div className="relative w-14 h-14" aria-hidden="true">
          <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
          <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse" />
          </div>
        </div>
        <div className="text-center min-h-[48px] flex flex-col items-center justify-center">
          <p className="text-sm font-semibold text-gray-700 transition-all duration-500">
            {message}
          </p>
          <p className="text-xs text-gray-400 mt-1">This usually takes 10–20 seconds</p>
        </div>
      </div>

      {/* Skeleton — Prompt Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-7 h-7 bg-gray-200 rounded-lg animate-skeleton" />
          <div className="h-4 w-36 bg-gray-200 rounded animate-skeleton" />
        </div>
        <div className="space-y-2.5">
          <div className="h-3 bg-gray-200 rounded animate-skeleton w-full" />
          <div className="h-3 bg-gray-200 rounded animate-skeleton w-5/6" />
          <div className="h-3 bg-gray-200 rounded animate-skeleton w-4/6" />
          <div className="h-3 bg-gray-200 rounded animate-skeleton w-3/4" />
          <div className="h-3 bg-gray-200 rounded animate-skeleton w-full" />
          <div className="h-3 bg-gray-200 rounded animate-skeleton w-2/3" />
        </div>
      </div>

      {/* Skeleton — Image Card */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-gray-200 rounded-lg animate-skeleton" />
            <div className="h-4 w-32 bg-gray-200 rounded animate-skeleton" />
          </div>
          <div className="h-8 w-24 bg-gray-200 rounded-lg animate-skeleton" />
        </div>
        <div className="h-64 sm:h-80 bg-gray-100 animate-skeleton" />
      </div>
    </div>
  )
})

export default Loader
