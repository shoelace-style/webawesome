---
question: Can AI tools use the Web Awesome docs?
order: 100
synonyms: [ai, llms.txt, claude, cursor, copilot, agent]
source: webawesome/docs/docs/ai/index.md; webawesome/docs/docs/ai/llms.md
---
Yes, in two machine-readable formats. There's an <a href="/docs/ai/agent-skills">Agent Skill</a> for tools that support it, which loads only the documentation the task at hand needs, and an <a href="/docs/ai/llms">llms.txt</a> file with the full API reference in one text file. Both are generated with every build, so they land in your <code>node_modules</code> when you install from npm. The llms.txt format is still experimental, so let us know how it goes. Start at <a href="/docs/ai/">Using Web Awesome with AI</a>.
