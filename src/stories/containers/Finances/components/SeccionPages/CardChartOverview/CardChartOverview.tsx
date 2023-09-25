import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import DoughnutChartFinances from '../../OverviewCardKeyDetailsBudget/DoughnutChartFinances/DoughnutChartFinances';
import InformationBudgetCapOverview from '../../OverviewCardKeyDetailsBudget/InformationBudgetCapOverView/InformationBudgetCapOverView';
import type { FilterDoughnut } from '@ses/containers/Finances/utils/types';
import type { DoughnutSeries } from '@ses/core/models/interfaces/doughnutSeries';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  filters: FilterDoughnut[];
  filterSelected: string;
  handleSelectFilter: (filterSelected: FilterDoughnut) => void;
  actuals: number;
  budgetCap: number;
  prediction: number;
  doughnutSeriesData: DoughnutSeries[];
}
const CardChartOverview: React.FC<Props> = ({
  filterSelected,
  filters,
  handleSelectFilter,
  actuals,
  budgetCap,
  prediction,
  doughnutSeriesData,
}) => {
  const { isLight } = useThemeContext();
  const handleOnclick = (item: FilterDoughnut) => () => {
    handleSelectFilter(item);
  };

  return (
    <Container isLight={isLight}>
      <ContainerFilters>
        {filters.map((item, index) => (
          <Item key={index} isLight={isLight} isSelected={filterSelected === item} onClick={handleOnclick(item)}>
            {item}
          </Item>
        ))}
      </ContainerFilters>

      <ContainerCardChart>
        <ContainerCardAndLine>
          <ContainerCardInformation>
            <InformationBudgetCapOverview actuals={actuals} budgetCap={budgetCap} prediction={prediction} />
          </ContainerCardInformation>
          <Divider isLight={isLight} />
        </ContainerCardAndLine>
        <ContainerChat>
          <DoughnutChartFinances doughnutSeriesData={doughnutSeriesData} />
        </ContainerChat>
      </ContainerCardChart>
    </Container>
  );
};

export default CardChartOverview;

const Container = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'none',
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 16px 24px 32px',
    borderRadius: 6,
    border: isLight ? '1px solid rgba(212, 217, 225, 0.25)' : '#31424E',
    background: isLight ? '#FFF' : '#1E2C37',
    boxShadow: isLight
      ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
      : ' 0px 1px 3px 0px rgba(30, 23, 23, 0.25), 0px 20px 40px -40px rgba(7, 22, 40, 0.40)',

    height: 223,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    padding: '16px 24px 24px 32px',
    height: 223,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    padding: '16px 24px 48px 64px',
    height: 311,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    padding: '16px 16px 48px 64px',

    height: 311,
  },
}));

const ContainerFilters = styled.div({
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    gap: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',

    marginTop: -2,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    gap: 24,
    marginBottom: 32,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginRight: 8,
  },
});

const Item = styled.div<WithIsLight & { isSelected: boolean }>(({ isLight, isSelected }) => ({
  [lightTheme.breakpoints.up('tablet_768')]: {
    color: isLight ? (isSelected ? '#2DC1B1' : '#D1DEE6') : isSelected ? '#139D8D' : '#546978',
    fontSize: 10,
    fontWeight: 500,
    lineHeight: 'normal',
    cursor: 'pointer',
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    fontSize: 14,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    fontSize: 16,
  },
}));

const ContainerCardChart = styled.div({
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    flex: 1,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flexDirection: 'row',
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    display: 'flex',
    flexDirection: 'row',
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const ContainerCardInformation = styled.div({
  [lightTheme.breakpoints.up('tablet_768')]: {
    width: 241,
    paddingTop: 4,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    width: 300,

    paddingTop: 'revert',
    paddingLeft: 'revert',
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 300,

    paddingTop: 'revert',
    paddingLeft: 'revert',
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 300,
  },
});

const Divider = styled.div<WithIsLight>(({ isLight }) => ({
  borderLeft: `1px solid ${isLight ? '#D4D9E1' : '#405361'}`,
  [lightTheme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    marginLeft: 32,
    height: 134,
    marginTop: 20,
    borderLeft: `1px solid ${isLight ? '#D4D9E1' : '#405361'}`,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginTop: 20,
    height: 134,
    marginLeft: 32,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginTop: 0,
    height: 192,
    marginLeft: 64,
  },
}));

const ContainerChat = styled.div({
  display: 'flex',

  [lightTheme.breakpoints.up('tablet_768')]: {
    width: 420,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    width: 440,
    marginRight: 32,
    transition: 'all .3s ease',
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 440,
    marginRight: 166,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 430,
    marginRight: 242,
  },
});

const ContainerCardAndLine = styled.div({
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'row',
  },
});
