import OpenAI from 'openai'

// OpenAI client — ready for GPT-4.1 and Images API integration
const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default openaiClient
