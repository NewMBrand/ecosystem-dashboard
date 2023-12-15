import { BudgetAnalyticBuilder } from '@ses/core/businessLogic/builders/budgetAnalyticBuilder';
import { BudgetBuilder } from '@ses/core/businessLogic/builders/budgetBuilder';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import AppLayout from '../AppLayout/AppLayout';
import FinancesContainer from './FinancesContainer';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof FinancesContainer> = {
  title: 'Pages/FinancesContainer',
  component: FinancesContainer,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      router: {
        pathname: '/finances',
      },
    },

    chromatic: {
      viewports: [375, 834, 1194, 1280, 1440, 1920],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    budgets: [
      new BudgetBuilder()
        .withParentId(null)
        .withName('Endgame Atlas Budgets')
        .withImage('budget.jpg')
        .withIdPath('1/6/7')
        .withId('1')
        .withDescription('Description of the budget')
        .withCodePath('atlas/inmutable')
        .withCode('fds')
        .build(),
      new BudgetBuilder()
        .withParentId(null)
        .withName('Endgame Scope Budgets')
        .withImage('budget.jpg')
        .withIdPath('1/6/7')
        .withId('2')
        .withDescription('Description of the budget')
        .withCodePath('atlas/scope')
        .withCode('fds')
        .build(),
      new BudgetBuilder()
        .withParentId(null)
        .withName('MakerDAO Legacy Budgets')
        .withImage('budget.jpg')
        .withIdPath('1/6/7')
        .withId('3')
        .withDescription('Description of the budget')
        .withCodePath('atlas/legacy')
        .withCode('fds')
        .build(),
    ],
    yearsRange: ['2023', '2022'],
    initialYear: '2023',
    budgetsAnalytics: [
      new BudgetAnalyticBuilder()
        .withMetric('test', {
          actuals: {
            value: 5000,
            unit: 'DAI',
          },
          budget: {
            value: 10000,
            unit: 'DAI',
          },
          forecast: {
            value: 3440,
            unit: 'DAI',
          },
          paymentsOnChain: {
            value: 3430,
            unit: 'DAI',
          },
          paymentsOffChainIncluded: {
            value: 343430,
            unit: 'DAI',
          },
        })
        .build(),
    ],
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(
  (props) => (
    <AppLayout>
      <FinancesContainer {...props} />
    </AppLayout>
  ),
  variantsArgs
);
export { LightMode, DarkMode };
