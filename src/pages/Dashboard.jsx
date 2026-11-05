import { useState } from 'react'
import AgentCard from '../components/AgentCard.jsx'
import AgentDialog from '../components/AgentDialog.jsx'
import { agents } from '../data/agents.js'
import orb from '../assets/hero-orb.jpg'

export default function Dashboard() {
  const [selectedId, setSelectedId] = useState(null)
  const selectedAgent = agents.find((agent) => agent.id === selectedId)

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Agent Explorer home">Agent<span className="text-gradient">Explorer</span></a>
        <a className="browse-link" href="#agents">Browse agents</a>
      </header>
      <main>
        <section className="intro" aria-labelledby="page-title">
          <div className="intro-copy">
            <p className="eyebrow">Voice AI on demand</p>
            <h1 id="page-title">Call the right <span className="text-gradient">agent</span>, whenever you need it.</h1>
            <p className="hero-description">Real estate, travel, groceries and more &mdash; pick an agent and it joins you instantly.</p>
            <a className="explore-link" href="#agents">Explore agents</a>
          </div>
          <img className="hero-orb" src={orb} alt="Glowing green voice agent orb" width="768" height="768" fetchPriority="high" />
        </section>
        <section className="agents-section" id="agents" aria-labelledby="agents-title">
          <h2 id="agents-title">Available agents</h2>
          <div className="agent-grid">
            {agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} onSelect={setSelectedId} />
            ))}
          </div>
        </section>
      </main>
      {selectedAgent && <AgentDialog key={selectedId} agent={selectedAgent} onClose={() => setSelectedId(null)} />}
    </div>
  )
}
