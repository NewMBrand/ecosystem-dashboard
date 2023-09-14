import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import CardChartOverview from './CardChartOverview';
import type { DoughnutSeries } from '@ses/core/models/interfaces/doughnutSeries';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/NewFinances/Section/CardChartOverview',
  component: CardChartOverview,

  parameters: {
    chromatic: {
      viewports: [768, 1024, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof CardChartOverview>;

const args = [
  {
    filters: ['Actual', 'Forecast', 'Net Expenses On-chain', 'Net Expenses Off-chain', 'Budget'],
    filterSelected: 'Budget',
    handleSelectFilter: () => null,
    actuals: 9120,
    budgetCap: 9120,
    prediction: 4436,

    doughnutSeriesData: [
      {
        name: 'Endgame Atlas Budgets',
        value: 1790155,
        percent: 82,
        actuals: 9.6,
        budgetCap: 12.9,
        color: '#F99374',
      },
      {
        name: 'Endgame Scope Budgets',
        value: 12000000,
        percent: 12,
        actuals: 5.6,
        budgetCap: 42.9,
        color: '#447AFB',
      },
      {
        name: 'MakerDAO Legacy Budgets',
        value: 9000000,
        percent: 8,
        actuals: 19.6,
        budgetCap: 12.9,
        color: '#2DC1B1',
      },
    ] as DoughnutSeries[],
  },
];
export const [[LightMode, DarkMode]] = createThemeModeVariants(CardChartOverview, args);
LightMode.parameters = {
  figma: {
    component: {
      768: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24369:101411&mode=dev',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: -20,
            left: -38,
          },
        },
      },
      1024: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24542:201488&mode=dev',
        options: {
          componentStyle: {
            width: 960,
          },
          style: {
            top: -20,
            left: -38,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:213618&mode=dev',
        options: {
          componentStyle: {
            width: 1184,
          },
          style: {
            top: -20,
            left: -38,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:199880&mode=dev',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: -20,
            left: -38,
          },
        },
      },
      1920: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:204180&mode=dev',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: -20,
            left: -38,
          },
        },
      },
    },
  } as FigmaParams,
};

DarkMode.parameters = {};
