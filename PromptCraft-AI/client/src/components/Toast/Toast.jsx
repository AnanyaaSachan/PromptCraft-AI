import { useEffect, useState } from 'react'

/**
 * Toast — Fixed bottom notification.
 *
 * @param {object} props
 * @param {string} props.message
 * @param {'success'|'error'|'info'} [props.type='success']
 * @param {boolean} props.visible
 * @param {function} [props.onClose]
 * @param {number} [props.duration=3000]
 */
function Toast({ message, type = 'success', visible, onClose, duration = 3000 }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!visible) return
    setShow(true)
    const timer = setTimeout(() => {
      setShow(false)
      onClose?.()
    }, duration)
    return () => clearTimeout(timer)
  }, [visible, duration, onClose])

  if (!show) return null

  const styles = {
    success: { bg: 'bg-gray-900', icon: (
      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
    )},
    error: { bg: 'bg-gray-900', icon: (
      <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    )},
    info: { bg: 'bg-gray-900', icon: (
      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
  }

  const { bg, icon } = styles[type] ?? styles.success

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3
        px-4 py-3 rounded-xl shadow-xl text-sm font-medium text-white
        animate-slide-up ${bg} max-w-sm w-auto`}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span className="flex-1">{message}</span>
      <button
        onClick={() => { setShow(false); onClose?.() }}
        aria-label="Close notification"
        className="flex-shrink-0 ml-1 text-white/50 hover:text-white transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

export default Toast
