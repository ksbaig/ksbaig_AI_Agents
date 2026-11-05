import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Mic, PhoneOff, X } from "lucide-react";
import orb from "@/assets/hero-orb.jpg";
import { agents, type Agent } from "@/lib/agents";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Agent Explorer — Call Voice AI Agents" },
      { name: "description", content: "Explore and call voice AI agents for real estate, travel, grocery ordering and more." },
      { property: "og:title", content: "Agent Explorer — Call Voice AI Agents" },
      { property: "og:description", content: "Explore and call voice AI agents for real estate, travel, grocery ordering and more." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [active, setActive] = useState<Agent | null>(null);

  const backToMenu = () => {
    setActive(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-hero text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="font-display text-xl font-bold">
          Agent<span className="text-gradient">Explorer</span>
        </span>
        <a href="#agents" className="rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary">
          Browse agents
        </a>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-12 md:grid-cols-2">
        <div>
          <p className="mb-4 text-sm uppercase tracking-widest text-primary">Voice AI on demand</p>
          <h1 className="text-5xl font-extrabold leading-tight md:text-6xl">
            Call the right <span className="text-gradient">agent</span>, whenever you need it.
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Real estate, travel, groceries and more — pick an agent and it joins you instantly.
          </p>
          <a href="#agents" className="mt-8 inline-block rounded-full bg-gradient-primary px-7 py-3 font-semibold text-primary-foreground shadow-glow">
            Explore agents
          </a>
        </div>
        <img src={orb} alt="Glowing voice agent orb" width={1024} height={1024} className="mx-auto w-full max-w-md rounded-full shadow-glow" />
      </section>

      <section id="agents" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-8 text-3xl font-bold">Available agents</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((a) => (
            <button
              key={a.id}
              onClick={() => setActive(a)}
              className="group rounded-2xl border border-border bg-card p-6 text-left transition hover:-translate-y-1 hover:border-primary hover:shadow-glow"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-primary text-3xl">{a.emoji}</div>
              <p className="text-xs uppercase tracking-wider text-primary">{a.category}</p>
              <h3 className="mt-1 text-xl font-semibold">{a.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.tagline}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent">
                <Mic className="h-4 w-4" /> Call agent
              </span>
            </button>
          ))}
        </div>
      </section>

      {active && <AgentWindow agent={active} onClose={() => setActive(null)} onBackToMenu={backToMenu} />}
    </div>
  );
}

function AgentWindow({ agent, onClose, onBackToMenu }: { agent: Agent; onClose: () => void; onBackToMenu: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-3xl border border-primary/40 bg-card p-10 text-center shadow-glow">
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
          <X />
        </button>
        <div className="relative mx-auto mb-6 h-32 w-32">
          <span className="absolute inset-0 rounded-full bg-gradient-primary animate-pulse-ring" />
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-primary text-6xl">{agent.emoji}</div>
        </div>
        <p className="text-xs uppercase tracking-wider text-primary">{agent.category}</p>
        <h2 className="mt-1 text-3xl font-bold">{agent.name}</h2>
        <p className="mt-6 rounded-2xl bg-secondary p-4 text-secondary-foreground">"{agent.greeting}"</p>
        <p className="mt-4 text-sm text-muted-foreground">Listening… (live voice coming soon)</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button onClick={onBackToMenu} className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-semibold hover:bg-secondary">
            <ArrowLeft className="h-4 w-4" /> Back to main menu
          </button>
          <button onClick={onClose} className="inline-flex items-center gap-2 rounded-full bg-destructive px-6 py-3 font-semibold text-destructive-foreground">
            <PhoneOff className="h-4 w-4" /> End call
          </button>
        </div>
      </div>
    </div>
  );
}
