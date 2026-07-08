import { useState, useCallback } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import PromptInput from '../../components/PromptInput/PromptInput'
import ExamplePrompts from '../../components/ExamplePrompts/ExamplePrompts'
import Loader from '../../components/Loader/Loader'
import PromptCard from '../../components/PromptCard/PromptCard'
import ImageCard from '../../components/ImageCard/ImageCard'
import ErrorAlert from '../../components/ErrorAlert/ErrorAlert'
import Toast from '../../components/Toast/Toast'
import { useGenerate } from '../../hooks/useGenerate'
import { copyToClipboard, downloadImage } from '../../utils/helpers'

function Home() {
  const [inputValue, setInputValue] = useState('')
  const [copied, setCopied] = useState(false)
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' })

  const { generate, isLoading, progressMessage, error, setError, enhancedPrompt, imageUrl } = useGenerate()

  const showToast = useCallback((message, type = 'success') => {
    setToast({ visible: false, message: '', type })
    requestAnimationFrame(() => setToast({ visible: true, message, type }))
  }, [])

  const handleGenerate = useCallback(async () => {
    if (!inputValue.trim()) return
    document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    await generate(inputValue)
  }, [inputValue, generate])

  const handleSelectExample = useCallback((prompt) => {
    setInputValue(prompt)
    document.getElementById('prompt-section')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const handleCopy = useCallback(async () => {
    if (!enhancedPrompt) return
    const ok = await copyToClipboard(enhancedPrompt)
    if (ok) {
      setCopied(true)
      showToast('Prompt copied to clipboard!', 'success')
      setTimeout(() => setCopied(false), 2500)
    } else {
      showToast('Failed to copy — please try manually.', 'error')
    }
  }, [enhancedPrompt, showToast])

  const handleDownload = useCallback(() => {
    if (!imageUrl) return
    downloadImage(imageUrl, 'promptcraft-image.png')
    showToast('Image download started!', 'success')
  }, [imageUrl, showToast])

  const handleRegenerate = useCallback(() => {
    if (!inputValue.trim()) return
    generate(inputValue)
  }, [inputValue, generate])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <Hero />

      <main className="flex-1 w-full max-w-3xl mx-auto" id="main-content">
        <PromptInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onGenerate={handleGenerate}
          isLoading={isLoading}
        />

        {!isLoading && !enhancedPrompt && (
          <ExamplePrompts onSelect={handleSelectExample} />
        )}

        <div id="results-section" />

        {error && !isLoading && (
          <ErrorAlert message={error} type="api" onDismiss={() => setError(null)} />
        )}

        {isLoading && <Loader message={progressMessage} />}

        {!isLoading && enhancedPrompt && (
          <PromptCard prompt={enhancedPrompt} onCopy={handleCopy} copied={copied} />
        )}

        {!isLoading && (enhancedPrompt || imageUrl) && (
          <ImageCard
            imageUrl={imageUrl}
            onDownload={handleDownload}
            onRegenerate={enhancedPrompt ? handleRegenerate : undefined}
          />
        )}
      </main>

      <footer className="w-full bg-white border-t border-gray-100 py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-700">
              PromptCraft <span className="text-blue-600">AI</span>
            </span>
          </div>
          <p className="text-xs text-gray-400">
            Made with React 19, Gemini &amp; Pollinations AI · © {new Date().getFullYear()}
          </p>
        </div>
      </footer>

      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
      />
    </div>
  )
}

export default Home
