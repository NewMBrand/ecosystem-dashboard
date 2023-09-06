import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import MultiUsers from '../svg/MultiUsers';
import MultiUsersMobile from '../svg/MultiUsersMobile';
import CircleAvatarWithIcon from './CircleAvatarWithIcon';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/General/CircleAvatarWithIcon',
  component: CircleAvatarWithIcon,
  parameters: {
    chromatic: {
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof CircleAvatarWithIcon>;

const args = [
  {
    icon: <MultiUsers />,
    image: 'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png',
  },
  {
    width: 40,
    height: 40,
    icon: <MultiUsersMobile />,
    image: 'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png',
  },
];

export const [[DeskLightMode, DeskDarkMode], [Mobile, MobileDark]] = createThemeModeVariants(
  CircleAvatarWithIcon,
  args
);

DeskLightMode.parameters = {
  chromatic: {
    viewports: [1194],
  },
  figma: {
    component: {
      1194: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24106:112093&mode=dev',
        options: {
          style: {
            left: -4,
            top: -2,
          },
          componentStyle: {
            width: 32,
          },
        },
      },
    },
  },
};
DeskDarkMode.parameters = {};

Mobile.parameters = {
  chromatic: {
    viewports: [375],
  },
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24106:111271&mode=dev',
        options: {
          style: {
            left: -6,
            top: -4,
          },
          componentStyle: {
            width: 40,
          },
        },
      },
    },
  },
};
MobileDark.parameters = {};
