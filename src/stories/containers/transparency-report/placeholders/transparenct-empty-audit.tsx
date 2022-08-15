import styled from '@emotion/styled';
import React from 'react';
import { useThemeContext } from '../../../../core/context/ThemeContext';

export const TransparencyEmptyAudit = () => {
  const isLight = useThemeContext().themeMode === 'light';
  return <Wrapper>
    <Title>
      No Data Provided
    </Title>
    <Container isLight={isLight}>
      <Row>
        <CellBlock />
        <CellBlock />
      </Row>
      <Row>
        <CellBlock />
        <CellBlock />
      </Row>
    </Container>
  </Wrapper>;
};

const Wrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  height: '268px',
  marginTop: '32px',
  flex: 1,
});

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  border: isLight ? '5px dashed #D4D9E1' : '5px dashed #10191F',
  borderRadius: '20px',
  padding: '32px 24px',
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: isLight ? 'radial-gradient(white, rgba(255,255,255,0.9), rgba(255,255,255,0.9), rgba(255,255,255,0.4), rgba(255,255,255,0.1))' : 'radial-gradient(#0c151e 0% 30% ,#0000 81% 100% )',
    backgroundRepeat: 'no-repeat',
  },
}));

const CellBlock = styled.div({
  flex: 1,
  height: '82px',
  background: 'rgba(45, 193, 177, 0.2)',
  borderRadius: '6px',
});

const Row = styled.div({
  display: 'flex',
  flex: 1,
  gap: '80px',
});

const Title = styled.div({
  fontFamily: 'FT Base',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '32px',
  lineHeight: '38px',
  textAlign: 'center',
  letterSpacing: '0.4px',
  color: '#9FAFB9',
  zIndex: 1,
});
