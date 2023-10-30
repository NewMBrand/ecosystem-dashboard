import { useMediaQuery } from '@mui/material';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import lightTheme from '@ses/styles/theme/light';
import PageSubheader from './PageSubheader';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/Actor/ProjectsPageSubheader',
  component: PageSubheader,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280],
    },
  },
} as ComponentMeta<typeof PageSubheader>;

const variantsArgs = [
  {
    isFilterCollapsedOnMobile: true,
    statuses: [],
    activeStatuses: [],
    searchQuery: '',
  },
];
export const [[LightMode, DarkMode]] = createThemeModeVariants((props) => {
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));

  return <PageSubheader {...props} isMobile={isMobile} />;
}, variantsArgs);

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=26861:199589',
        options: {
          componentStyle: {
            width: 343,
          },
        },
      },
      768: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=26315:267176',
        options: {
          componentStyle: {
            width: 704,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=26314:262204',
        options: {
          componentStyle: {
            width: 960,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=26314:256298',
        options: {
          componentStyle: {
            width: 1184,
          },
        },
      },
    },
  },
};
