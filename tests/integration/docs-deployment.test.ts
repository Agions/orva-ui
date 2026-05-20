/**
 * Integration Test: Documentation Deployment Pipeline
 *
 * Validates that the Docusaurus documentation builds and deploys correctly.
 * Docusaurus 3.9.2 — build output to docs/build
 */

import { describe, test, expect, beforeAll, afterAll, vi } from 'vitest';
import { readFileSync, existsSync, rmSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const ROOT_DIR = process.cwd();
const DOCS_DIR = join(ROOT_DIR, 'docs');
const BUILD_DIR = join(DOCS_DIR, 'build');
const WORKFLOW_FILE = join(ROOT_DIR, '.github', 'workflows', 'deploy-docs.yml');
const CONFIG_FILE = join(DOCS_DIR, 'docusaurus.config.ts');

describe('Documentation Deployment Pipeline (Docusaurus)', () => {
  beforeAll(() => {
    // Clean any previous build artifacts for fresh validation
    if (existsSync(BUILD_DIR)) {
      rmSync(BUILD_DIR, { recursive: true, force: true });
    }
  });

  afterAll(() => {
    // Restore build artifacts if they existed previously (no-op for CI)
  });

  /* ───────────── Workflow validation ───────────── */

  test('deploy workflow file exists and is valid YAML', () => {
    expect(existsSync(WORKFLOW_FILE)).toBe(true);

    const content = readFileSync(WORKFLOW_FILE, 'utf-8');

    // Basic YAML structure checks
    expect(content).toMatch(/^name:/m);
    expect(content).toMatch(/^on:/m);
    expect(content).toMatch(/^jobs:/m);
    expect(content).toMatch(/^permissions:/m);

    // Triggers
    expect(content).toMatch(/push:\s*\n\s+branches:\s*\[main\]/);

    // Required jobs
    expect(content).toMatch(/^\s+build:\s*$/m);
    expect(content).toMatch(/^\s+deploy:\s*$/m);

    // run on ubuntu
    expect(content).toMatch(/runs-on:\s*ubuntu-latest/);

    // Correct output path for Docusaurus
    expect(content).toMatch(/path:\s*docs\/build/);

    // Correct permissions for GitHub Pages
    expect(content).toMatch(/pages:\s*write/);
    expect(content).toMatch(/id-token:\s*write/);
  });

  /* ───────────── Docusaurus config validation ───────────── */

  test('Docusaurus configuration is valid', () => {
    expect(existsSync(CONFIG_FILE)).toBe(true);

    const content = readFileSync(CONFIG_FILE, 'utf-8');

    expect(content).toMatch(/import.*from.*@docusaurus\/types/);
    expect(content).toMatch(/const config: Config/);

    // Site identity
    expect(content).toMatch(/title:\s*'Orva UI'/);

    // GitHub Pages deployment settings
    expect(content).toMatch(/url:\s*['"]https:\/\/agions\.github\.io['"]/);
    expect(content).toMatch(/baseUrl:\s*['"]\/orva-ui\/['"]/);
    expect(content).toMatch(/organizationName:\s*['"]agions['"]/);
    expect(content).toMatch(/projectName:\s*['"]orva-ui['"]/);

    // Docusaurus preset
    expect(content).toMatch(/@docusaurus\/preset-classic/);

    // Language / i18n
    expect(content).toMatch(/defaultLocale:\s*['"]zh-CN['"]/);

    // Theme and plugins
    expect(content).toMatch(/theme:/);
    expect(content).toMatch(/prism:/);
  });

  /* ───────────── Docs source structure ───────────── */

  test('documentation source files exist', () => {
    // Required top-level docs
    const requiredDocs = ['intro.md', 'quickstart.md', 'features.md', 'faq.md', 'changelog.md'];
    for (const doc of requiredDocs) {
      expect(existsSync(join(DOCS_DIR, 'docs', doc))).toBe(true);
    }

    // Component doc directories exist
    const componentDirs = ['basic', 'form', 'display', 'feedback', 'layout', 'navigation', 'common'];
    for (const dir of componentDirs) {
      const dirPath = join(DOCS_DIR, 'docs', 'components', dir);
      expect(existsSync(dirPath)).toBe(true);
    }

    // Sidebar config exists and is valid
    const sidebarFile = join(DOCS_DIR, 'sidebars.ts');
    expect(existsSync(sidebarFile)).toBe(true);
    const sidebarContent = readFileSync(sidebarFile, 'utf-8');
    expect(sidebarContent).toMatch(/import.*SidebarsConfig/);
    expect(sidebarContent).toMatch(/docsSidebar/);
    expect(sidebarContent).toMatch(/componentsSidebar/);
  });

  /* ───────────── Root package.json scripts ───────────── */

  test('root package.json has correct docs scripts', () => {
    const pkg = JSON.parse(readFileSync(join(ROOT_DIR, 'package.json'), 'utf-8'));
    const requiredScripts = ['docs:install', 'docs:dev', 'docs:build', 'docs:serve', 'docs:deploy'];

    for (const script of requiredScripts) {
      expect(pkg.scripts).toHaveProperty(script);
      expect(typeof pkg.scripts[script]).toBe('string');
    }

    // Verify the actual build command targets Docusaurus
    expect(pkg.scripts['docs:build']).toBe('cd docs && npm run build');
    expect(pkg.scripts['docs:dev']).toBe('cd docs && npm run start');
  });

  /* ───────────── Docs package.json ───────────── */

  test('docs/package.json is correctly configured', () => {
    const pkg = JSON.parse(readFileSync(join(DOCS_DIR, 'package.json'), 'utf-8'));

    expect(pkg.name).toBe('docs');
    expect(pkg.private).toBe(true);

    // Docusaurus dependencies
    expect(pkg.dependencies).toHaveProperty('@docusaurus/core');
    expect(pkg.dependencies['@docusaurus/core']).toMatch(/^3\./);
    expect(pkg.dependencies).toHaveProperty('@docusaurus/preset-classic');
    expect(pkg.dependencies).toHaveProperty('@mdx-js/react');

    // Required scripts
    expect(pkg.scripts).toHaveProperty('build', 'docusaurus build');
    expect(pkg.scripts).toHaveProperty('start', 'docusaurus start');
    expect(pkg.scripts).toHaveProperty('deploy', 'docusaurus deploy');

    // Node requirement
    expect(pkg.engines?.node).toMatch(/>=20\.0/);
  });

  /* ───────────── .gitignore includes build artifacts ───────────── */

  test('.gitignore excludes build artifacts', () => {
    // Root .gitignore has `build/` which covers `docs/build/`
    const rootGitignore = readFileSync(join(ROOT_DIR, '.gitignore'), 'utf-8');
    expect(rootGitignore).toMatch(/^build\//m);

    // docs/.gitignore should exclude /build
    const docsGitignore = readFileSync(join(DOCS_DIR, '.gitignore'), 'utf-8');
    expect(docsGitignore).toMatch(/^\/build/m);
    expect(docsGitignore).toMatch(/node_modules/);
  });

  /* ───────────── Build test (if deps installed) ───────────── */

  test('documentation build process works', () => {
    // Only run if docs dependencies are installed
    const docsNodeModules = join(DOCS_DIR, 'node_modules');
    if (!existsSync(docsNodeModules)) {
      console.log('SKIP: docs/node_modules not found — install with: npm run docs:install');
      return;
    }

    const startTime = Date.now();

    execSync('npm run build', {
      cwd: DOCS_DIR,
      stdio: 'pipe',
      timeout: 300_000, // 5 minutes
    });

    const buildTime = Date.now() - startTime;
    console.log(`Build time: ${buildTime}ms`);

    // Must produce output
    expect(existsSync(BUILD_DIR)).toBe(true);

    // Docusaurus should generate index.html with Orva UI title
    const indexPath = join(BUILD_DIR, 'index.html');
    expect(existsSync(indexPath)).toBe(true);
    const indexContent = readFileSync(indexPath, 'utf-8');
    expect(indexContent).toMatch(/Orva UI/);
    expect(indexContent).toMatch(/<script/);

    // Count HTML pages
    const htmlCount = execSync(`find "${BUILD_DIR}" -name "*.html" | wc -l`, {
      encoding: 'utf8',
    }).trim();
    console.log(`HTML pages generated: ${htmlCount}`);

    // Count JS/CSS assets
    const assetCount = execSync(`find "${BUILD_DIR}/assets" -type f 2>/dev/null | wc -l`, {
      encoding: 'utf8',
    }).trim();
    console.log(`Asset files: ${assetCount}`);

    // Build output should be under 50MB
    const buildSize = parseInt(
      execSync(`du -sb "${BUILD_DIR}"`, { encoding: 'utf8' }).split('\t')[0],
      10,
    );
    const buildSizeMB = buildSize / 1024 / 1024;
    console.log(`Build size: ${buildSizeMB.toFixed(2)}MB`);
    expect(buildSize).toBeLessThan(50 * 1024 * 1024);
  });
});