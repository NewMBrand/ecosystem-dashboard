import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React from 'react';
import { LinkInterface } from './footer';

interface Props {
  title: string
  children: LinkInterface[]
  style?: React.CSSProperties
}

const DescriptionFooter = ({ title, children, style = {} }: Props) => {
  return (
    <div style={style}>
      <StyleTitle>{title}</StyleTitle>
      {children && children.map((item) => {
        return <StyleChildren href={item.url} target="_blank" key={item.title}>{item.title}</StyleChildren>;
      })}
    </div>
  );
};

const StyleTitle = styled(Typography)({
  color: '#231536',
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '15px',
  lineHeight: '18px',
  marginBottom: '16px',
  letterSpacing: '0.4px'
});

const StyleChildren = styled.a({
  display: 'block',
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19.02px',
  color: '#231536',
  marginBottom: '16px',
  textDecoration: 'none',
});

export default DescriptionFooter;
