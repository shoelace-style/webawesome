export default function (plop) {
  plop.setHelper('tagWithoutPrefix', tag => tag.replace(/^wa-/, ''));

  plop.setHelper('tagToTitle', tag => {
    const withoutPrefix = plop.getHelper('tagWithoutPrefix');
    const titleCase = plop.getHelper('titleCase');
    return titleCase(withoutPrefix(tag).replace(/-/g, ' '));
  });

  plop.setGenerator('component', {
    description: 'Generate a new component',
    prompts: [
      {
        type: 'input',
        name: 'tag',
        message: 'Tag name? (e.g. wa-button)',
        validate: value => {
          // Start with wa- and include only a-z + dashes
          if (!/^wa-[a-z-+]+/.test(value)) {
            return false;
          }

          // No double dashes or ending dash
          if (value.includes('--') || value.endsWith('-')) {
            return false;
          }

          return true;
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../../src/components/{{ tagWithoutPrefix tag }}/{{ tagWithoutPrefix tag }}.ts',
        templateFile: 'templates/component/component.hbs',
      },
      {
        type: 'add',
        path: '../../src/components/{{ tagWithoutPrefix tag }}/{{ tagWithoutPrefix tag }}.css',
        templateFile: 'templates/component/styles.hbs',
      },
      {
        type: 'add',
        path: '../../src/components/{{ tagWithoutPrefix tag }}/{{ tagWithoutPrefix tag }}.test.ts',
        templateFile: 'templates/component/tests.hbs',
      },
      {
        type: 'add',
        path: '../../docs/docs/components/{{ tagWithoutPrefix tag }}.md',
        templateFile: 'templates/component/docs.hbs',
      },
      {
        type: 'modify',
        path: '../../docs/_includes/sidebar.njk',
        pattern: /\{# PLOP_NEW_COMPONENT_PLACEHOLDER #\}/,
        template: `<li><a href="/docs/components/{{ tagWithoutPrefix tag }}">{{ tagToTitle tag }}</a></li>\n    {# PLOP_NEW_COMPONENT_PLACEHOLDER #}`,
      },
    ],
  });
}
