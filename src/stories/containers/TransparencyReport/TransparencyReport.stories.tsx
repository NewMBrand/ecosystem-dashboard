import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import { FeatureFlagsProvider } from '@ses/core/context/FeatureFlagsProvider';
import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';

import { withLocalStorageItem } from '@ses/core/utils/storybook/loaders';
import { SESCoreUnitMocked } from '@ses/core/utils/storybook/mocks/coreUnitsMocks';
import { featureFlags } from 'feature-flags/feature-flags';
import AppLayout from '../AppLayout/AppLayout';
import { TransparencyReport } from './TransparencyReport';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Pages/CU Transparency Report',
  component: TransparencyReport,
  decorators: [withoutSBPadding],

  parameters: {
    nextRouter: {
      path: '/core-unit/[code]/finances/reports',
      asPath: '/core-unit/SES/finances/reports',
      query: {
        code: 'SES',
      },
    },
    chromatic: {
      viewports: [375, 834, 1194],
      pauseAnimationAtEnd: true,
      delay: 10000,
    },
    date: new Date('2022-09-22T12:23:00Z'),
  },
  loaders: [withLocalStorageItem('activity-visit-SES', '1662812570000')],
} as ComponentMeta<typeof TransparencyReport>;

const variantsArgs = [
  // actuals
  {
    coreUnit: SESCoreUnitMocked,
    coreUnits: [SESCoreUnitMocked],
  },
  // actuals without data (empty)
  {
    coreUnit: {
      ...SESCoreUnitMocked,
      budgetStatements: [],
    },
    coreUnits: [SESCoreUnitMocked],
  },
  // forecast
  {
    coreUnit: SESCoreUnitMocked,
    coreUnits: [SESCoreUnitMocked],
  },
  // mkr vesting
  {
    coreUnit: SESCoreUnitMocked,
    coreUnits: [SESCoreUnitMocked],
  },
  // transfer requests
  {
    coreUnit: SESCoreUnitMocked,
    coreUnits: [SESCoreUnitMocked],
  },
  // expense report
  {
    coreUnit: SESCoreUnitMocked,
    coreUnits: [SESCoreUnitMocked],
  },
];

export const [
  [ActualsWithDataLightMode, ActualsWithDataDarkMode],
  [ActualsWithoutDataLightMode, ActualsWithoutDataDarkMode],
  [ForecastTabLightMode, ForecastTabDarkMode],
  [MKRVestingLightMode, MKRVestingDarkMode],
  [TransferRequestsLightMode, TransferRequestsDarkMode],
  [ExpenseReportLightMode, ExpenseReportDarkMode],
] = createThemeModeVariants(
  (props) => (
    <FeatureFlagsProvider enabledFeatures={featureFlags[CURRENT_ENVIRONMENT]}>
      <AppLayout>
        <TransparencyReport {...props} />
      </AppLayout>
    </FeatureFlagsProvider>
  ),
  variantsArgs,
  false
);

const forecastParams = {
  nextRouter: {
    path: '/core-unit/[code]/finances/reports?section=forecast',
    asPath: '/core-unit/SES/finances/reports?section=forecast',
    query: {
      section: 'forecast',
    },
  },
};
ForecastTabLightMode.parameters = forecastParams;
ForecastTabDarkMode.parameters = forecastParams;

const mkrVestingParams = {
  nextRouter: {
    path: '/core-unit/[code]/finances/reports?section=mkr-vesting',
    asPath: '/core-unit/SES/finances/reports?section=mkr-vesting',
    query: {
      section: 'mkr-vesting',
    },
  },
};
MKRVestingLightMode.parameters = mkrVestingParams;
MKRVestingDarkMode.parameters = mkrVestingParams;

const transferRequestsParams = {
  nextRouter: {
    path: '/core-unit/[code]/finances/reports?section=transfer-requests',
    asPath: '/core-unit/SES/finances/reports?section=transfer-requests',
    query: {
      section: 'transfer-requests',
    },
  },
};
TransferRequestsLightMode.parameters = transferRequestsParams;
TransferRequestsDarkMode.parameters = transferRequestsParams;

const expenseReportParams = {
  nextRouter: {
    path: '/core-unit/[code]/finances/reports?view=auditor&section=budget-report',
    asPath: '/core-unit/SES/finances/reports?view=auditor&section=budget-report',
    query: {
      view: 'auditor',
      section: 'budget-report',
    },
  },
};
ExpenseReportLightMode.parameters = expenseReportParams;
ExpenseReportDarkMode.parameters = expenseReportParams;
