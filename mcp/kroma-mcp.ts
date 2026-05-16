#!/usr/bin/env tsx
/**
 * orva-ui MCP Server
 * Model Context Protocol server for AI-powered component library queries
 *
 * Provides:
 * - Component parameter documentation (manual + scanned)
 * - Usage examples and best practices
 * - Theme system queries
 * - Template retrieval
 * - Component source code lookup
 * - Design system guidelines
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { scanAllComponents, getComponentCatalog, type ScannedComponent } from "./component-scanner.js";

// =============================================================================
// Manual Overrides - Enriched documentation for core components
// =============================================================================

interface ExampleInfo {
  code: string;
  description: string;
}

interface ManualOverride {
  description?: string;
  examples?: ExampleInfo[];
  bestPractices?: string[];
  returnType?: string;
}

const MANUAL_OVERRIDES: Record<string, ManualOverride> = {
  Button: {
    description: "Professional button component with micro-animations, ripple effects, and accessibility support",
    examples: [
      { code: "<Button type='primary'>Submit</Button>", description: "Primary action button" },
      { code: "<Button variant='outline' size='lg'>Large Outline</Button>", description: "Large outline button" },
      { code: "<Button loading disabled>Loading</Button>", description: "Loading state button" },
      { code: "<Button shape='circle' icon={<Icon name='plus' />} />", description: "Icon-only circle button" },
    ],
    bestPractices: [
      "Use 'primary' for main actions, 'default' for secondary",
      "Always provide ariaLabel for icon-only buttons",
      "Use loading state to prevent double submission",
      "Choose variant based on action importance: solid > outline > ghost > text",
    ],
  },
  FormItem: {
    description: "Composite form field wrapper with label, error, and help text support",
    examples: [
      { code: "<FormItem label='Username' required><Input /></FormItem>", description: "Required field with label" },
      { code: "<FormItem label='Email' error='Invalid format'><Input /></FormItem>", description: "Field with validation error" },
      { code: "<FormItem label='Password' helpText='At least 8 characters'><Input secure /></FormItem>", description: "Field with help text" },
    ],
    bestPractices: [
      "Always pair with FormLabel for consistent styling",
      "Use helpText for formatting hints, not error messages",
      "Show error messages immediately when validation fails",
      "Keep labels concise and action-oriented",
    ],
  },
  Input: {
    description: "Text input component with micro-animations and validation styling",
    examples: [
      { code: "<Input placeholder='Search...' onChange={setQuery} />", description: "Search input" },
      { code: "<Input value={email} error={emailError} onChange={setEmail} />", description: "Validated email input" },
    ],
    bestPractices: [
      "Always provide onChange for controlled usage",
      "Use error prop for validation feedback, not helpText",
      "Set placeholder to describe expected input format",
      "Debounce onChange if performing expensive operations",
    ],
  },
  useMicroAnimation: {
    description: "Unified micro-interaction animation hook for consistent component animations",
    returnType: "{ transition, hoverStyle, focusStyle, pressStyle, errorStyle, getMergedStyle }",
    examples: [
      { code: "const anim = useMicroAnimation({ type: 'button' });\nconst style = anim.getMergedStyle(baseStyle, { isHovered, isPressed });", description: "Button with spring animation" },
    ],
    bestPractices: [
      "Always pass interaction state to getMergedStyle for correct visual feedback",
      "Disable animations when component is disabled for better UX",
      "Use 'spring' easing for tactile feel, 'apple' for subtle feedback",
    ],
  },
  useAccessibility: {
    description: "Accessibility hook providing ARIA attributes and keyboard navigation",
    returnType: "{ handleKeyDown, getAriaAttributes, isKeyboardAccessible }",
    examples: [
      { code: "const { getAriaAttributes, handleKeyDown } = useAccessibility({\n  ariaLabel: 'Submit form',\n  role: 'button'\n});", description: "Accessible button setup" },
    ],
    bestPractices: [
      "Always provide ariaLabel for icon-only or ambiguous components",
      "Implement keyboard handlers for all interactive elements",
      "Use semantic roles that match the component's purpose",
    ],
  },
  useDynamicTheme: {
    description: "Dynamic theme customization hook for runtime theming",
    returnType: "{ theme, generateCSSVariables, exportTheme }",
    examples: [
      { code: "const { theme } = useDynamicTheme({ colorOverrides: { primary: '#ff6b6b' } });", description: "Custom primary color theme" },
    ],
    bestPractices: [
      "Override only the colors you need, inherit the rest from defaults",
      "Generate CSS variables once and cache for SSR scenarios",
      "Test contrast ratios when overriding colors",
    ],
  },
};

const THEME_VARIABLES = {
  colors: {
    primary: "#a855f7 (Violet)",
    secondary: "#f97316 (Orange)",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
    background: "#ffffff",
    surface: "#f8fafc",
    text: "#1e293b",
    textSecondary: "#64748b",
    border: "#e2e8f0",
  },
  spacing: {
    xs: "4px", sm: "8px", md: "16px", lg: "24px", xl: "32px", "2xl": "48px", "3xl": "64px",
  },
  borderRadius: {
    sm: "4px", md: "8px", lg: "12px", xl: "16px", full: "9999px",
  },
};

// =============================================================================
// Build unified registry
// =============================================================================

const SCANNED_COMPONENTS = scanAllComponents();
const SCANNED_MAP = new Map(SCANNED_COMPONENTS.map((c) => [c.name, c]));
const COMPONENT_CATALOG = getComponentCatalog();

function findScannedComponent(name: string): ScannedComponent | undefined {
  return SCANNED_MAP.get(name) || SCANNED_COMPONENTS.find((c) => c.name.toLowerCase() === name.toLowerCase());
}

function formatScannedProps(props: ScannedComponent["props"]): string {
  if (props.length === 0) return "*No typed props detected. Check source files for details.*";
  return props
    .map((p) => `  \`${p.name}${p.optional ? "?" : ""}\`: \`${p.type}\`\n    ${p.description}`)
    .join("\n\n");
}

function formatExamples(examples: ExampleInfo[]): string {
  return examples.map((e, i) => `### Example ${i + 1}: ${e.description}\n\n\`\`\`tsx\n${e.code}\n\`\`\``).join("\n\n");
}

function formatBestPractices(practices: string[]): string {
  return practices.map((p) => `- ${p}`).join("\n");
}

// =============================================================================
// MCP Server
// =============================================================================

const server = new Server(
  { name: "orva-ui-mcp", version: "1.1.0" },
  { capabilities: { resources: {}, tools: {} } }
);

// ---------------------------------------------------------------------------
// Resources
// ---------------------------------------------------------------------------

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "orva-ui://design-system",
        mimeType: "text/plain",
        name: "orva-ui Design System Overview",
        description: "Complete design system tokens and guidelines",
      },
      {
        uri: "orva-ui://component-list",
        mimeType: "text/plain",
        name: "Component Registry",
        description: "List of all available components and hooks",
      },
      {
        uri: "orva-ui://theme-variables",
        mimeType: "text/plain",
        name: "Theme Variables Reference",
        description: "All theme tokens with values and usage",
      },
      {
        uri: "orva-ui://templates",
        mimeType: "text/plain",
        name: "Component Templates",
        description: "Available component templates for code generation",
      },
    ],
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request: any) => {
  const uri = request.params.uri;

  switch (uri) {
    case "orva-ui://design-system":
      return {
        contents: [{
          uri,
          mimeType: "text/plain",
          text: `# orva-ui Design System

## Philosophy
orva-ui is a professional component library focused on performance-first micro-interactions, TypeScript-native architecture, theme-driven design tokens, and accessibility compliance (WCAG 2.1 AA).

## Core Systems

### 1. Animation System (useMicroAnimation)
Standardized micro-interaction animations with predefined timing curves (apple, spring, ease) and interaction state styles.

### 2. Theme System (useTheme / useDynamicTheme)
Token-based design system with semantic colors, 8px grid spacing, type scale, and elevation shadows.

### 3. Accessibility System (useAccessibility)
ARIA attributes, keyboard navigation, Enter/Space handling, and focus management.

## Component Architecture
All components follow the createComponent factory pattern with standardized forwardRef + memo, default props merging, theme injection, and animation/accessibility integration.

## File Naming Convention
- Component: PascalCase.tsx
- Types: PascalCase.types.ts
- Hooks: camelCase with use prefix
- Utils/Services: camelCase with .service.ts suffix
`,
        }],
      };

    case "orva-ui://component-list": {
      let text = "# orva-ui Component Registry\n\n";
      for (const [category, names] of Object.entries(COMPONENT_CATALOG)) {
        text += `## ${category} (${names.length})\n${names.map((n) => `- ${n}`).join("\n")}\n\n`;
      }
      text += "\nQuery individual components with the orva-ui-query tool for detailed props, examples, and best practices.\n";
      return { contents: [{ uri, mimeType: "text/plain", text }] };
    }

    case "orva-ui://theme-variables": {
      let text = "# Theme Variables Reference\n\n";
      for (const [category, values] of Object.entries(THEME_VARIABLES)) {
        text += `## ${category}\n${Object.entries(values as any).map(([k, v]) => `- **${k}**: ${v}`).join("\n")}\n\n`;
      }
      text += "\nAccess via `useTheme()` hook or override via `useDynamicTheme()`.\n";
      return { contents: [{ uri, mimeType: "text/plain", text }] };
    }

    case "orva-ui://templates":
      return {
        contents: [{
          uri,
          mimeType: "text/plain",
          text: `# orva-ui Component Templates

## Available Templates

### 1. BasicComponentTemplate.tsx
For: Buttons, icons, cards, badges, tags
Includes: createComponent, useTheme, useMicroAnimation, useAccessibility

### 2. FormComponentTemplate.tsx
For: Inputs, selectors, sliders, switches
Includes: createComponent, useTheme, useMicroAnimation, error/help text handling

### 3. CompoundComponentTemplate.tsx
For: FormItem, Tabs, Accordion, DataGrid
Includes: createCompoundComponent, sub-component pattern

### 4. HookTemplate.ts
For: Custom state management, data fetching, UI interactions

Use orva-ui-template tool to retrieve starter code.
`,
        }],
      };

    default:
      throw new Error(`Unknown resource: ${uri}`);
  }
});

// ---------------------------------------------------------------------------
// Tools
// ---------------------------------------------------------------------------

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "orva-ui-query",
        description: "Query orva-ui component or hook documentation. Returns props, types, examples, and best practices. Use when the user asks about how to use, configure, or customize a orva-ui component or hook.",
        inputSchema: {
          type: "object",
          properties: {
            component: { type: "string", description: "Component or hook name (e.g., 'Button', 'FormItem', 'useMicroAnimation')" },
            detail: { type: "string", enum: ["overview", "props", "examples", "best-practices", "full"], default: "full", description: "Level of detail" },
          },
          required: ["component"],
        },
      },
      {
        name: "orva-ui-list",
        description: "List all available components by category. Use when the user wants to browse or discover what components exist in orva-ui.",
        inputSchema: {
          type: "object",
          properties: {
            category: { type: "string", description: "Optional category filter (e.g., 'basic', 'form', 'display')" },
          },
        },
      },
      {
        name: "orva-ui-theme",
        description: "Query theme tokens, variables, or design system values. Use when the user asks about colors, spacing, typography, or theme customization.",
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string", enum: ["colors", "spacing", "border-radius", "all"], description: "Theme category" },
            token: { type: "string", description: "Specific token name (optional, e.g., 'primary', 'md')" },
          },
          required: ["query"],
        },
      },
      {
        name: "orva-ui-template",
        description: "Retrieve component template code for code generation. Use when the user wants to create a new component and needs starter code.",
        inputSchema: {
          type: "object",
          properties: {
            type: { type: "string", enum: ["basic", "form", "compound", "hook"], description: "Template type" },
            name: { type: "string", description: "Component or hook name" },
          },
          required: ["type", "name"],
        },
      },
      {
        name: "orva-ui-source",
        description: "Retrieve component source code or type definitions. Use when the user wants to read the actual implementation of a component.",
        inputSchema: {
          type: "object",
          properties: {
            component: { type: "string", description: "Component name" },
            file: { type: "string", description: "Specific file to read (e.g., 'Button.types.ts'). If omitted, lists available files." },
          },
          required: ["component"],
        },
      },
      {
        name: "orva-ui-compare",
        description: "Compare two components or component variants. Use when the user asks about differences between components or which to choose.",
        inputSchema: {
          type: "object",
          properties: {
            a: { type: "string", description: "First component name" },
            b: { type: "string", description: "Second component name" },
          },
          required: ["a", "b"],
        },
      },
      {
        name: "orva-ui-suggest",
        description: "Suggest the right component or approach for a given use case. Use when the user describes a UI need but isn't sure which component to use.",
        inputSchema: {
          type: "object",
          properties: {
            useCase: { type: "string", description: "Description of the UI use case or requirement" },
          },
          required: ["useCase"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request: any) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "orva-ui-query": {
      const { component, detail = "full" } = args;
      const scanned = findScannedComponent(component);

      if (!scanned) {
        const available = Object.values(COMPONENT_CATALOG).flat().join(", ");
        return { content: [{ type: "text", text: `Component or hook "${component}" not found.\n\nAvailable: ${available}` }] };
      }

      const override = MANUAL_OVERRIDES[component] || {};
      const description = override.description || scanned.description || `${scanned.name} component`;

      let text = `# ${scanned.name}\n\n${description}\n\n**Category**: ${scanned.category}\n**Path**: \`${scanned.path}\`\n`;
      if (override.returnType) text += `**Return Type**: \`${override.returnType}\`\n`;

      if ((detail === "props" || detail === "full")) {
        text += `\n## Props\n\n${formatScannedProps(scanned.props)}\n`;
        if (scanned.exports.length > 0) {
          text += `\n## Exports\n${scanned.exports.map((e) => `- \`${e}\``).join("\n")}\n`;
        }
      }

      if ((detail === "examples" || detail === "full") && override.examples) {
        text += `\n## Examples\n\n${formatExamples(override.examples)}\n`;
      }

      if ((detail === "best-practices" || detail === "full") && override.bestPractices) {
        text += `\n## Best Practices\n\n${formatBestPractices(override.bestPractices)}\n`;
      }

      text += `\n## Source Files\n${scanned.sourceFiles.map((f) => `- \`${f}\``).join("\n")}\n`;
      return { content: [{ type: "text", text }] };
    }

    case "orva-ui-list": {
      const { category } = args;
      let text = "# orva-ui Components\n\n";
      if (category && COMPONENT_CATALOG[category]) {
        text += `## ${category}\n${COMPONENT_CATALOG[category].map((n) => `- ${n}`).join("\n")}\n`;
      } else {
        for (const [cat, names] of Object.entries(COMPONENT_CATALOG)) {
          text += `## ${cat} (${names.length})\n${names.map((n) => `- ${n}`).join("\n")}\n\n`;
        }
      }
      text += "\nUse `orva-ui-query` for detailed documentation of any component.\n";
      return { content: [{ type: "text", text }] };
    }

    case "orva-ui-theme": {
      const { query, token } = args;
      if (query === "all") {
        let text = "# orva-ui Theme Tokens\n\n";
        for (const [cat, values] of Object.entries(THEME_VARIABLES)) {
          text += `## ${cat}\n${Object.entries(values as any).map(([k, v]) => `- **${k}**: ${v}`).join("\n")}\n\n`;
        }
        return { content: [{ type: "text", text }] };
      }
      const category = THEME_VARIABLES[query as keyof typeof THEME_VARIABLES];
      if (!category) {
        return { content: [{ type: "text", text: `Unknown category: ${query}. Available: colors, spacing, border-radius, all` }] };
      }
      if (token) {
        const value = (category as any)[token];
        if (!value) return { content: [{ type: "text", text: `Token "${token}" not found in ${query}.` }] };
        return { content: [{ type: "text", text: `# ${query}.${token}\n\n**Value**: ${value}\n\n**Usage**: \`theme.${query}.${token}\`` }] };
      }
      let text = `# ${query} Tokens\n\n${Object.entries(category).map(([k, v]) => `- **${k}**: ${v}`).join("\n")}\n`;
      return { content: [{ type: "text", text }] };
    }

    case "orva-ui-template": {
      const { type, name } = args;
      const templates: Record<string, string> = {
        basic: `// ${name}.tsx - Basic Component
import { useMemo } from 'react';
import type { ViewStyle } from 'react-native';
import { createComponent } from '../../utils/createComponent';
import { useTheme } from '../../hooks/ui/useTheme';
import { useMicroAnimation } from '../../hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '../../hooks/ui/useAccessibility';

export interface ${name}Props {
  children?: React.ReactNode;
  disabled?: boolean;
  style?: ViewStyle;
}

export const ${name} = createComponent<${name}Props>({
  name: '${name}',
  defaultProps: { disabled: false },
  render: (props) => {
    const { children, disabled = false, style } = props;
    const { theme } = useTheme();
    const animation = useMicroAnimation({ enabled: !disabled });
    const a11y = useAccessibility({ role: ARIA_ROLES.button, focusable: !disabled });

    const baseStyle = useMemo(() => ({
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      minHeight: 44,
      ...style,
    }), [theme, style]);

    return (
      <View style={animation.getMergedStyle(baseStyle)} {...a11y.getAriaAttributes()}>
        {children}
      </View>
    );
  },
});

export default ${name};`,
        form: `// ${name}.tsx - Form Component
import { useMemo, useCallback } from 'react';
import { createComponent } from '../../utils/createComponent';
import { useTheme } from '../../hooks/ui/useTheme';
import { useMicroAnimation } from '../../hooks/ui/useMicroAnimation';

export interface ${name}Props {
  value?: string;
  placeholder?: string;
  error?: string;
  helpText?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export const ${name} = createComponent<${name}Props>({
  name: '${name}',
  defaultProps: { disabled: false },
  render: (props) => {
    const { value = '', placeholder = 'Enter...', error, helpText, disabled = false, onChange } = props;
    const { theme } = useTheme();
    const animation = useMicroAnimation({ type: 'input', enabled: !disabled });

    const inputStyle = useMemo(() => ({
      backgroundColor: theme.colors.surface,
      borderColor: error ? theme.colors.error : theme.colors.border,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
    }), [theme, error]);

    const handleChange = useCallback((newValue: string) => {
      if (!disabled && onChange) onChange(newValue);
    }, [disabled, onChange]);

    return (
      <View>
        <Input value={value} placeholder={placeholder} disabled={disabled}
          onChangeText={handleChange} style={animation.getMergedStyle(inputStyle)} />
        {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
        {helpText && !error && <Text style={{ color: theme.colors.textSecondary }}>{helpText}</Text>}
      </View>
    );
  },
});

export default ${name};`,
        compound: `// ${name}.tsx - Compound Component
import { createCompoundComponent } from '../../utils/createComponent';

export interface ${name}Props { children?: React.ReactNode; }
export interface ${name}ItemProps { children?: React.ReactNode; }

function ${name}Main(props: ${name}Props) {
  return <View>{props.children}</View>;
}
function ${name}Item(props: ${name}ItemProps) {
  return <View>{props.children}</View>;
}

export const ${name} = createCompoundComponent({
  main: { name: '${name}', render: ${name}Main },
  subComponents: { Item: ${name}Item },
});

export const ${name}Item = ${name}.Item;
export default ${name};`,
        hook: `// use${name}.ts - Custom Hook
import { useState, useEffect, useCallback, useMemo } from 'react';

export interface Use${name}Options { /* config options */ }
export interface Use${name}Return { /* return values */ }

export function use${name}(options: Use${name}Options = {}): Use${name}Return {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    // initialization
    return () => { /* cleanup */ };
  }, []);

  const update = useCallback((value: any) => {
    setState(value);
  }, []);

  const computed = useMemo(() => state, [state]);

  return { /* exposed API */ };
}

export default use${name};`,
      };
      return { content: [{ type: "text", text: templates[type] || `Unknown template type: ${type}` }] };
    }

    case "orva-ui-source": {
      const { component, file } = args;
      const scanned = findScannedComponent(component);
      if (!scanned) {
        return { content: [{ type: "text", text: `Component "${component}" not found.` }] };
      }

      if (!file) {
        let text = `# ${scanned.name} Source Files\n\n**Path**: \`${scanned.path}\`\n\n## Available Files\n${scanned.sourceFiles.map((f) => `- \`${f}\``).join("\n")}\n`;
        if (scanned.hasTypesFile) {
          text += "\nUse `file: '${component}.types.ts'` to read the type definitions.\n";
        }
        return { content: [{ type: "text", text }] };
      }

      const filePath = join(process.cwd(), scanned.path, file);
      if (!existsSync(filePath)) {
        return { content: [{ type: "text", text: `File "${file}" not found in ${scanned.path}.\nAvailable: ${scanned.sourceFiles.map((f) => f.split("/").pop()).join(", ")}` }] };
      }

      const content = readFileSync(filePath, "utf-8");
      return { content: [{ type: "text", text: `# ${scanned.name}/${file}\n\n\`\`\`tsx\n${content}\n\`\`\`` }] };
    }

    case "orva-ui-compare": {
      const { a, b } = args;
      const compA = findScannedComponent(a);
      const compB = findScannedComponent(b);
      if (!compA || !compB) {
        return { content: [{ type: "text", text: `Cannot compare: one or both components not found.` }] };
      }
      const aProps = new Set(compA.props.map((p) => p.name));
      const bProps = new Set(compB.props.map((p) => p.name));
      const shared = [...aProps].filter((x) => bProps.has(x));
      const onlyA = [...aProps].filter((x) => !bProps.has(x));
      const onlyB = [...bProps].filter((x) => !aProps.has(x));

      return {
        content: [{
          type: "text",
          text: `# ${a} vs ${b}\n\n## ${a}\n${MANUAL_OVERRIDES[a]?.description || compA.description}\n\n## ${b}\n${MANUAL_OVERRIDES[b]?.description || compB.description}\n\n## Shared Props (${shared.length})\n${shared.map((p) => `- ${p}`).join("\n") || "None"}\n\n## Only in ${a} (${onlyA.length})\n${onlyA.map((p) => `- ${p}`).join("\n") || "None"}\n\n## Only in ${b} (${onlyB.length})\n${onlyB.map((p) => `- ${p}`).join("\n") || "None"}\n`,
        }],
      };
    }

    case "orva-ui-suggest": {
      const { useCase } = args;
      const uc = useCase.toLowerCase();
      const suggestions: { component: string; reason: string }[] = [];

      if (uc.includes("button") || uc.includes("click")) suggestions.push({ component: "Button", reason: "Primary interactive element" });
      if (uc.includes("form") || uc.includes("input") || uc.includes("field")) suggestions.push({ component: "FormItem + Input", reason: "Complete form field with validation" });
      if (uc.includes("select") || uc.includes("dropdown")) suggestions.push({ component: "Select / Cascader", reason: "Option selection components" });
      if (uc.includes("modal") || uc.includes("dialog") || uc.includes("popup")) suggestions.push({ component: "Modal / Drawer", reason: "Overlay content containers" });
      if (uc.includes("toast") || uc.includes("message") || uc.includes("notification")) suggestions.push({ component: "Toast / Message", reason: "Transient feedback messages" });
      if (uc.includes("list") || uc.includes("table") || uc.includes("grid")) suggestions.push({ component: "List / Table", reason: "Data display components" });
      if (uc.includes("animation") || uc.includes("transition")) suggestions.push({ component: "useMicroAnimation", reason: "Unified micro-interaction hook" });
      if (uc.includes("theme") || uc.includes("color") || uc.includes("style")) suggestions.push({ component: "useTheme / useDynamicTheme", reason: "Theme token access and customization" });
      if (uc.includes("accessibility") || uc.includes("a11y") || uc.includes("keyboard")) suggestions.push({ component: "useAccessibility", reason: "ARIA and keyboard support" });
      if (uc.includes("tab") || uc.includes("navigate")) suggestions.push({ component: "Tabs / Menu", reason: "Navigation components" });
      if (uc.includes("step") || uc.includes("wizard") || uc.includes("progress")) suggestions.push({ component: "Steps / Progress", reason: "Progress indication" });
      if (uc.includes("upload") || uc.includes("file")) suggestions.push({ component: "Upload", reason: "File upload handling" });

      if (suggestions.length === 0) {
        suggestions.push({ component: "Button", reason: "General-purpose starting point. Use orva-ui-list to browse all components." });
      }

      return {
        content: [{
          type: "text",
          text: `# Suggestions for: "${useCase}"\n\n${suggestions.map((s) => `## ${s.component}\n${s.reason}\n`).join("\n")}\n\nUse \`orva-ui-query\` for detailed props and examples.`,
        }],
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// =============================================================================
// Start Server
// =============================================================================

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("orva-ui MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
