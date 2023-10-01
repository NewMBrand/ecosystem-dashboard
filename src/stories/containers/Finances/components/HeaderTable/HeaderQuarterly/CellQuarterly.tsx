import styled from '@emotion/styled';
import { returnShortNameForMetric } from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { MetricsWithAmount } from '@ses/containers/Finances/utils/types';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  metrics: MetricsWithAmount[];
  quarterly: string;
  isTotal?: boolean;
  className?: string;
}

export const CellQuarterly: React.FC<Props> = ({ metrics, quarterly, isTotal = false, className }) => {
  const { isLight } = useThemeContext();

  return (
    <MainContainer isLight={isLight} isTotal={isTotal} className={className}>
      <ContainerCell>
        <Quarterly isLight={isLight}>{quarterly}</Quarterly>
        <ContainerMetricsData>
          {metrics?.map((metric, index) => (
            <Metrics key={index}>
              <Name isLight={isLight}>{returnShortNameForMetric(metric).name}</Name>
              <Amount isLight={isLight}>{usLocalizedNumber(metric.amount)}</Amount>
            </Metrics>
          ))}
        </ContainerMetricsData>
      </ContainerCell>
    </MainContainer>
  );
};

export default CellQuarterly;

const MainContainer = styled.div<WithIsLight & { isTotal: boolean }>(({ isLight, isTotal }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  flex: 1,
  minWidth: isTotal ? 105 : 96,
  position: 'relative',
  alignItems: 'center',
  padding: isTotal ? '16px 0px 16px 8px' : '16px 4px',
  backgroundColor: isLight ? (isTotal ? 'rgba(209, 222, 230, 0.50)' : 'transparent') : isTotal ? 'red' : 'red',
  ...(!isTotal && {
    ':after': {
      content: '""',
      position: 'relative',
      height: 48,
      left: 10,
      //
      borderLeft: `1px solid ${isLight ? '#D1DEE6' : 'red'}`,
      [lightTheme.breakpoints.up('tablet_768')]: {
        left: 6,
      },
      [lightTheme.breakpoints.up('desktop_1024')]: {
        left: 4,
      },
      [lightTheme.breakpoints.up('desktop_1280')]: {
        left: 0,
      },

      [lightTheme.breakpoints.up('desktop_1440')]: {
        left: 0,
      },
      [lightTheme.breakpoints.up('desktop_1920')]: {
        left: 2,
      },
    },
  }),
  [lightTheme.breakpoints.up('desktop_1024')]: {
    minWidth: isTotal ? 147 : 154,

    padding: isTotal ? '16px 8px 16px' : '16px 4px',
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    minWidth: isTotal ? 162 : 177,

    padding: isTotal ? '16px 16px' : '16px 0px',
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    minWidth: isTotal ? 197 : 191,

    padding: isTotal ? '16px 11px 16px 16px' : '16px 0px',
  },
  [lightTheme.breakpoints.up('desktop_1920')]: {
    minWidth: isTotal ? 285 : 284,
  },
}));

const ContainerCell = styled.div({
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
});
const Quarterly = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  marginBottom: 6,
  fontWeight: 700,
  fontSize: 16,
  color: isLight ? '#231536' : 'red',

  [lightTheme.breakpoints.up('desktop_1280')]: {
    fontSize: 20,
    letterSpacing: '0.4px',
  },
}));
const ContainerMetricsData = styled.div({
  display: 'flex',
  flexDirection: 'column',

  [lightTheme.breakpoints.up('desktop_1024')]: {
    width: '100%',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
});
const Metrics = styled.div({
  display: 'flex',
  flexDirection: 'column',
  minWidth: 77.5,
  [lightTheme.breakpoints.up('desktop_1280')]: {
    minWidth: 83.5,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    minWidth: 93.5,
  },
  [lightTheme.breakpoints.up('desktop_1920')]: {
    minWidth: 80,
  },
});
const Name = styled.div<WithIsLight>(({ isLight }) => ({
  marginBottom: 4,
  fontSize: 11,
  fontWeight: 500,
  textAlign: 'center',
  fontStyle: 'normal',
  lineHeight: 'normal',
  color: isLight ? '#708390' : 'red',
  [lightTheme.breakpoints.up('desktop_1024')]: {
    textAlign: 'center',
  },
  [lightTheme.breakpoints.up('desktop_1920')]: {
    marginBottom: 2,
  },
}));
const Amount = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : 'red',
  fontSize: 12,
  fontWeight: 600,
  textAlign: 'center',
}));