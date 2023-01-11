import React from 'react';
import type { CSSProperties } from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
  style?: CSSProperties;
}

export const LinkIcon = ({ fill = '#447AFB', height = 6, width = 6, style = {}, ...props }: Props) => (
  <svg
    style={style}
    width={width}
    height={height}
    viewBox="0 0 6 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0.731619 5.87448C0.564249 6.04184 0.292894 6.04184 0.125524 5.87448C-0.0418414 5.70712 -0.0418414 5.43575 0.125524 5.26839L4.53677 0.857144H1.71429C1.47759 0.857144 1.28571 0.665268 1.28571 0.428572C1.28571 0.191876 1.47759 0 1.71429 0H5.57113C5.57156 0 5.57229 0 5.57271 0C5.63036 0.000171429 5.6853 0.0117215 5.73549 0.0325201C5.78567 0.0532801 5.83269 0.0839787 5.87357 0.12462C5.87417 0.125225 5.87477 0.125829 5.87537 0.126437C5.95813 0.209675 5.99966 0.318433 6 0.427286C6 0.427715 6 0.428144 6 0.428572V4.28572C6 4.52242 5.80813 4.71429 5.57143 4.71429C5.33473 4.71429 5.14286 4.52242 5.14286 4.28572V1.46324L0.731619 5.87448Z"
      fill={fill}
    />
  </svg>
);
