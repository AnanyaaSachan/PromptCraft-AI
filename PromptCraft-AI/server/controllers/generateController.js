import { enhancePrompt } from '../services/geminiService.js'
import { generateImage } from '../services/imageService.js'
import { logger } from '../utils/logger.js'

/**
 * generate — Controller for POST /api/generate.
 *
 * Full pipeline:
 *   1. Receive and validate user input (handled by validateInput middleware)
 *   2. Enhance the prompt using Google Gemini
 *   3. Generate an image URL using Pollinations AI
 *   4. Return { success, originalPrompt, enhancedPrompt, imageUrl }
 *
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function generate(req, res, next) {
  try {
    const { userInput } = req.body  // already trimmed by validateInput middleware

    logger.info(`[controller] Request received — "${userInput.slice(0, 60)}…"`)

    // Step 1 — Enhance the prompt with Gemini
    const enhancedPrompt = await enhancePrompt(userInput)

    // Step 2 — Generate image URL with Pollinations AI
    const imageUrl = await generateImage(enhancedPrompt)

    logger.info('[controller] Pipeline complete — returning response')

    return res.status(200).json({
      success: true,
      originalPrompt: userInput,
      enhancedPrompt,
      imageUrl,
    })
  } catch (error) {
    logger.error(`[controller] Pipeline error: ${error.message}`)
    next(error)
  }
}

// Keep the old export name so the route file doesn't need to change
export { generate as generateImage }
