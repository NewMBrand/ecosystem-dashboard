import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import IconTitle from './IconTitle';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/IconTitle/IconTitle',
  component: IconTitle,
  parameters: {
    chromatic: {
      viewports: [375, 1440],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof IconTitle>;

const variantsArgs = [
  {
    title: 'Endgame Atlas Budget',
    icon: 'https://i.ibb.co/vXD0xDp/atlas.png',
  },
];

export const [[LightMode, DarkMode]] = createThemeModeVariants(IconTitle, variantsArgs);

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=27154:236087&mode=dev',
        options: {
          style: {
            top: -2,
            left: -4,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=21609:263019&mode=dev',
        options: {
          style: {
            top: -2,
            left: -4,
          },
        },
      },
    },
  } as FigmaParams,
};
DarkMode.parameters = {};
