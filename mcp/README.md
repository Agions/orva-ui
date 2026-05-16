# orva-ui MCP Server

Model Context Protocol (MCP) server for orva-ui component library. Enables AI programming assistants (Cursor, Claude Desktop, Cline, GitHub Copilot) to query component documentation, props, theme tokens, and source code.

## What is MCP?

[MCP](https://modelcontextprotocol.io) is an open protocol that standardizes how applications provide context to LLMs. With this server, your AI assistant can:

- Query any component's props, types, and usage examples
- Read component source code and type definitions
- Access theme tokens (colors, spacing, border-radius)
- Retrieve starter templates for new components
- Get suggestions for which component to use
- Compare components side-by-side

## Quick Start

### 1. Start the Server

```bash
npm run mcp
# or directly
npx tsx mcp/orva-ui-mcp.ts
```

The server communicates via stdio (standard input/output) as per MCP specification.

### 2. Configure Your AI Tool

#### Cursor

Create or edit `.cursor/mcp.json` in your project root:

```json
{
  "mcpServers": {
    "orva-ui": {
      "command": "npx",
      "args": ["tsx", "mcp/orva-ui-mcp.ts"],
      "cwd": "."
    }
  }
}
```

Restart Cursor. The orva-ui tools will appear in the AI panel.

#### Claude Desktop

Edit `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or equivalent:

```json
{
  "mcpServers": {
    "orva-ui": {
      "command": "npx",
      "args": ["tsx", "/absolute/path/to/orva-ui/mcp/orva-ui-mcp.ts"],
      "env": {}
    }
  }
}
```

#### VS Code + GitHub Copilot

Create `.vscode/mcp.json`:

```json
{
  "servers": {
    "orva-ui": {
      "type": "stdio",
      "command": "npx",
      "args": ["tsx", "mcp/orva-ui-mcp.ts"]
    }
  }
}
```

#### Cline (VS Code Extension)

Add to Cline settings MCP servers section:

```json
{
  "name": "orva-ui",
  "command": "npx tsx mcp/orva-ui-mcp.ts"
}
```

## Available Tools

| Tool | Purpose |
|------|---------|
| `orva-ui-query` | Get detailed docs for a component/hook (props, examples, best practices) |
| `orva-ui-list` | Browse all components by category |
| `orva-ui-theme` | Query theme tokens (colors, spacing, border-radius) |
| `orva-ui-template` | Get starter code templates (basic, form, compound, hook) |
| `orva-ui-source` | Read actual component source code or type definitions |
| `orva-ui-compare` | Compare two components (shared/unique props) |
| `orva-ui-suggest` | Get component recommendations for a use case |

## Usage Examples

### Ask AI about a component

> "How do I use the Button component in orva-ui?"

The AI will call `orva-ui-query` with `component: "Button"` and show you props, examples, and best practices.

### Browse available components

> "What form components does orva-ui have?"

The AI calls `orva-ui-list` with `category: "form"` and lists all 15 form components.

### Read source code

> "Show me the type definition of Input"

The AI calls `orva-ui-source` with `component: "Input"`, `file: "Input.types.ts"`.

### Theme customization

> "What are the primary and secondary colors?"

The AI calls `orva-ui-theme` with `query: "colors"`, `token: "primary"`.

### Component comparison

> "What's the difference between Modal and Drawer?"

The AI calls `orva-ui-compare` with `a: "Modal"`, `b: "Drawer"`.

## Component Registry

The MCP server **dynamically scans** `src/components/` on startup, so newly added components are automatically discoverable without code changes.

Currently registered categories:
- **basic** (7): Button, Divider, Icon, Ripple, Text, Typography, Video
- **form** (15): AutoComplete, Cascader, Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select, Slider, Switch, Textarea, TimePicker, Transfer, Upload
- **display** (11): Avatar, Badge, Calendar, Card, Carousel, List, Rate, RichText, Table, Tag, Timeline
- **feedback** (10): Drawer, Loading, Message, Modal, Notification, Popconfirm, Progress, Result, Toast, Tooltip
- **layout** (9): Affix, Col, Container, Grid, Layout, ResponsiveContainer, ResponsiveGrid, Row, Space
- **navigation** (6): Menu, NavBar, PageHeader, Pagination, Steps, Tabs
- **common** (3): ErrorBoundary, LazyComponent, VirtualList

## Architecture

```
mcp/
├── orva-ui-mcp.ts          # MCP server entry (tools + resources)
├── component-scanner.ts    # Dynamic source code scanner
└── README.md               # This file
```

- **Manual overrides**: Core components (Button, FormItem, Input, hooks) have enriched documentation with examples and best practices.
- **Dynamic scanning**: All other components are scanned from `src/components/**` at runtime, extracting interfaces from `.types.ts` files.
- **Source reading**: `orva-ui-source` can read any file within a component directory on demand.

## Adding Documentation for a Component

To enrich a component's MCP documentation, add an entry to `MANUAL_OVERRIDES` in `orva-ui-mcp.ts`:

```typescript
const MANUAL_OVERRIDES: Record<string, ManualOverride> = {
  YourComponent: {
    description: "What this component does",
    examples: [
      { code: "<YourComponent prop='value' />", description: "Basic usage" }
    ],
    bestPractices: [
      "Always provide X when Y",
      "Use Z variant for mobile"
    ]
  }
};
```

## Troubleshooting

**Server won't start?**
- Ensure dependencies are installed: `npm install`
- Ensure `tsx` is available: `npx tsx --version`
- Check that `src/components/` exists relative to the project root

**Components not found?**
- The scanner uses the current working directory. Make sure you run the server from the project root.
- Verify the component has a directory under `src/components/<category>/<ComponentName>/`.

**Type errors in mcp/ files?**
- These are TypeScript compilation-only issues and do not affect runtime execution via `tsx`.
- To suppress them, add `"mcp/*"` to `tsconfig.json` exclude array.
