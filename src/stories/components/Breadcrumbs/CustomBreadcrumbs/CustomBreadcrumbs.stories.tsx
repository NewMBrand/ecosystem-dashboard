import { siteRoutes } from '@ses/config/routes';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import CustomBreadcrumbs from './CustomBreadcrumbs';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/General/CustomBreadcrumbs',
  component: CustomBreadcrumbs,
} as ComponentMeta<typeof CustomBreadcrumbs>;

const variantsArgs = [
  {
    items: [
      {
        label: 'Finances',
        url: siteRoutes.financesOverview,
      },
      {
        label: 'Recognized Delegates',
        url: siteRoutes.recognizedDelegateReport,
      },
    ],
    isLight: true,
    isMobile: true,
  },
  {
    items: [
      {
        label: 'Finances',
        url: siteRoutes.financesOverview,
      },
      {
        label: 'Recognized Delegates',
        url: siteRoutes.recognizedDelegateReport,
      },
    ],
    isLight: true,
    isMobile: false,
  },
];

export const [[Light, Dark]] = createThemeModeVariants(CustomBreadcrumbs, variantsArgs);

Light.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=14373%3A153164&t=Jep4bn14wWID0JJh-4',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: 16,
            left: -1,
          },
        },
      },
      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=14539%3A157715&t=Kd62ceA2W2vSGvgB-4',
        options: {
          componentStyle: {
            width: 834,
          },
          style: {
            top: -1,
            left: 1,
          },
        },
      },
    },
  },
};
