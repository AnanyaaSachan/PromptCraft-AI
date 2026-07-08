import axios from 'axios'

/**
 * Axios instance for the PromptCraft AI backend.
 *
 * - Dev: Vite proxy forwards /api → http://localhost:5000/api
 * - Prod: VITE_API_URL points directly to the Render backend
 */
const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 90000, // 90s — image generation can be slow
})

// Response interceptor — normalise errors into plain messages
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!navigator.onLine) {
      return Promise.reject(new Error('No internet connection. Please check your network.'))
    }
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('Request timed out. The server may be busy — please try again.'))
    }
    const message =
      error?.response?.data?.error ||
      error?.message ||
      'An unexpected error occurred.'
    return Promise.reject(new Error(message))
  }
)

/**
 * generateImage — POST /api/generate
 * @param {string} userInput
 * @returns {Promise<{ success: boolean, originalPrompt: string, enhancedPrompt: string, imageUrl: string }>}
 */
export async function generateImage(userInput) {
  const response = await apiClient.post('/generate', { userInput })
  return response.data
}

export default apiClient
