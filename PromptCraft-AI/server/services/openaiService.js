import openaiClient from '../config/openai.js'
import { logger } from '../utils/logger.js'

/**
 * enhancePrompt — Uses GPT-4.1 to transform a simple user idea into a
 * detailed, professional image generation prompt.
 *
 * @param {string} userInput - The user's plain-language idea.
 * @returns {Promise<string>} The enhanced, detailed prompt.
 */
export async function enhancePrompt(userInput) {
  logger.info(`[openaiService] enhancePrompt called — input: "${userInput.slice(0, 60)}…"`)

  // TODO: Implement GPT-4.1 prompt enhancement
  // Example implementation (Phase 2):
  //
  // const completion = await openaiClient.chat.completions.create({
  //   model: 'gpt-4.1',
  //   messages: [
  //     {
  //       role: 'system',
  //       content: `You are an expert AI image prompt engineer. Transform the user's simple
  //                 idea into a rich, detailed, professional image generation prompt.
  //                 Include: artistic style, lighting, mood, colors, composition, and detail.
  //                 Keep the prompt under 200 words. Return only the prompt, no explanation.`,
  //     },
  //     { role: 'user', content: userInput },
  //   ],
  //   max_tokens: 300,
  //   temperature: 0.8,
  // })
  // return completion.choices[0].message.content.trim()

  // Placeholder return for Phase 1
  return `[Phase 2 TODO] Enhanced version of: "${userInput}"`
}

/**
 * generateImageFromPrompt — Uses the OpenAI Images API to generate an image
 * from the enhanced prompt.
 *
 * @param {string} enhancedPrompt - The detailed prompt produced by GPT-4.1.
 * @returns {Promise<string>} The URL of the generated image.
 */
export async function generateImageFromPrompt(enhancedPrompt) {
  logger.info(`[openaiService] generateImageFromPrompt called`)

  // TODO: Implement OpenAI Images API call
  // Example implementation (Phase 3):
  //
  // const response = await openaiClient.images.generate({
  //   model: 'dall-e-3',
  //   prompt: enhancedPrompt,
  //   n: 1,
  //   size: '1024x1024',
  //   quality: 'standard',
  //   response_format: 'url',
  // })
  // return response.data[0].url

  // Placeholder return for Phase 1
  return 'https://via.placeholder.com/1024x1024?text=Phase+3+TODO'
}
