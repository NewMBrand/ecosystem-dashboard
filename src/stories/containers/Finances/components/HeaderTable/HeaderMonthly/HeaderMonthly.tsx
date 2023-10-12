import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import CellMonthly from './CellMonthly';
import type { MetricsWithAmount } from '@ses/containers/Finances/utils/types';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  metrics: MetricsWithAmount[];
  title: string;
  months: string[];
}

export const HeaderMonthly: React.FC<Props> = ({ metrics, title, months }) => {
  const { isLight } = useThemeContext();
  return (
    <Container isLight={isLight}>
      <ContainerAnnually>
        <ContainerTitle>
          <Title isLight={isLight}>{title}</Title>
        </ContainerTitle>
        <ContainerYear>
          <ContainerAnnuallyCell>
            {months.map((month) => (
              <CellMonthly metrics={metrics} title={month} key={month} />
            ))}
            <CellMonthlyTotally metrics={metrics} title="Total" isTotal />
          </ContainerAnnuallyCell>
        </ContainerYear>
      </ContainerAnnually>
    </Container>
  );
};

export default HeaderMonthly;

const Container = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  flex: 1,
  justifyContent: 'flex-start',
  borderRadius: 6,
  backgroundColor: isLight ? '#E5E9EC' : '#405361',
  boxShadow: isLight ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)' : 'red',
  alignItems: 'center',
  whiteSpace: 'pre',
  overflow: 'auto',
  height: 97,
  '&::-webkit-scrollbar': {
    width: 0,
    height: 0,
  },
}));
const ContainerAnnually = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',

  [lightTheme.breakpoints.up('desktop_1440')]: {
    maxWidth: 1312,
  },
});

const ContainerAnnuallyCell = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
});

const Title = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : '#D2D4EF',
  fontFamily: 'Inter, sans-serif',
  fontSize: 16,
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: 'normal',
}));

const ContainerTitle = styled.div({
  display: 'flex',
  padding: '16px 0px 16px 32px',
  alignItems: 'center',
  minWidth: 195,
  height: 48,
  [lightTheme.breakpoints.up('desktop_1920')]: {
    minWidth: 230,
  },
});

const ContainerYear = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
});

const CellMonthlyTotally = styled(CellMonthly)({
  width: 85,
});
