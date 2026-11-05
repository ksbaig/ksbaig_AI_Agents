import assert from 'node:assert/strict'
import test from 'node:test'
import { agents } from '../src/data/agents.js'
import { MAX_PROMPT_LENGTH, sendAgentMessage } from '../src/services/agentService.js'

test('landing directory contains ten distinct complete agent profiles', () => {
  assert.equal(agents.length, 10)
  assert.equal(new Set(agents.map((agent) => agent.id)).size, 10)
  assert.deepEqual(agents.map((agent) => agent.name), [
    'Ava', 'Leo', 'Mira', 'Omar', 'Sara', 'Max', 'Nova', 'Atlas', 'Lex', 'Ruby',
  ])
  for (const agent of agents) {
    for (const field of ['id', 'name', 'category', 'emoji', 'description', 'greeting']) {
      assert.equal(typeof agent[field], 'string')
      assert.ok(agent[field].trim())
    }
  }
})

test('every starter agent returns an explicitly labeled demo response', async () => {
  for (const agent of agents) {
    const reply = await sendAgentMessage({ agentId: agent.id, prompt: ' Hello ' })
    assert.deepEqual(Object.keys(reply).sort(), ['content', 'role'])
    assert.equal(reply.role, 'assistant')
    assert.ok(reply.content.includes(agent.name.toLowerCase()))
    assert.ok(reply.content.includes('local demo'))
    assert.ok(reply.content.includes('"Hello"'))
  }
})

test('rejects unknown agents and empty or non-string prompts', async () => {
  await assert.rejects(sendAgentMessage({ agentId: 'unknown', prompt: 'Hello' }), /valid agent/)
  for (const prompt of ['', '   ', null, undefined, 12]) {
    await assert.rejects(sendAgentMessage({ agentId: agents[0].id, prompt }), /enter a message/)
  }
})

test('accepts the exact prompt limit and rejects longer input', async () => {
  const input = { agentId: agents[0].id, prompt: 'a'.repeat(MAX_PROMPT_LENGTH) }
  assert.equal((await sendAgentMessage(input)).role, 'assistant')
  await assert.rejects(sendAgentMessage({ ...input, prompt: `${input.prompt}a` }), /characters/)
})
