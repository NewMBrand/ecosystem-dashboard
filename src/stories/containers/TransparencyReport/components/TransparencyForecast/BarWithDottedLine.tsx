import styled from '@emotion/styled';
import { CustomPopover } from '@ses/components/CustomPopover/CustomPopover';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import React, { useState } from 'react';
import {
  getBorderColor,
  getDisplacementDashLine,
  getPercentFullBar,
  getProgressiveBarColor,
} from '../../utils/forecastHelper';
import PopoverForecastDescription from '../PopverForecastDescription/PopoverForecastDescription';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
import type { DateTime } from 'luxon';

interface Props {
  value: number;
  relativeValue: number;
  month?: DateTime;
  isTotal?: boolean;
}

const BarWithDottedLineMobile: React.FC<Props> = ({ value, relativeValue, month, isTotal = false }) => {
  const { isLight } = useThemeContext();
  const monthFormatted = month?.toFormat('MMMM') || '3 Months Budget Cap';
  const [hover, setHover] = useState(false);

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setHover(true);
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setHover(false);
  };
  const barColor = getProgressiveBarColor(value, relativeValue, isLight, hover);
  const percent = getPercentFullBar(value, relativeValue);
  const displacement = getDisplacementDashLine(value, relativeValue);
  const borderColor = getBorderColor(value, relativeValue, isLight);
  return (
    <Container>
      <Forecast isLight={isLight} isTotal={isTotal} isNegative={value < 0}>
        {usLocalizedNumber(value)}
      </Forecast>
      <ContainerBar>
        <BudgetBar isLight={isLight}>{<BarPercent width={percent} color={barColor} />}</BudgetBar>
        <CustomPopover
          leaveOnChildrenMouseOut
          popoverStyle={{
            border: `1px solid ${borderColor}`,
            boxShadow: isLight
              ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
              : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
            background: isLight ? 'white' : '#000A13',
            borderRadius: '6px',
          }}
          id="mouse-over-information"
          title={<PopoverForecastDescription relativeValue={relativeValue} value={value} month={monthFormatted} />}
        >
          <ContainerRelative>
            <ContendBarForSpace
              onMouseEnter={handleMouseOver}
              onMouseOut={handleMouseOut}
              displacement={displacement}
              onClick={handleMouseOver}
            >
              <VerticalBar onMouseEnter={handleMouseOver} onMouseOut={handleMouseOut} onClick={handleMouseOver} />
            </ContendBarForSpace>
          </ContainerRelative>
        </CustomPopover>
      </ContainerBar>
      <BudgetCap isLight={isLight}>{usLocalizedNumber(relativeValue)}</BudgetCap>
    </Container>
  );
};

export default BarWithDottedLineMobile;

const Container = styled.div({
  paddingTop: 4,
  width: 101,
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  letterSpacing: '0.3px',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
});
const ContainerBar = styled.div({
  height: 16,
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  width: '100%',
});

const VerticalBar = styled.div<{ displacement?: number }>(({ displacement }) => ({
  height: 16,
  borderRadius: 6,
  border: '1px dashed #447AFB',
  right: `${displacement}%`,
  transform: 'rotate(180deg)',
  cursor: 'pointer',
  marginRight: -4,
}));

const BudgetBar = styled.div<WithIsLight>(({ isLight }) => ({
  position: 'relative',
  width: '100%',
  height: 6,
  overflow: 'hidden',
  borderRadius: 2,
  background: isLight ? '#ECF1F3' : '#48495F',
}));

const BarPercent = styled.div<{ width: number; color: string }>(({ width, color }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  background: color,
  borderRadius: 2,
  width: `${width}%`,
  height: '100%',
  transition: 'width, background 0.5s ease-in-out',
}));
const BudgetCap = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 12,
  lineHeight: '15px',
  textAlign: 'right',
  color: isLight ? '#708390' : '#546978',
  marginRight: 2,
}));

const ContendBarForSpace = styled.div<{ displacement: number }>(({ displacement }) => ({
  width: 6,
  position: 'absolute',
  right: `${displacement}%`,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  top: 0,
  cursor: 'pointer',
}));

const ContainerRelative = styled.div({
  height: 20,
});
const Forecast = styled.div<WithIsLight & { isTotal: boolean; isNegative?: boolean; isLight: boolean }>(
  ({ isLight, isTotal, isNegative }) => ({
    fontSize: '16px',
    lineHeight: '19px',
    textAlign: 'right',
    fontWeight: isTotal ? 700 : 400,
    color: isLight ? (isNegative ? '#F75524' : '#231536') : isNegative ? '#F75524' : '#D2D4EF',
  })
);
