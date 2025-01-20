// @ts-check

module.exports = {
  title: 'Planer Ślubu - Dokumentacja',
  tagline: 'Twoje wsparcie w organizacji idealnego wesela',
  url: 'https://github.com/pawelzeb/wedding-planner-frontend.git',
  baseUrl: '/Wedding-Planner-Frontend/my-docs/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'sam21401', // GitHub org/user name
  projectName: 'Wedding-Planner', // repo name
  i18n: {
    defaultLocale: 'pl', // Domyślny język: polski
    locales: ['pl'], // Obsługiwane języki
    localeConfigs: {
      pl: {
        label: 'Polski', // Wyświetlana nazwa języka
        direction: 'ltr', // Kierunek tekstu (lewo do prawa)
      },
    },
  },
  themeConfig: {
    navbar: {
      title: 'Planer Ślubu',
      logo: {
        alt: 'Logo Planera Ślubu',
        src: 'img/logo.png', // Ścieżka do logo w folderze static/img
      },
      items: [
        { to: '/docs/intro', label: 'Dokumentacja', position: 'left' },
        { to: '/docs/backlog', label: 'Backlog', position: 'left' },
        { to: '/docs/features', label: 'Funkcjonalności', position: 'left' },
        {
          href: 'https://github.com/sam21401/Wedding-Planner-Frontend',
          label: 'Frontend (GitHub)',
          position: 'right',
        },
        {
          href: 'https://github.com/sam21401/Wedding-Planner',
          label: 'Backend (GitHub)',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Dokumentacja',
          items: [
            { label: 'Wprowadzenie', to: '/docs/intro' },
            { label: 'Backlog', to: '/docs/backlog' },
            { label: 'Architektura', to: '/docs/architecture' },
          ],
        },
        {
          title: 'Społeczność',
          items: [
            { label: 'Discord', href: 'https://discord.gg/NxjzYFAh' },
            { label: 'GitHub', href: 'https://github.com/sam21401/Wedding-Planner' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Planer Ślubu.`,
    },
    metadata: [
      { name: 'charset', content: 'UTF-8' }, // Wymuszenie UTF-8
    ],
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'), // Ścieżka do pliku sidebars.js
          editUrl: 'https://github.com/sam21401/Wedding-Planner/edit/main/docs/',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/sam21401/Wedding-Planner/edit/main/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'), // Ścieżka do plików CSS
        },
      },
    ],
  ],
};
