import { useEffect, useRef, useState } from 'react'
import ChatPanel from './ChatPanel.jsx'
import VoicePanel from './VoicePanel.jsx'

export default function AgentDialog({ agent, onClose }) {
  const dialogRef = useRef(null)
  const [mode, setMode] = useState('chat')

  useEffect(() => {
    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow
    const previousFocus = document.activeElement
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    dialog.showModal()
    return () => {
      dialog.close()
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      if (previousFocus instanceof HTMLElement) previousFocus.focus()
    }
  }, [onClose])

  return (
    <dialog
      ref={dialogRef}
      className="agent-dialog"
      aria-labelledby="dialog-title"
      aria-describedby="voice-status"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
    >
      <button className="close-button" type="button" aria-label="Close agent" onClick={onClose}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="m6 6 12 12M6 18 18 6" />
        </svg>
      </button>
      <div className="dialog-intro">
        <span className="dialog-avatar" aria-hidden="true">{agent.emoji}</span>
        <p className="agent-category">{agent.category}</p>
        <h2 id="dialog-title">{agent.name}</h2>
        <p className="agent-greeting">{agent.greeting}</p>
        <p className="muted" id="voice-status">Demo preview. Choose text chat or browser voice. No live AI provider is connected.</p>
      </div>
      <div className="mode-selector" role="group" aria-label="Conversation mode">
        <button className="mode-button" type="button" aria-pressed={mode === 'chat'} onClick={() => setMode('chat')}>Chat</button>
        <button className="mode-button" type="button" aria-pressed={mode === 'voice'} onClick={() => setMode('voice')}>Voice agent</button>
      </div>
      {mode === 'chat' ? <ChatPanel agent={agent} /> : <VoicePanel agent={agent} />}
      <div className="dialog-actions">
        <button className="secondary-button" type="button" onClick={onClose}>Back to main menu</button>
        <button className="end-button" type="button" onClick={onClose}>Close preview</button>
      </div>
    </dialog>
  )
}
