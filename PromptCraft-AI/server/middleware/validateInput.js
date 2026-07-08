import { logger } from '../utils/logger.js'

const MIN_LENGTH = 3
const MAX_LENGTH = 500

/**
 * validateInput — Middleware that validates the `userInput` field in the request body.
 *
 * Rules:
 *  - `userInput` must be present
 *  - Must be a non-empty string after trimming
 *  - Must be between MIN_LENGTH and MAX_LENGTH characters
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export function validateInput(req, res, next) {
  const { userInput } = req.body

  if (userInput === undefined || userInput === null) {
    logger.warn('[validateInput] Missing userInput field')
    return res.status(400).json({
      success: false,
      error: 'userInput is required',
    })
  }

  if (typeof userInput !== 'string') {
    logger.warn('[validateInput] userInput is not a string')
    return res.status(400).json({
      success: false,
      error: 'userInput must be a string',
    })
  }

  const trimmed = userInput.trim()

  if (trimmed.length === 0) {
    logger.warn('[validateInput] userInput is empty after trim')
    return res.status(400).json({
      success: false,
      error: 'userInput is required',
    })
  }

  if (trimmed.length < MIN_LENGTH) {
    return res.status(400).json({
      success: false,
      error: `userInput must be at least ${MIN_LENGTH} characters long`,
    })
  }

  if (trimmed.length > MAX_LENGTH) {
    return res.status(400).json({
      success: false,
      error: `userInput must not exceed ${MAX_LENGTH} characters`,
    })
  }

  // Attach trimmed value so controller always gets clean input
  req.body.userInput = trimmed

  next()
}
