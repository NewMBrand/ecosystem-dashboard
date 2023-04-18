import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';

import { useThemeContext } from '@ses/core/context/ThemeContext';
import { MONTHS_DESK, MONTS_MOBILE } from '@ses/core/utils/const';
import { replaceAllNumberLetOneBeforeDot } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/light';
import ReactECharts from 'echarts-for-react';

import React from 'react';

interface Props {
  expenses: number[];
}
const DelegateChart: React.FC<Props> = ({ expenses }) => {
  const { isLight } = useThemeContext();

  const upTable = useMediaQuery(lightTheme.breakpoints.up('table_834'));
  const isZeroValue = false;

  const options = {
    grid: {
      height: upTable ? 230 : 190,
      right: '0%',
      bottom: '10%',
    },
    xAxis: {
      type: 'category',
      data: upTable ? MONTHS_DESK : MONTS_MOBILE,
      splitLine: {
        show: false,
      },
      axisLine: {
        interval: 0,
        show: false,
        symbolOffset: 'left',
        lineStyle: {
          color: 'transparent',
        },
      },

      axisTick: {
        show: false,
      },
      axisLabel: {
        color: isLight ? '#434358' : '#708390',
        interval: 0,

        fontSize: upTable ? 12 : 9,
        lineHeight: upTable ? 15 : 11,

        formatter: function (value: string, index: number) {
          if ((value === 'J' && MONTHS_DESK[index - 1] === 'D') || MONTS_MOBILE[index - 1] === 'D') {
            return `{bgImg|${value}}`;
          }
          return value;
        },
        rich: {
          bgImg: {
            verticalAlign: 'top',
            color: '#139D8D',
            padding: upTable ? 4 : 3,
            fontFamily: 'Inter,san-serif',
            fontSize: upTable ? 12 : 9,
            lineHeight: upTable ? 15 : 11,
            interval: 0,
            backgroundColor: {
              image: isLight
                ? upTable
                  ? '/assets/img/drop-desk.png'
                  : '/assets/img/drop.png'
                : upTable
                ? ''
                : '/assets/img/drop-dark.png',
            },
          },
        },
      },
    },
    yAxis: {
      min: 0,
      max: 120000,
      interval: 20000,
      nameTextStyle: {
        align: 'center',
      },
      axisLabel: {
        margin: upTable ? 14 : 7,
        formatter: function (value: number, index: number) {
          if (value === 0 && index === 0) {
            return value.toString();
          }
          return replaceAllNumberLetOneBeforeDot(value).replace(/\.?0+$/g, '');
        },

        fontSize: upTable ? 12 : 10,
        height: upTable ? 15 : 12,
        fontFamily: 'Inter, sans-serif',
        fontWeight: upTable ? 600 : 400,
        fontFeatureSettings: "'tnum' on, 'lnum' on",
        color: isLight ? '#231536' : '#EDEFFF',
      },
      verticalAlign: 'middle',
      height: upTable ? 15 : 12,
      type: 'value',
      zlevel: 1,
      axisLine: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: expenses.map((item, index) => (index === 0 ? 'none' : isLight ? '#9FAFB9' : '#D8E0E3')),

          width: isZeroValue ? 0 : 0.25,
        },
      },
    },
    series: [
      {
        name: 'Active Budget',
        data: expenses,
        type: 'bar',
        stack: 'x',
        showBackground: false,
        barWidth: upTable ? 16 : 8,
        barGapCategory: upTable ? 17 : 7,

        itemStyle: {
          borderRadius: 4,
          barGapCategory: upTable ? 43 : 7,
          color: isLight ? '#739BFC' : '#447AFB',
        },
      },
    ],
  };

  return (
    <Container>
      <ReactECharts
        option={options}
        style={{
          height: '100%',
          width: '100%',
        }}
        opts={{ renderer: 'svg' }}
      />
      <ContainerYears>
        <Year isLight={isLight}>2021</Year>
        <ExtendedYearSecond isLight={isLight}>2022</ExtendedYearSecond>
        <ExtendedYearThird isLight={isLight}>2023</ExtendedYearThird>
      </ContainerYears>
    </Container>
  );
};

const Container = styled.div({
  position: 'relative',
  height: 247,
  width: 343,
  maxWidth: 343,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',

  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    height: 289,
    width: 690,
    maxWidth: 690,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    height: 387,
    width: 479,
    maxWidth: 479,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 504,
    maxWidth: 504,
  },
});

const ContainerYears = styled.div({
  display: 'flex',
  flexDirection: 'row',
  position: 'absolute',
  bottom: -19,
  [lightTheme.breakpoints.up('table_834')]: {
    bottom: -21,
  },
});

const Year = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '11px',
  lineHeight: '13px',
  alignItems: 'center',
  color: isLight ? '#139D8D' : '#2DC1B1',
  marginLeft: 21,
  marginRight: 17,
  [lightTheme.breakpoints.up('table_834')]: {
    marginLeft: 60,
    marginRight: 48,
    fontSize: 12,
    lineHeight: '15px',
  },
}));

const ExtendedYearSecond = styled(Year)({
  marginLeft: 0,
  marginRight: 153,
  [lightTheme.breakpoints.up('table_834')]: {
    marginLeft: 0,
    marginRight: 356,
  },
});

const ExtendedYearThird = styled(Year)({
  marginLeft: 0,
  marginRight: 0,
  [lightTheme.breakpoints.up('table_834')]: {
    marginLeft: 0,
    marginRight: 0,
  },
});
export default DelegateChart;
