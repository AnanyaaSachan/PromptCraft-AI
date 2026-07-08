/**
 * ExamplePrompts — A grid of clickable example prompts that populate the textarea.
 *
 * @param {object} props
 * @param {function} props.onSelect - Called with the selected prompt string.
 */

const EXAMPLES = [
  {
    label: 'Logo for my bakery',
    prompt: 'A warm and inviting logo for a modern artisan bakery with wheat motifs and pastel colors',
    emoji: '🥐',
  },
  {
    label: 'Birthday invitation',
    prompt: 'A festive and elegant birthday party invitation with gold and pastel balloons, confetti, and floral accents',
    emoji: '🎂',
  },
  {
    label: 'Coffee shop menu',
    prompt: 'A stylish coffee shop menu board with vintage typography, hand-drawn illustrations of coffee cups and pastries',
    emoji: '☕',
  },
  {
    label: 'Fitness poster',
    prompt: 'A bold motivational fitness poster with a dynamic athlete silhouette, vibrant orange and black color scheme, and energetic typography',
    emoji: '💪',
  },
]

function ExamplePrompts({ onSelect }) {
  return (
    <section id="examples-section" className="w-full max-w-3xl mx-auto px-4 pb-8">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Try an example
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {EXAMPLES.map((ex) => (
          <button
            key={ex.label}
            onClick={() => onSelect(ex.prompt)}
            className="flex items-start gap-3 text-left px-4 py-3.5 bg-white border border-gray-200
              rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200
              group focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className="text-xl flex-shrink-0 mt-0.5" aria-hidden="true">{ex.emoji}</span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                {ex.label}
              </p>
              <p className="text-xs text-gray-400 mt-0.5 line-clamp-2 leading-relaxed">
                {ex.prompt}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}

export default ExamplePrompts
