import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { columns, headersSort } from '@ses/core/utils/tests';
import { HeadCustomTable } from './HeadCustomTable';

import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/CuTable/HeadCustomTable',
  component: HeadCustomTable,
  parameters: {
    chromatic: {
      viewports: [1194, 1440, 1920],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof HeadCustomTable>;

const variantsArgs = [
  {
    columns,
    headersSort,
  },
];

export const [[Head, HeadDarkMode]] = createThemeModeVariants(HeadCustomTable, variantsArgs);

Head.parameters = {
  figma: {
    component: {
      1194: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=5232%3A92115&t=iDXzm6LhfULmvnWw-4',
      1440: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=4289%3A45401&t=iDXzm6LhfULmvnWw-4',
      1920: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=4289%3A44666&t=iDXzm6LhfULmvnWw-4',
    },
    options: {
      style: {
        top: -20,
        left: -40,
      },
    },
  },
};

HeadDarkMode.parameters = {
  figma: {
    component: {
      1194: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=5232%3A92115&t=iDXzm6LhfULmvnWw-4',
      1440: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=4289%3A45401&t=iDXzm6LhfULmvnWw-4',
      1920: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=4289%3A44666&t=iDXzm6LhfULmvnWw-4',
    },
    options: {
      style: {
        top: -20,
        left: -40,
      },
    },
  },
};
