import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { calculateValuesByBreakpoint } from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';

import lightTheme from '@ses/styles/theme/light';
import ReactECharts from 'echarts-for-react';
import React from 'react';
import type { DoughnutSeries } from '@ses/core/models/interfaces/doughnutSeries';

interface Props {
  doughnutSeriesData: DoughnutSeries[];
}

const DoughnutChartFinances: React.FC<Props> = ({ doughnutSeriesData }) => {
  const { isLight } = useThemeContext();
  const isTable = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isSmallDesk = useMediaQuery(lightTheme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const normalSizeDesk = useMediaQuery(lightTheme.breakpoints.between('desktop_1280', 'desktop_1440'));

  const {
    center,
    paddingLegend,
    paddingRichTextDai,
    paddingRichTextName,
    paddingRichTextPercent,
    paddingRichTextValue,
    radius,
  } = calculateValuesByBreakpoint(isTable, isSmallDesk, normalSizeDesk);

  const options = {
    color: doughnutSeriesData.map((data) => data.color),
    tooltip: {
      show: true,
      trigger: 'item',
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        width: 40,
      },
      padding: 0,
      borderWidth: 2,
      formatter: function (params: DoughnutSeries) {
        const index = doughnutSeriesData.findIndex((data) => data.name === params.name);
        const itemRender = doughnutSeriesData[index];

        const customTooltip = `
        <div style="background-color:${isLight ? '#fff' : '#1E2C37'};overflow:'hidden';padding:16px;color: ${
          isLight ? '#231536' : '#D2D4EF'
        };border-radius: 2px;">
          <div style="margin-bottom:4px;padding:0px">${itemRender.percent} %</div>
          <div style="margin-bottom:16px">${itemRender.name}</div>
          <div style="display:flex;flex-direction:row;justify-content:space-between;">
              <div style="display:flex;flex-direction:column">
                <div style="margin-bottom:4;">${itemRender.actuals}</div>
                <div style="font-weight:bold">Actuals</div>
             </div>
              <div style="display:flex;flex-direction:column">
                <div style="margin-bottom:4;">${itemRender.budgetCap}</div>
                <div style="font-weight:bold">Budget Cap</div>
             </div>
          </div>
        </div>
        `;

        return customTooltip;
      },
    },

    series: [
      {
        name: 'Overview Card',
        type: 'pie',
        radius,
        center,
        label: {
          normal: {
            show: false,
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
        data: doughnutSeriesData,
      },
    ],
    legend: {
      orient: 'vertical',
      align: 'left',
      padding: paddingLegend,
      left: 'right',

      data: doughnutSeriesData.map((data) => data.name),
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,

      itemGap: 16,
      formatter: function (value: string) {
        const index = doughnutSeriesData.findIndex((data) => data.name === value);
        if (index !== -1) {
          const data = doughnutSeriesData[index];
          return `{name|${data.name}}\n{value|${data.value.toLocaleString('es-US') || '0'}}{dai|DAI}{percent|(${
            data.percent
          }%)}`;
        }
        return '';
      },

      textStyle: {
        fontFamily: 'Inter, sans-serif',
        fontStyle: 'normal',
        fontWeight: 400,
        color: isLight ? '#43435' : '#EDEFFF',
        rich: {
          name: {
            fontSize: 12,
            fontFamily: 'Inter, sans-serif',
            padding: paddingRichTextName,

            color: isLight ? '#43435' : '#EDEFFF',
          },
          value: {
            fontSize: 14,
            width: 'fit-content',
            fontFamily: 'Inter, sans-serif',
            color: isLight ? '#9FAFB9' : '#546978',
            padding: paddingRichTextValue,
          },
          dai: {
            fontSize: 14,
            width: 'fit-content',
            fontFamily: 'Inter, sans-serif',
            color: isLight ? '#9FAFB9' : '#546978',
            padding: paddingRichTextDai,
          },
          percent: {
            fontSize: 14,
            fontFamily: 'Inter, sans-serif',
            color: isLight ? '#9FAFB9' : '#546978',
            padding: paddingRichTextPercent,
          },
        },
      },
      label: {
        show: false,
        position: 'top',
      },
    },
  };
  return (
    <Container>
      <ReactECharts
        className="chart-container"
        option={options}
        style={{
          height: '100%',
          width: '100%',
        }}
        opts={{ renderer: 'svg' }}
      />
    </Container>
  );
};
export default DoughnutChartFinances;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',

  [lightTheme.breakpoints.up('tablet_768')]: {
    width: 422,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    width: 420,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: '100%',
    marginTop: 'revert',
    height: 'revert',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: '100%',
    height: 196,
  },
});
