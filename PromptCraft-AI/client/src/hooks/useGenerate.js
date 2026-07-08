import { useState, useCallback, useRef } from 'react'
import { generateImage as generateImageApi } from '../services/api'

const PROGRESS_MESSAGES = [
  'Analyzing your idea…',
  'Enhancing your prompt…',
  'Designing your image…',
  'Adding creative details…',
  'Almost done…',
  'Generating your masterpiece…',
]

/**
 * useGenerate — Manages the full AI generation lifecycle.
 *
 * Returns:
 *  - generate(userInput)  — triggers Gemini + Pollinations pipeline
 *  - isLoading            — true while request is in flight
 *  - progressMessage      — rotating status string for the loading UI
 *  - error / setError     — error string or null
 *  - enhancedPrompt       — professional prompt from Gemini
 *  - imageUrl             — Pollinations image URL
 */
export function useGenerate() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [enhancedPrompt, setEnhancedPrompt] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [progressMessage, setProgressMessage] = useState(PROGRESS_MESSAGES[0])
  const progressIntervalRef = useRef(null)

  const startProgress = () => {
    let index = 0
    setProgressMessage(PROGRESS_MESSAGES[0])
    progressIntervalRef.current = setInterval(() => {
      index = (index + 1) % PROGRESS_MESSAGES.length
      setProgressMessage(PROGRESS_MESSAGES[index])
    }, 2200)
  }

  const stopProgress = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
      progressIntervalRef.current = null
    }
  }

  const generate = useCallback(async (userInput) => {
    if (!userInput?.trim()) {
      setError('Please enter an idea before generating.')
      return
    }

    setIsLoading(true)
    setError(null)
    setEnhancedPrompt(null)
    setImageUrl(null)
    startProgress()

    try {
      const data = await generateImageApi(userInput)
      setEnhancedPrompt(data.enhancedPrompt ?? null)
      setImageUrl(data.imageUrl ?? null)
    } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again.')
    } finally {
      stopProgress()
      setIsLoading(false)
    }
  }, [])

  return { generate, isLoading, progressMessage, error, setError, enhancedPrompt, imageUrl }
}

export default useGenerate
