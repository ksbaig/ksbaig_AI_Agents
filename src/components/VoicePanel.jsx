import { useVoiceAgent } from '../hooks/useVoiceAgent.js'
import { MAX_PROMPT_LENGTH } from '../services/agentService.js'

const statusLabels = {
  idle: 'Ready. Start the microphone or type a message.',
  starting: 'Waiting for microphone permission...',
  listening: 'Listening. Speak now, then stop to review your message.',
  processing: 'Preparing a demo reply...',
  speaking: 'Speaking the demo reply...',
}

export default function VoicePanel({ agent }) {
  const voice = useVoiceAgent(agent.id)
  const recording = voice.status === 'starting' || voice.status === 'listening'
  const busy = voice.status !== 'idle'

  return (
    <section className="workspace voice-panel" aria-labelledby="voice-title">
      <div className="section-heading">
        <div>
          <h2 id="voice-title">Voice agent</h2>
          <p className="muted">Talk to {agent.name} using browser speech.</p>
        </div>
        <span className="voice-badge">Demo</span>
      </div>
      <div className="voice-content">
        <p className="muted" id="voice-privacy">Your microphone starts only when you choose Start microphone. Your browser's speech service may send audio to its provider. No real AI call is made.</p>
        {!voice.canListen && <p className="support-notice" role="status">Speech recognition is unavailable. Try Chrome or Edge on HTTPS or localhost, or type below.</p>}
        {!voice.canSpeak && <p className="support-notice" role="status">Spoken replies are unavailable in this browser. Text replies still work.</p>}
        <p className="voice-status" role="status">{statusLabels[voice.status]}</p>
        <div className="voice-controls">
          {recording ? (
            <button type="button" className="end-button" onClick={voice.stopListening}>Stop microphone</button>
          ) : (
            <button type="button" className="secondary-button" disabled={!voice.canListen || busy} onClick={voice.startListening} aria-describedby="voice-privacy">Start microphone</button>
          )}
          {voice.status === 'speaking' && <button type="button" className="end-button" onClick={voice.stopSpeaking}>Stop speaking</button>}
        </div>
        <form className="voice-form" onSubmit={(event) => { event.preventDefault(); void voice.sendMessage() }}>
          <label htmlFor="voice-transcript">Your message (review before sending)</label>
          <textarea
            id="voice-transcript"
            value={voice.transcript}
            onChange={(event) => voice.setTranscript(event.target.value)}
            placeholder="Record your voice or type here..."
            maxLength={MAX_PROMPT_LENGTH}
            disabled={busy}
            required
            aria-describedby={voice.error ? 'voice-error' : undefined}
          />
          <div className="composer-footer">
            <small>English speech. Replies are demo templates, not AI answers.</small>
            <button className="primary-button" type="submit" disabled={busy || !voice.transcript.trim()}>
              {voice.canSpeak ? 'Send & hear reply' : 'Send message'}
            </button>
          </div>
        </form>
        {voice.error && <p className="error" id="voice-error" role="alert">{voice.error}</p>}
        {voice.reply && <article className="message voice-reply" aria-live="polite"><strong>{agent.name} (demo)</strong><p>{voice.reply}</p></article>}
      </div>
    </section>
  )
}
