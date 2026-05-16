import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Nano-UI UI',
  tagline: '为 Taro 生态打造的现代化跨平台组件库',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://agions.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/orva-ui/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'agions', // Usually your GitHub org/user name.
  projectName: 'orva-ui', // Usually your repo name.

  onBrokenLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN'],
  },

  plugins: [
    [
      require.resolve('@docusaurus/plugin-content-docs'),
      {
        id: 'docs',
        path: 'docs/docs',
        routeBasePath: '/',
        include: ['**/*.md', '**/*.mdx'],
        exclude: ['**/*.test.{js,jsx,ts,tsx}', '**/__tests__/**'],
        remarkPlugins: [],
        rehypePlugins: [],
        beforeDefaultRemarkPlugins: [],
        beforeDefaultRehypePlugins: [],
        editUrl: 'https://github.com/agions/orva-ui/edit/main/docs/',
        showLastUpdateTime: false,
        showLastUpdateAuthor: false,
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: 'https://github.com/agions/orva-ui/edit/main/docs/',
          showLastUpdateTime: false,
          showLastUpdateAuthor: false,
          breadcrumbs: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        blog: false,
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',

    // Announcement bar for important updates
    announcementBar: {
      id: 'support_us',
      content: '🎉 Nano-UI UI 正式发布！如果觉得有帮助，请在 <a target="_blank" rel="noopener noreferrer" href="https://github.com/agions/orva-ui">GitHub</a> 上给我们一个 Star ⭐',
      backgroundColor: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
      textColor: '#ffffff',
      isCloseable: true,
    },

    // Color mode configuration
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },

    // Navbar configuration
    navbar: {
      title: 'Nano-UI UI',
      hideOnScroll: true,
      logo: {
        alt: 'Nano-UI UI Logo',
        src: 'img/logo.png',
        srcDark: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'componentsSidebar',
          position: 'left',
          label: '组件库',
        },
        {
          href: 'https://github.com/agions/orva-ui',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },

    // Footer configuration
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {
              label: '快速开始',
              to: '/quickstart',
            },
            {
              label: '核心功能',
              to: '/features',
            },
            {
              label: '组件总览',
              to: '/components/basic/button',
            },
          ],
        },
        {
          title: '指南',
          items: [
            {
              label: '安装配置',
              to: '/guides/installation',
            },
            {
              label: '主题定制',
              to: '/guides/theme-customization',
            },
            {
              label: '多平台适配',
              to: '/guides/multi-platform',
            },
          ],
        },
        {
          title: '社区',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/agions/orva-ui',
            },
            {
              label: 'Issues',
              href: 'https://github.com/agions/orva-ui/issues',
            },
            {
              label: 'Discussions',
              href: 'https://github.com/agions/orva-ui/discussions',
            },
          ],
        },
        {
          title: '更多',
          items: [
            {
              label: '更新日志',
              to: '/changelog',
            },
            {
              label: '常见问题',
              to: '/faq',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Agions. Built with Docusaurus.`,
    },

    // Prism code highlighting configuration
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'diff'],
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
        {
          className: 'code-block-error-line',
          line: 'error-next-line',
        },
        {
          className: 'code-block-success-line',
          line: 'success-next-line',
        },
      ],
    },

    // Table of contents configuration
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },

    // Docs configuration
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;