import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import MilestoneCard from './MilestoneCard';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof MilestoneCard> = {
  title: 'Components/Endgame/Milestone Card',
  component: MilestoneCard,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280],
      pauseAnimationAtEnd: true,
    },
  },
};

export default meta;

const variantsArgs = [{}];

const [[LightMode, DarkMode]] = createThemeModeVariants(MilestoneCard, variantsArgs, false);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28714-293401',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: -2,
            left: -6,
          },
        },
      },
      768: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28417-454545',
        options: {
          componentStyle: {
            width: 133,
          },
          style: {
            top: -20,
            left: -40,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28869-228326',
        options: {
          componentStyle: {
            width: 181.4,
          },
          style: {
            top: -20,
            left: -40,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28869-178237',
        options: {
          componentStyle: {
            width: 223.8,
          },
          style: {
            top: -20,
            left: -40,
          },
        },
      },
    },
  } as FigmaParams,
};
