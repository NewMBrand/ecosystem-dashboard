import type { SortEnum } from '@ses/core/enums/sortEnum';
import type { Team } from '@ses/core/models/interfaces/team';
import type { DateTime } from 'luxon';

export type FilterDoughnut = 'Actual' | 'Forecast' | 'Net Expenses On-chain' | 'Net Expenses Off-chain' | 'Budget';

export interface NavigationCard {
  image: string;
  title: string;
  description?: React.ReactNode;
  href: string;
  totalDai?: number;
  valueDai?: number;
  color: string;
}
export interface DoughnutSeries {
  name: string;
  value: number;
  percent: number;
  actuals: number;
  budgetCap: number;
  color: string;
}

export type PeriodicSelectionFilter = 'Monthly' | 'Quarterly' | 'Annually' | 'Semi-annual';

export interface DelegateExpenseTableHeader {
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  styles?: React.CSSProperties;
  sort?: SortEnum;
  hidden?: boolean;
  sortReverse?: boolean;
}

// Update Date for Expense when Api is ready
export interface MomentDataItem extends Team {
  reportMonth: DateTime;
  totalActuals: number;
  lastModified: DateTime;
}
export type Metric = 'Budget' | 'Actual' | 'Forecast' | 'Net Expenses On-chain' | 'Net Expenses Off-chain';
export interface MetricsWithAmount {
  name: Metric;
  amount: number;
}

export interface MetricValues {
  Budget: number;
  Actual: number;
  Forecast: number;
  'Net Expenses On-chain': number;
  'Net Expenses Off-chain': number;
}

export interface ValueSeriesBreakdownChart {
  value: number;
  itemStyle: {
    borderRadius: [number, number, number, number];
  };
}

export interface SeriesBreakdownChart {
  name: string;
  data: ValueSeriesBreakdownChart[];
}

export interface MakerDAOExpenseMetricsLineChart {
  Atlas: boolean;
  Forecast: boolean;
  Actuals: boolean;
  'Net Expenses On-chain': boolean;
  'Net Expenses Off-chain Included': boolean;
}

export interface SeriesBreakDownChart {
  name: 'Endgame Atlas';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  type: string;
  stack: string;
  barWidth: number;
  showBackground: boolean;
  visible: boolean;
  itemStyle?: {
    color: string;
  };
}
