import React from 'react';
import { CustomChartItemModel } from '../../../core/models/custom-chart-item.model';
import _ from 'lodash';

interface CustomBarChartProps {
  items?: Array<CustomChartItemModel>,
  maxValues?: number[],
}

const COLOR_GREEN = '#1AAB9B';
const COLOR_RED = '#CB3A0D';
const COLOR_YELLOW = '#FDC134';
const COLOR_GRAY = '#D8E0E3';

export const CustomBarChart = (props: CustomBarChartProps) => {
  if (!props.items) return <span/>;

  const padding = 8;
  const maxItemHeight = 30;

  const calculateHeight = (value: number): number => {
    if (!value) return 0;

    const highestCap = _.max(props.maxValues) ?? 0;

    if (highestCap === 0) return 0;
    return value * maxItemHeight / highestCap;
  };

  const isValueValid = (value: number): boolean => {
    return value > 0 && !!_.max(props.maxValues);
  };

  const getColor = (value: number, pos: number): string => {
    if (!props.maxValues) return COLOR_RED;
    const percent = value * 100 / props.maxValues[pos];
    let color = COLOR_RED;

    if (percent > 50 && percent <= 75) {
      color = COLOR_YELLOW;
    }

    if (percent > 75 && percent <= 90) {
      color = COLOR_GREEN;
    }

    if (percent > 90 && percent <= 100) {
      color = COLOR_YELLOW;
    }

    return color;
  };

  return <svg width={60} height={50} viewBox={'0 0 60 50'} style={{ marginRight: '8px' }}>
    <g transform={'scale(1, -1) translate(0, -50)'}>
      {props.items.map((item: CustomChartItemModel, i: number) =>
        <rect
          key={`item-${i}`}
          x={(i * 20) + padding + 2.5}
          y="5"
          width="12"
          rx="1"
          height={isValueValid(item.value) ? calculateHeight(item.value) : 16}
          fill={isValueValid(item.value) ? getColor(item.value, i) : COLOR_GRAY}>
          <animate
            attributeName="height"
            from="0"
            to={calculateHeight(item.value)}
            values={`0; ${calculateHeight(item.value) + 5}; ${calculateHeight(item.value) - 3}; ${calculateHeight(item.value)}`}
            keyTimes="0; .7; .85; 1"
            dur="0.3s"
            fill="normal"
            begin={`${i * 0.02}s`}
          />
        </rect>
      )}
      {props.maxValues?.map((cap: number, i: number) => {
        if (cap === 0) return <line key={`cap-${i}`}/>;
        return <line
            key={`cap-${i}`}
            strokeDasharray="4,3"
            x1={(i * 20) + padding}
            x2={(i * 20) + padding + 17}
            y1={calculateHeight(cap) + 5}
            y2={calculateHeight(cap) + 5}
            fill="#447AFB"
            strokeWidth="1px"
            stroke="#447AFB"
          >
            <animate
              attributeName="opacity"
              from="0"
              to="1"
              dur="0.4s"
            />
          </line>;
      }
      )}
    </g>
  </svg>;
};
