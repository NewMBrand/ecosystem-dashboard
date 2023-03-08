import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import HorizontalBudgetBar from './HorizontalBudgetBar';
import type { ComponentMeta, Story } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/Finances/Horizontal Budget Bar',
  component: HorizontalBudgetBar,
  decorators: [
    (Story: Story) => (
      <div style={{ maxWidth: 210 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    chromatic: {
      viewports: [375, 834],
      pauseAnimationAtEnd: true,
    },
  },
  argTypes: {},
} as ComponentMeta<typeof HorizontalBudgetBar>;

const args = [
  {
    prediction: 5822365.0,
    actuals: 5083445.0,
    budgetCap: 8394564.0,
  },
];
export const [[LightMode, DarkMode]] = createThemeModeVariants(HorizontalBudgetBar, args);
LightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13399%3A147624',
        options: {
          componentStyle: {
            width: 148,
          },
          style: {
            top: -9,
            left: 0,
          },
        },
      },
      834: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13399%3A144878',
        options: {
          componentStyle: {
            width: 208.67,
          },
          style: {
            top: -2,
            left: 0,
          },
        },
      },
    },
  } as FigmaParams,
};
