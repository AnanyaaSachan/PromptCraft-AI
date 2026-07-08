import { logger } from '../utils/logger.js'

// ---------------------------------------------------------------------------
// Pollinations AI — free, no API key required
// Swap this base URL to point at a different provider (OpenAI, Stability AI,
// Google Imagen, etc.) without touching the controller or frontend.
// ---------------------------------------------------------------------------
const POLLINATIONS_BASE_URL = 'https://image.pollinations.ai/prompt'

/**
 * generateImage — Builds a Pollinations AI image URL from a professional prompt.
 *
 * Pollinations generates the image on-demand when the URL is loaded, so we
 * simply construct and return the URL — no HTTP request needed here.
 *
 * @param {string} prompt - The professional prompt (from Gemini).
 * @returns {Promise<string>} The fully-encoded image URL.
 */
export async function generateImage(prompt) {
  if (!prompt || !prompt.trim()) {
    throw new Error('A prompt is required to generate an image.')
  }

  logger.info(`[imageService] Building Pollinations URL for prompt (${prompt.length} chars)`)

  const encodedPrompt = encodeURIComponent(prompt.trim())
  const imageUrl = `${POLLINATIONS_BASE_URL}/${encodedPrompt}`

  logger.success(`[imageService] Image URL constructed — ${imageUrl.slice(0, 80)}…`)

  return imageUrl
}
