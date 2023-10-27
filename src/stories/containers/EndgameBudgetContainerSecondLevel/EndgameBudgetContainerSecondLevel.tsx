import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import IconTitle from '@ses/components/IconTitle/IconTitle';
import { YEARS_FINANCES_SELECTED } from '@ses/core/utils/const';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import ConditionalWrapper from '../Finances/components/ConditionalWrapper/ConditionalWrapper';
import OverviewCardMobile from '../Finances/components/OverviewCardMobile/OverviewCardMobile';
import BreadcrumbYearNavigation from '../Finances/components/SectionPages/BreadcrumbYearNavigation';
import BreakdownTable from '../Finances/components/SectionPages/BreakdownTable/BreakdownTable';
import CardChartOverview from '../Finances/components/SectionPages/CardChartOverview/CardChartOverview';
import CardsNavigation from '../Finances/components/SectionPages/CardsNavigation/CardsNavigation';
import DelegateExpenseTrendFinances from '../Finances/components/SectionPages/DelegateExpenseTrendFinances/DelegateExpenseTrendFinances';
import { useEndgameBudgetContainerSecondLevel } from './useEndgameBudgetContainerSecondLevel';
import type { Budget } from '@ses/core/models/interfaces/budget';

interface Props {
  budgets: Budget[];
}

const EndgameBudgetContainerSecondLevel: React.FC<Props> = ({ budgets }) => {
  const {
    trailingAddressDesk,
    trailingAddress,
    handleChangeYearsEndgameAtlasBudget,
    year,
    title,
    icon,
    filters,
    filterSelected,
    doughnutSeriesData,
    handleSelectFilter,
    actuals,
    budgetCap,
    prediction,
    cardsNavigationInformation,
    getAllMetricsValuesTotal,
    activeMetrics,
    allowSelectAll,
    defaultMetricsWithAllSelected,
    maxItems,
    minItems,
    selectMetrics,
    popupContainerHeight,
    periodFilter,
    handlePeriodChange,
    handleResetMetrics,
    periodicSelectionFilter,
    handleSelectChangeMetrics,
    headersExpenseReport,
    reportExpenseItems,
    onSortClick,
    handleLoadMore,
    showSome,
  } = useEndgameBudgetContainerSecondLevel(budgets);

  return (
    <PageContainer>
      <BreadcrumbYearNavigation
        trailingAddress={trailingAddress}
        years={YEARS_FINANCES_SELECTED}
        handleChange={handleChangeYearsEndgameAtlasBudget}
        selectedValue={year}
        trailingAddressDesk={trailingAddressDesk}
        title={title}
      />
      <Container>
        <ContainerTitle>
          <IconTitle icon={icon} title={title} />
        </ContainerTitle>
        <ContainerSections>
          <WrapperDesk>
            <CardChartOverview
              filters={filters}
              filterSelected={filterSelected}
              handleSelectFilter={handleSelectFilter}
              actuals={actuals}
              budgetCap={budgetCap}
              prediction={prediction}
              doughnutSeriesData={doughnutSeriesData}
            />
          </WrapperDesk>
          <WrapperMobile>
            <OverviewCardMobile actuals={actuals} budgetCap={budgetCap} prediction={prediction} />
          </WrapperMobile>
          <CardsNavigation cardsNavigationInformation={cardsNavigationInformation} />
          <ConditionalWrapper period={'Quarterly'}>
            <BreakdownTable
              handleResetMetrics={defaultMetricsWithAllSelected}
              activeItems={activeMetrics}
              handleResetFilter={handleResetMetrics}
              handleChange={handlePeriodChange}
              metrics={selectMetrics}
              periodicSelectionFilter={periodicSelectionFilter}
              selectedValue={periodFilter}
              year={year}
              headerTableMetrics={getAllMetricsValuesTotal()}
              metricTotal={getAllMetricsValuesTotal()}
              maxItems={maxItems}
              minItems={minItems}
              allowSelectAll={allowSelectAll}
              popupContainerHeight={popupContainerHeight}
              handleSelectChange={handleSelectChangeMetrics}
            />
          </ConditionalWrapper>
        </ContainerSections>
        <ContainerLastReport>
          <DelegateExpenseTrendFinances
            columns={headersExpenseReport}
            expenseReport={reportExpenseItems}
            sortClick={onSortClick}
            handleLoadMore={handleLoadMore}
            showSome={showSome}
          />
        </ContainerLastReport>
      </Container>
    </PageContainer>
  );
};
export default EndgameBudgetContainerSecondLevel;

const ContainerTitle = styled.div({
  marginTop: 24,
  marginBottom: 24,
  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 32,
    marginTop: 32,
    marginBottom: 64,
  },
});

const ContainerSections = styled.div({
  gap: 16,
  display: 'flex',
  flexDirection: 'column',
  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 64,
  },
});

const WrapperDesk = styled.div({
  display: 'none',
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'column',
    gap: 64,
  },
});

const WrapperMobile = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
});

const ContainerLastReport = styled.div({
  marginTop: 40,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 64,
  },
});
