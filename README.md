# Agent Explorer

A React JavaScript application using Vite, with a dark green landing page,
the supplied hero orb, and ten agent profiles adapted from the reference in
`prompt/agent-explorer-react`. Browse agents or Explore agents scrolls to the
directory. Call agent opens a keyboard-accessible dialog with the agent's greeting
and separate Chat / Voice agent options; Escape, Close preview, or Back to main
menu closes it. No AI provider, backend, authentication, or database is
connected yet. Demo replies are fixed templates, not AI-generated answers.

## Browser voice demo

Select an agent, choose **Voice agent**, then **Start microphone**. Allow the
browser microphone permission, speak in English, and stop recording to review the
transcript. Choose **Send & hear reply** to display and speak a demo reply.
**Stop speaking** cancels playback. Recording is never started automatically.
Switching modes or closing the dialog aborts recording and cancels playback.
Mode changes discard that mode's conversation/transcript.

Speech recognition uses the browser Web Speech API (including the prefixed
Chrome/Edge implementation). Use HTTPS or localhost; support varies by browser.
The browser speech service may send audio to its provider and require internet.
Permission, device, and speech-service errors appear in the voice panel.
Unsupported browsers can type messages; spoken replies require speech synthesis.
This is not a real-time AI voice call. Real AI still requires a backend/provider.

## Getting started

Use Node.js 22.18+ (or a newer supported LTS release) and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create the production build in `dist` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |
| `npm test` | Run service tests using Node's built-in test runner |

Lint and test commands target the application, not the separate reference
project in `prompt/agent-explorer-react`.

## Project structure

```text
public/                  Static public assets
src/
  assets/                Imported images and other assets
  components/            AgentCard, AgentDialog, and ChatPanel UI
  data/                  Starter agent definitions
  hooks/                 Chat state and request lifecycle
  pages/                 Dashboard page
  services/              Agent service integration boundary
  App.jsx                Root application component
  App.css                Application styles
  index.css              Global styles
  main.jsx               React entry point
tests/                   Agent service tests
index.html               HTML entry point
vite.config.js           Vite configuration
```

## Building real AI agents

1. Add or edit agents in `src/data/agents.js`.
2. Create a separate backend with an agent/chat endpoint.
3. Keep provider API keys and system instructions on the backend. Never place
   secrets in React code or `VITE_*` variables: those values are public.
4. Replace `sendAgentMessage` in `src/services/agentService.js` with a request to
   that backend. Preserve its `{ role: 'assistant', content: string }` result
   shape, validate responses, and throw descriptive errors on failures.
5. Let the backend validate agent IDs, manage conversation history and tools,
   enforce authentication and rate limits, and call your selected AI provider.

Chat history is held only in React memory. Closing an agent dialog, reloading, or
using Clear chat discards it. The current service sends a single prompt, not history.
Extend the service contract and backend together when adding multi-turn AI chat.
