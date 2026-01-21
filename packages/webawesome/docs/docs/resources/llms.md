---
title: LLMs
description: Web Awesome provides an llms.txt file to help AI assistants understand and work with our components.
layout: page-outline
---

The [llms.txt specification](https://llmstxt.org/) is a proposed standard for providing information to large language models (LLMs) in a format they can easily consume. It's like a robots.txt, but instead of telling search engines how to crawl your site, it helps AI assistants understand your project.

Web Awesome publishes an `llms.txt` file that provides AI tools with structured information about our components, including their APIs, properties, events, methods, slots, and CSS custom properties.

:::warning
This feature is experimental! The llms.txt format and its contents may change as we refine the output based on feedback and evolving AI capabilities.
:::

## Why Use It?

When working with AI coding assistants like Claude, ChatGPT, Copilot, or Cursor, you can reference the llms.txt file to give the AI context about Web Awesome components. This can lead to more accurate code suggestions and fewer hallucinations when the AI generates Web Awesome code.

## Accessing the File

The llms.txt file is available in every Web Awesome build at:

```
/dist/llms.txt
/dist-cdn/llms.txt
```

You can also find it in your `node_modules` directory if you've installed Web Awesome via npm:

```
node_modules/@awesome.me/webawesome/dist/llms.txt
```

## How to Use It

How you reference the file depends on which AI tool you're using.

### Claude Projects

If you're using [Claude Projects](https://www.anthropic.com/news/projects), you can add the llms.txt URL to your project knowledge. Claude will use this context when helping you write Web Awesome code.

### Cursor

In [Cursor](https://cursor.sh/), you can add the file to your project's documentation sources via **Cursor Settings > Features > Docs**. You can also reference the file directly in chat using `@Docs` after adding it, or paste the content into the chat context.

### VS Code + Copilot

GitHub Copilot in VS Code doesn't have a built-in way to reference external documentation files, but you can:

1. Copy the llms.txt file into your project's root directory
2. Open it in a VS Code tab (Copilot considers open files as context)
3. Use `#file` in Copilot Chat to explicitly reference it (e.g., `#file:llms.txt how do I create a dialog?`)

### VS Code + Claude Code

If you're using the [Claude Code extension](https://marketplace.visualstudio.com/items?itemName=anthropics.claude-code), you can reference the file directly by path:

```
@node_modules/@awesome.me/webawesome/dist/llms.txt
```

Or simply ask Claude to read it — Claude Code can access files in your project directly.

### Other AI Tools

Most AI coding assistants allow you to provide context through URLs, file uploads, or direct pasting. Check your tool's documentation for the best way to include external references.

## What's Included

The llms.txt file contains:

- An overview of Web Awesome and its capabilities
- Links to documentation sections
- A complete list of all components with descriptions
- Detailed API reference for each component including:
  - Slots
  - Properties and their types
  - Methods and their signatures
  - Events
  - CSS custom properties
  - CSS parts
  - CSS states

## Feedback

Since this is experimental, we'd love to hear how it works for you! If you find issues with the generated content or have suggestions for improvement, please [open an issue on GitHub](https://github.com/shoelace-style/webawesome/issues).
