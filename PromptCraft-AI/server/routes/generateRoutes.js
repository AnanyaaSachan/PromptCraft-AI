import { Router } from 'express'
import { generateImage } from '../controllers/generateController.js'
import { validateInput } from '../middleware/validateInput.js'

const router = Router()

/**
 * POST /api/generate
 *
 * Body: { userInput: string }
 * Response: { success: true, enhancedPrompt: string, imageUrl: string }
 */
router.post('/generate', validateInput, generateImage)

export default router
