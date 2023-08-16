import styled from '@emotion/styled';
import { CustomLink } from '@ses/components/CustomLink/CustomLink';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const BudgetTransitionStatusSection: React.FC = () => {
  const { isLight } = useThemeContext();

  return (
    <Content>
      <Title isLight={isLight}>Budget Transition Status</Title>
      <Paragraph isLight={isLight}>
        Visit the website{' '}
        <ExternalLink isLight={isLight} href="https://endgame.makerdao.com">
          endgame.makerdao.com
        </ExternalLink>{' '}
        or join the discussion at{' '}
        <ExternalLink isLight={isLight} href="https://forum.makerdao.com">
          forum.makerdao.com
        </ExternalLink>
      </Paragraph>
    </Content>
  );
};

export default BudgetTransitionStatusSection;

const Content = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  marginTop: 40,
});

const Title = styled.h3<WithIsLight>(({ isLight }) => ({
  margin: 0,
  fontSize: 16,
  fontWeight: 700,
  lineHeight: 'normal',
  color: isLight ? '#231536' : '#D2D4EF',

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 20,
    fontWeight: 600,
    letterSpacing: 0.4,
  },
}));

const Paragraph = styled.p<WithIsLight>(({ isLight }) => ({
  fontSize: 14,
  lineHeight: 'normal',
  color: isLight ? '#231536' : '#D2D4EF',
  margin: 0,

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 16,
    lineHeight: '22px',
  },
}));

const ExternalLink = styled(CustomLink)<WithIsLight>(() => ({
  fontSize: 14,
  fontWeight: 400,
  lineHeight: 'normal',
  letterSpacing: 'normal',
  whiteSpace: 'normal',
  paddingRight: 0,
  marginLeft: 0,

  '& svg': {
    width: 10,
    height: 10,
    // override inline style
    marginLeft: '7px!important',
  },

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 16,
    lineHeight: '22px',
  },
}));
