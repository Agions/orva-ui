/**
 * orva-ui Component Scanner
 * Dynamically scans src/components to build component metadata
 */

import { readdirSync, statSync, readFileSync, existsSync } from "fs";
import { join, basename } from "path";

export interface ScannedProp {
  name: string;
  type: string;
  optional: boolean;
  description: string;
}

export interface ScannedComponent {
  name: string;
  category: string;
  path: string;
  description: string;
  hasTypesFile: boolean;
  props: ScannedProp[];
  exports: string[];
  sourceFiles: string[];
}

const COMPONENTS_DIR = join(process.cwd(), "src/components");

/**
 * Extract JSDoc comment above a line
 */
function extractJsDoc(lines: string[], lineIndex: number): string {
  const docs: string[] = [];
  for (let i = lineIndex - 1; i >= 0; i--) {
    const line = lines[i].trim();
    if (line.startsWith("/**")) {
      docs.unshift(line.replace(/^\/\*\*\s?/, "").replace(/\*\/$/, ""));
      break;
    }
    if (line.startsWith("* ")) {
      docs.unshift(line.replace(/^\*\s?/, ""));
    } else if (line.startsWith("*")) {
      docs.unshift(line.replace(/^\*\s?/, ""));
    } else {
      break;
    }
  }
  return docs.join(" ").replace(/\s+/g, " ").trim()
    .replace(/@description\s*/gi, "")
    .replace(/\s*@default\s+[^\s]+/gi, "");
}

/**
 * Parse interface properties from a types file
 */
function parseInterfaceProps(content: string, interfaceName: string): ScannedProp[] {
  const props: ScannedProp[] = [];
  const lines = content.split("\n");
  let inInterface = false;
  let braceDepth = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!inInterface) {
      if (new RegExp(`\\binterface\\s+${interfaceName}\\b`).test(trimmed)) {
        inInterface = true;
        braceDepth = (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
      }
      continue;
    }

    braceDepth += (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;

    if (braceDepth <= 0 && /}/.test(line)) {
      inInterface = false;
      break;
    }

    // Match property lines: name?: type; or name: type;
    const propMatch = trimmed.match(/^([a-zA-Z_]\w*)(\?)?:\s*([^;]+);?\s*$/);
    if (propMatch) {
      const description = extractJsDoc(lines, i);
      props.push({
        name: propMatch[1],
        type: propMatch[3].trim(),
        optional: !!propMatch[2],
        description: description || "No description",
      });
    }
  }

  return props;
}

/**
 * Scan a single component directory
 */
function scanComponentDir(category: string, compName: string, compPath: string): ScannedComponent {
  const typesFile = join(compPath, `${compName}.types.ts`);
  const hasTypesFile = existsSync(typesFile);
  let props: ScannedProp[] = [];
  let description = `${compName} component`;
  let exports: string[] = [];
  const sourceFiles: string[] = [];

  // List source files
  try {
    for (const file of readdirSync(compPath)) {
      if (file.endsWith(".ts") || file.endsWith(".tsx")) {
        sourceFiles.push(`src/components/${category}/${compName}/${file}`);
      }
    }
  } catch { /* ignore */ }

  if (hasTypesFile) {
    try {
      const content = readFileSync(typesFile, "utf-8");
      // Try to find Props interface
      const propsInterface = content.match(/interface\s+(\w+Props)\b[^}]*{/);
      if (propsInterface) {
        props = parseInterfaceProps(content, propsInterface[1]);
      }
      // Extract module description
      const moduleDesc = content.match(/@module\s+(.+)/);
      if (moduleDesc) {
        description = moduleDesc[1].trim();
      }
      // Extract exported interfaces/types
      const exportMatches = content.matchAll(/export\s+(?:interface|type)\s+(\w+)/g);
      for (const match of exportMatches) {
        exports.push(match[1]);
      }
    } catch { /* ignore */ }
  }

  return {
    name: compName,
    category,
    path: `src/components/${category}/${compName}`,
    description,
    hasTypesFile,
    props,
    exports,
    sourceFiles,
  };
}

/**
 * Scan all components
 */
export function scanAllComponents(): ScannedComponent[] {
  const components: ScannedComponent[] = [];

  try {
    const categories = readdirSync(COMPONENTS_DIR);
    for (const category of categories) {
      const catPath = join(COMPONENTS_DIR, category);
      if (!statSync(catPath).isDirectory() || category.startsWith("_")) continue;

      const items = readdirSync(catPath);
      for (const item of items) {
        const compPath = join(catPath, item);
        if (!statSync(compPath).isDirectory()) continue;
        components.push(scanComponentDir(category, item, compPath));
      }
    }
  } catch (error) {
    console.error("Failed to scan components:", error);
  }

  return components.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get a quick list of all component names by category
 */
export function getComponentCatalog(): Record<string, string[]> {
  const catalog: Record<string, string[]> = {};
  const components = scanAllComponents();
  for (const comp of components) {
    if (!catalog[comp.category]) catalog[comp.category] = [];
    catalog[comp.category].push(comp.name);
  }
  return catalog;
}
