import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface ExpenseSectionProps extends React.PropsWithChildren {
  title?: string;
  level?: 1 | 2;
}

const ExpenseSection: React.FC<ExpenseSectionProps> = ({ children, level = 1, title }) => {
  const { isLight } = useThemeContext();
  const Wrapper = level === 1 ? WrapperL1 : WrapperL2;
  const LevelContainer = level === 1 ? Container : React.Fragment;

  return (
    <Wrapper isLight={isLight}>
      <LevelContainer>
        {title && <SectionTitle hasExternalIcon={true}>{title}</SectionTitle>}

        <ChildrenContainer hasMargin={!!title}>{children}</ChildrenContainer>
      </LevelContainer>
    </Wrapper>
  );
};

export default ExpenseSection;

const WrapperL1 = styled.div<WithIsLight>(({ isLight }) => ({
  padding: '16px 0 32px',
  background: isLight ? '#F6F8F9' : '#121F27',
  boxShadow: isLight
    ? '0px 20px 40px -40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px -20px 40px -40px rgba(7, 22, 40, 0.4), 0px -1px 3px rgba(30, 23, 23, 0.25)',
  marginTop: 32,
}));

const WrapperL2 = styled.div<WithIsLight>(({ isLight }) => ({
  padding: '16px 32px 32px',
  background: isLight ? '#ECF1F3' : '#0C1318',
  marginTop: 32,
  borderRadius: 6,
}));

const ChildrenContainer = styled.div<{ hasMargin: boolean }>(({ hasMargin }) => ({
  marginTop: hasMargin ? 24 : 0,
}));
