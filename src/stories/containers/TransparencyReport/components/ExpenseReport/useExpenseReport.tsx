import useMediaQuery from '@mui/material/useMediaQuery';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useHashFragment } from '@ses/core/hooks/useHashFragment';
import lightTheme from '@ses/styles/theme/light';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BREAKDOWN_VIEW_QUERY_KEY } from '../../utils/constants';
import { useTransparencyActuals } from '../TransparencyActuals/useTransparencyActuals';
import { useTransparencyForecast } from '../TransparencyForecast/useTransparencyForecast';
import { useTransparencyMkrVesting } from '../TransparencyMkrVesting/useTransparencyMkrVesting';
import { useTransparencyTransferRequest } from '../TransparencyTransferRequest/useTransparencyTransferRequest';
import ExpenseSection from './components/ExpenseSection/ExpenseSection';
import type { InternalTabsProps } from '@ses/components/Tabs/Tabs';
import type { BudgetStatementDto } from '@ses/core/models/dto/coreUnitDTO';
import type { ExpenseCategory } from '@ses/core/models/dto/expenseCategoriesDTO';
import type { DateTime } from 'luxon';

const useExpenseReport = (
  currentMonth: DateTime,
  budgetStatements?: BudgetStatementDto[],
  expenseCategories?: ExpenseCategory[]
) => {
  const { isLight } = useThemeContext();
  const query = useRouter().query;

  // move to the hash id when the page loads
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('table_834'));
  useHashFragment({
    offset: isMobile ? 180 : 270,
    addListeners: false,
    delayOnLoad: 300,
  });

  const actualsData = useTransparencyActuals(currentMonth, budgetStatements, expenseCategories);
  const forecastData = useTransparencyForecast(currentMonth, budgetStatements);
  const mkrVestingData = useTransparencyMkrVesting(currentMonth, budgetStatements);
  const transferRequestsData = useTransparencyTransferRequest(currentMonth, budgetStatements);

  const [isBreakdownExpanded, setIsBreakdownExpanded] = useState(() => query[BREAKDOWN_VIEW_QUERY_KEY] === 'default');
  useEffect(() => {
    // update breakdown expanded state when its query param changes
    // this keeps both breakdown tabs content synced
    setIsBreakdownExpanded(query[BREAKDOWN_VIEW_QUERY_KEY] === 'default');
  }, [query]);

  const [L2SectionInner, L2SectionOuter] = useMemo(
    () => [
      isMobile
        ? ({ children }: React.PropsWithChildren) => <ExpenseSection level={2}>{children}</ExpenseSection>
        : React.Fragment,
      isMobile
        ? React.Fragment
        : ({ children }: React.PropsWithChildren) => <ExpenseSection level={2}>{children}</ExpenseSection>,
    ],
    [isMobile]
  );

  // sync the actuals and the forecast breakdown tabs expanded state
  const [handleActualsBreakdownExpand, setHandleActualsBreakdownExpand] =
    useState<(inExpanded: boolean) => void | undefined>();
  const [handleForecastBreakdownExpand, setHandleForecastBreakdownExpand] =
    useState<(inExpanded: boolean) => void | undefined>();

  const onActualsBreakdownTabsInit = useCallback(({ setExpanded }: InternalTabsProps) => {
    setHandleActualsBreakdownExpand(() => setExpanded);
  }, []);
  const onForecastBreakdownTabsInit = useCallback(({ setExpanded }: InternalTabsProps) => {
    setHandleForecastBreakdownExpand(() => setExpanded);
  }, []);

  const onActualsBreakdownExpand = useCallback(
    (isExpanded: boolean) => {
      handleForecastBreakdownExpand?.(isExpanded);
    },
    [handleForecastBreakdownExpand]
  );

  const onForecastBreakdownExpand = useCallback(
    (isExpanded: boolean) => {
      handleActualsBreakdownExpand?.(isExpanded);
    },
    [handleActualsBreakdownExpand]
  );

  return {
    isMobile,
    L2SectionInner,
    L2SectionOuter,
    isLight,
    actualsData,
    forecastData,
    mkrVestingData,
    transferRequestsData,
    isBreakdownExpanded,

    onActualsBreakdownTabsInit,
    onForecastBreakdownTabsInit,
    onActualsBreakdownExpand,
    onForecastBreakdownExpand,
  };
};

export default useExpenseReport;
