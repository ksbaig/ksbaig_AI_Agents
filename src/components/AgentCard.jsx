export default function AgentCard({ agent, onSelect }) {
  return (
    <button
      type="button"
      className="agent-card"
      aria-haspopup="dialog"
      onClick={() => onSelect(agent.id)}
    >
      <span className="agent-icon" aria-hidden="true">{agent.emoji}</span>
      <span className="agent-category">{agent.category}</span>
      <h3>{agent.name}</h3>
      <p>{agent.description}</p>
      <span className="call-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <rect x="9" y="2" width="6" height="12" rx="3" />
          <path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8" />
        </svg>
        Call agent
      </span>
    </button>
  )
}
