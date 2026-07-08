/**
 * Hero — Landing section with headline, subheading, and CTA buttons.
 * @param {object} props
 * @param {function} [props.onTryIt] - Scrolls to the prompt input section.
 */
function Hero({ onTryIt }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    if (onTryIt) onTryIt()
  }

  return (
    <section className="w-full bg-white pt-20 pb-16 px-4 border-b border-gray-100">
      <div className="max-w-4xl mx-auto text-center animate-fade-in">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-8 border border-blue-100">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
          Powered by OpenAI GPT-4.1 &amp; Images API
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
          Turn Simple Ideas Into{' '}
          <span className="text-blue-600">Professional AI Images</span>
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
          Describe your idea in plain English. PromptCraft AI will craft a detailed
          prompt and generate a stunning, high-quality image — instantly.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => scrollTo('prompt-section')}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Try It Free
          </button>
          <button
            onClick={() => scrollTo('examples-section')}
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-xl border border-gray-200 transition-all duration-200 text-sm sm:text-base"
          >
            See Examples
          </button>
        </div>

        {/* Trust line */}
        <p className="mt-8 text-xs text-gray-400 tracking-wide">
          No account required &nbsp;·&nbsp; No credit card &nbsp;·&nbsp; Results in seconds
        </p>
      </div>
    </section>
  )
}

export default Hero
