import { memo } from 'react'

/**
 * PromptCard — Displays the AI-enhanced professional prompt with a copy button.
 */
const PromptCard = memo(function PromptCard({ prompt, onCopy, copied = false }) {
  if (!prompt) return null

  return (
    <section className="w-full max-w-3xl mx-auto px-4 pb-4 animate-slide-up">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Enhanced Prompt</h3>
              <p className="text-xs text-gray-400">Crafted by Gemini AI for best image results</p>
            </div>
          </div>

          <button
            onClick={onCopy}
            aria-label="Copy enhanced prompt to clipboard"
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg
              border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500
              ${copied
                ? 'bg-green-50 border-green-200 text-green-700'
                : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50'
              }`}
          >
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>

        {/* Prompt body */}
        <div className="px-6 py-5">
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
            {prompt}
          </p>
        </div>
      </div>
    </section>
  )
})

export default PromptCard
