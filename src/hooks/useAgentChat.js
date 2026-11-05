import { useState } from 'react'
import { sendAgentMessage } from '../services/agentService.js'

export function useAgentChat(agentId) {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function sendMessage(prompt) {
    if (isLoading) return false

    setError('')
    setIsLoading(true)
    try {
      const reply = await sendAgentMessage({ agentId, prompt })
      setMessages((current) => [
        ...current,
        { role: 'user', content: prompt.trim() },
        reply,
      ])
      return true
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to send your message. Please try again.')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  function clearMessages() {
    setMessages([])
    setError('')
  }

  return { messages, isLoading, error, sendMessage, clearMessages }
}
