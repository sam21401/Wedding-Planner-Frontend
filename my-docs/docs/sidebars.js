module.exports = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Planer Ślubu', // Tytuł główny kategorii
      items: [
        {
          type: 'category',
          label: 'Backlog Funkcjonalności', // Polskie znaki w label
          items: ['backlog', 'features'],
        },
        'architecture',
        'installation',
        'deployment',
        'security',
        'testing',
      ],
    },
  ],
};
