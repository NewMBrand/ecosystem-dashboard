import { withFixedPositionRelative } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import Header from './Header';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/General/Header/Header',
  component: Header,
  decorators: [withFixedPositionRelative],
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      viewports: [375, 834, 1194],
      pauseAnimationAtEnd: true,
    },
    nextRouter: {
      pathname: '/ecosystem-actors',
    },
  },
} as ComponentMeta<typeof Header>;

const variantsArgs = [{}];

export const [[LightMode, DarkMode]] = createThemeModeVariants(Header, variantsArgs);

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20187:244490&mode=design&t=pfqz22dPEWKnkidY-4',
        options: {
          style: {
            top: -36,
            left: -42,
          },
        },
      },
      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20191:258350&mode=design&t=pfqz22dPEWKnkidY-4',
        options: {
          componentStyle: {
            width: 834,
          },
          style: {
            top: -36,
            left: -40,
          },
        },
      },
      1194: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20187:230562&mode=design&t=pfqz22dPEWKnkidY-4',
        options: {
          componentStyle: {
            width: 1194,
          },
          style: {
            top: -36,
            left: -40,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20187:230319&mode=design&t=pfqz22dPEWKnkidY-4',
        options: {
          componentStyle: {
            width: 1280,
          },
          style: {
            top: -36,
            left: -40,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=13234:127734&mode=design&t=pfqz22dPEWKnkidY-4',
        options: {
          componentStyle: {
            width: 1440,
          },
          style: {
            top: -36,
            left: -40,
          },
        },
      },
      1920: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20187:229592&mode=design&t=pfqz22dPEWKnkidY-4',
        options: {
          componentStyle: {
            width: 1920,
          },
          style: {
            top: -36,
            left: -40,
          },
        },
      },
    },
  } as FigmaParams,
};
