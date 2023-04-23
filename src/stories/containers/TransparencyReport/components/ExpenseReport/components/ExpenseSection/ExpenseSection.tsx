import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
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
    <ExpensesContainer>
      <Wrapper isLight={isLight}>
        <LevelContainer>
          {title && <SectionTitle hasExternalIcon={true}>{title}</SectionTitle>}

          <ChildrenContainer hasMargin={!!title}>{children}</ChildrenContainer>
        </LevelContainer>
      </Wrapper>
    </ExpensesContainer>
  );
};

export default ExpenseSection;

const ExpensesContainer = styled(Container)({
  paddingLeft: 0,
  paddingRight: 0,
});

const WrapperL1 = styled.div<WithIsLight>(({ isLight }) => ({
  padding: '16px 0',
  background: isLight ? '#F6F8F9' : '#121F27',
  boxShadow: isLight
    ? '0px 20px 40px -40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px -20px 40px -40px rgba(7, 22, 40, 0.4), 0px -1px 3px rgba(30, 23, 23, 0.25)',
  marginBottom: 24,

  [lightTheme.breakpoints.up('table_834')]: {
    marginBottom: 32,
  },
}));

const WrapperL2 = styled.div<WithIsLight>(({ isLight }) => ({
  padding: '16px 8px',
  background: isLight ? '#ECF1F3' : '#0C1318',
  marginTop: 16,
  borderRadius: 6,

  // custom style for the table header sections
  '.table-section': {
    lineHeight: '17px',
    background: isLight ? 'rgba(255, 255, 255, 0.4)' : 'rgba(30, 44, 55, 0.7)',
    padding: '8px 16px',
    borderRadius: 6,
    marginTop: 24,
    marginBottom: 8,
  },

  // custom style for the table transparency card on mobile view
  '.advance-table--transparency-card': {
    padding: '16px 16px 6px',
  },
}));

const ChildrenContainer = styled.div<{ hasMargin: boolean }>(({ hasMargin }) => ({
  marginTop: hasMargin ? 16 : 0,

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: hasMargin ? 24 : 0,
  },
}));
