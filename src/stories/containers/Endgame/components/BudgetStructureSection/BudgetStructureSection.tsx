import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React, { useEffect, useState } from 'react';
import BudgetDoughnutChart from '../BudgetDoughnutChart/BudgetDoughnutChart';
import SectionHeader from '../SectionHeader/SectionHeader';
import TotalBudgetContent from '../TotalBudgetContent/TotalBudgetContent';
import type { DoughnutSeries } from '@ses/core/models/interfaces/doughnutSeries';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const BudgetStructureSection: React.FC = () => {
  const { isLight } = useThemeContext();

  // avoid chart mounting flicker
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const doughnutSeriesData: DoughnutSeries[] = [
    {
      name: 'End-game Alignment Scope Budgets',
      value: 22000000,
      percent: 82,
      actuals: 0,
      budgetCap: 0,
      color: '#D2D4EF',
    },
    {
      name: 'End-game Atlas Immutable AA Budgets',
      value: 12000000,
      percent: 12,
      actuals: 0,
      budgetCap: 0,
      color: '#447AFB',
    },
    {
      name: 'MakerDAO Legacy Budgets',
      value: 9000000,
      percent: 8,
      actuals: 0,
      budgetCap: 0,
      color: '#1AAB9B',
    },
  ];

  return (
    <Content id="section-endgame-budget-structure">
      <SectionHeader
        title="Endgame Budget Structure"
        subtitle="Some simple but poignant text about what endgame budgets are about"
      />

      <Card isLight={isLight}>
        <TotalBudgetContent />
        <BudgetComposition isLight={isLight}>
          <BudgetCompositionTitle isLight={isLight}>Composition of Budget</BudgetCompositionTitle>
          {mounted && <BudgetDoughnutChart doughnutSeriesData={doughnutSeriesData} />}
        </BudgetComposition>
      </Card>
    </Content>
  );
};

export default BudgetStructureSection;

const Content = styled.section({
  display: 'flex',
  flexDirection: 'column',
  gap: 40,
  scrollMarginTop: 130, // here
});

const Card = styled.div<WithIsLight>(({ isLight }) => ({
  padding: '31px 0px 0px',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  gap: 32,
  borderRadius: 6,
  border: `1px solid ${isLight ? 'rgba(212, 217, 225, 0.25)' : '#31424E'}`,
  background: isLight ? '#FFF' : '#1E2C37',
  boxShadow: isLight
    ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
    : '0px 1px 3px 0px rgba(30, 23, 23, 0.25), 0px 20px 40px 0px rgba(7, 22, 40, 0.40)',

  [lightTheme.breakpoints.up('table_834')]: {
    flexDirection: 'row',
    padding: '31px 15px',
    gap: 24,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    padding: '31px 0 31px 63px',
    gap: 64,
  },
}));

const BudgetComposition = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  width: '100%',
  height: 353,
  padding: '24px 16px 0px',
  backgroundColor: isLight ? 'rgba(236, 239, 249, 0.25)' : '#1E2C37',

  [lightTheme.breakpoints.up('table_834')]: {
    alignSelf: 'center',
    height: 201,
    padding: 0,
    backgroundColor: isLight ? '#fff' : '#1E2C37',
    borderLeft: `1px solid ${isLight ? '#D4D9E1' : '#31424E'}`,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    height: 241,
  },
}));

const BudgetCompositionTitle = styled.h3<WithIsLight>(({ isLight }) => ({
  fontSize: 16,
  fontWeight: 700,
  fontStyle: 'normal',
  lineHeight: '19.36px',
  margin: 0,
  color: isLight ? '#231536' : '#D2D4EF',

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 20,
    fontWeight: 600,
    letterSpacing: '0.4px',
    marginTop: 2,
    marginLeft: '4.2%',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginLeft: '3.5%',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginLeft: '-4.8%',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginLeft: '-8%',
  },
}));
