/**
 * helpers.js — Shared utility functions for PromptCraft AI.
 */

// ---------------------------------------------------------------------------
// Clipboard
// ---------------------------------------------------------------------------

/**
 * copyToClipboard — Copies a text string to the system clipboard.
 * Uses the modern Clipboard API with a legacy execCommand fallback.
 *
 * @param {string} text - The text to copy.
 * @returns {Promise<boolean>} Resolves to true on success, false on failure.
 */
export async function copyToClipboard(text) {
  if (!text) return false

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }

    // Fallback for older browsers / non-HTTPS contexts
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'absolute'
    textarea.style.left = '-9999px'
    textarea.style.top = '-9999px'
    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()
    const success = document.execCommand('copy')
    document.body.removeChild(textarea)
    return success
  } catch (err) {
    console.error('[copyToClipboard] Failed:', err)
    return false
  }
}

// ---------------------------------------------------------------------------
// Image download
// ---------------------------------------------------------------------------

/**
 * downloadImage — Triggers a browser download for an image URL.
 * For cross-origin URLs it attempts a fetch + blob approach to force download.
 *
 * @param {string} url - The image URL to download.
 * @param {string} [filename='promptcraft-image.png'] - Suggested file name.
 * @returns {Promise<void>}
 */
export async function downloadImage(url, filename = 'promptcraft-image.png') {
  if (!url) return

  try {
    const response = await fetch(url)
    const blob = await response.blob()
    const objectUrl = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = objectUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Free the object URL after a short delay
    setTimeout(() => URL.revokeObjectURL(objectUrl), 5000)
  } catch (err) {
    // Fallback: open image in new tab if fetch fails (e.g. CORS)
    console.warn('[downloadImage] Blob download failed, opening in new tab:', err)
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}

// ---------------------------------------------------------------------------
// String utilities
// ---------------------------------------------------------------------------

/**
 * truncate — Shortens a string to a maximum length with an ellipsis.
 *
 * @param {string} str - Input string.
 * @param {number} [maxLength=100] - Maximum character count.
 * @returns {string}
 */
export function truncate(str, maxLength = 100) {
  if (!str || str.length <= maxLength) return str
  return str.slice(0, maxLength - 3) + '…'
}

/**
 * formatTimestamp — Returns a human-readable timestamp string.
 *
 * @param {Date|string|number} [date=new Date()] - Date to format.
 * @returns {string}
 */
export function formatTimestamp(date = new Date()) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}
