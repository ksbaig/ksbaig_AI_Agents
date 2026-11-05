import { useState } from 'react'
import { useAgentChat } from '../hooks/useAgentChat.js'
import { MAX_PROMPT_LENGTH } from '../services/agentService.js'

export default function ChatPanel({ agent }) {
  const [prompt, setPrompt] = useState('')
  const { messages, isLoading, error, sendMessage, clearMessages } = useAgentChat(agent.id)

  async function handleSubmit(event) {
    event.preventDefault()
    if (await sendMessage(prompt)) setPrompt('')
  }

  return (
    <section className="workspace" aria-labelledby="chat-title">
      <div className="section-heading">
        <div>
          <h2 id="chat-title">{agent.name}</h2>
          <p className="muted">Try the local demo conversation.</p>
        </div>
        <button className="secondary-button" type="button" onClick={clearMessages} disabled={isLoading || messages.length === 0}>
          Clear chat
        </button>
      </div>
      <div className="conversation" role="log" aria-label="Conversation" aria-live="polite" aria-busy={isLoading}>
        {messages.length === 0 ? (
          <div className="empty-state">
            <span className="agent-icon" aria-hidden="true">{agent.emoji}</span>
            <h2>Your next idea starts here</h2>
            <p className="muted">Send a message to explore the starter chat flow.</p>
          </div>
        ) : messages.map((message, index) => (
          <article className={`message ${message.role}`} key={index}>
            <strong>{message.role === 'user' ? 'You' : agent.name}</strong>
            <p>{message.content}</p>
          </article>
        ))}
      </div>
      <form className="composer" onSubmit={handleSubmit}>
        <label htmlFor="prompt">Your message</label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="What would you like to work on?"
          maxLength={MAX_PROMPT_LENGTH}
          required
          disabled={isLoading}
          aria-describedby={error ? 'chat-error' : undefined}
        />
        {error && <p className="error" id="chat-error" role="alert">{error}</p>}
        <div className="composer-footer">
          <small>Demo mode. No AI provider is connected.</small>
          <button className="primary-button" type="submit" disabled={isLoading || !prompt.trim()}>
            {isLoading ? 'Sending...' : 'Send message'}
          </button>
        </div>
      </form>
    </section>
  )
}
