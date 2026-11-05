import { agents } from '../data/agents.js'

export const MAX_PROMPT_LENGTH = 4000

// Replace this local demo with a call to your own backend, never a secret API key.
export async function sendAgentMessage({ agentId, prompt }) {
  const agent = agents.find((item) => item.id === agentId)

  if (!agent) throw new Error('Please select a valid agent.')
  if (typeof prompt !== 'string' || !prompt.trim()) {
    throw new Error('Please enter a message.')
  }
  if (prompt.trim().length > MAX_PROMPT_LENGTH) {
    throw new Error(`Please keep your message under ${MAX_PROMPT_LENGTH + 1} characters.`)
  }

  return {
    role: 'assistant',
    content: `This is a local demo of the ${agent.name.toLowerCase()}, not an AI-generated answer.\n\nYour message: "${prompt.trim()}"\n\nConnect the agent service to your backend to enable real AI responses.`,
  }
}
