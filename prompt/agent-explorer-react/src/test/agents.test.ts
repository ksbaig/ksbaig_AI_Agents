import { describe, expect, it } from "vitest";

import { agents } from "@/lib/agents";

describe("Agent catalogue", () => {
  it("includes the geospatial, AI software, legal and matchmaking agents", () => {
    const byId = Object.fromEntries(agents.map((a) => [a.id, a]));

    expect(byId["geospatial"]).toMatchObject({ category: "Geospatial", emoji: "🌍" });
    expect(byId["ai-software"]).toMatchObject({ category: "AI Software", emoji: "🤖" });
    expect(byId["legal"]).toMatchObject({ category: "Legal", emoji: "⚖️" });
    expect(byId["matchmaking"]).toMatchObject({ category: "Matchmaking", emoji: "💞" });
  });

  it("keeps every agent callable with a name, tagline and greeting", () => {
    for (const a of agents) {
      expect(a.name.length, a.id).toBeGreaterThan(0);
      expect(a.tagline.length, a.id).toBeGreaterThan(0);
      expect(a.greeting, a.id).toContain(a.name);
    }
  });
});
