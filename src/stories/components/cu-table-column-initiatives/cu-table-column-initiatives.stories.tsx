import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { CuTableColumnInitiatives } from './cu-table-column-initiatives';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/CUTable/ColumnInitiatives',
  component: CuTableColumnInitiatives,
  decorators: [
    (Story) => (
      <div style={{ width: 'fit-content' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof CuTableColumnInitiatives>;

const args = [
  {
    initiatives: 2,
  },
];

export const [[LightMode, DarkMode]] = createThemeModeVariants(CuTableColumnInitiatives, args);
LightMode.parameters = {
  figma: {
    component:
      'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8853%3A101701&t=UB1UyuVY8bXXHBn2-4',
    options: {
      style: {
        top: -3,
      },
    },
  },
};

DarkMode.parameters = {
  figma: {
    component:
      'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8853%3A101701&t=UB1UyuVY8bXXHBn2-4',
    options: {
      style: {
        top: -3,
      },
    },
  },
};
