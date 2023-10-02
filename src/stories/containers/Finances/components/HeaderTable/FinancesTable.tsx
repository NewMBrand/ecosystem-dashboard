/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { MockData } from '../../utils/mockData';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  className?: string;
  breakdownTable: MockData;
}

const FinancesTable: React.FC<Props> = ({ className, breakdownTable }) => {
  const { isLight } = useThemeContext();
  const tables = Object.keys(breakdownTable);

  return (
    <>
      {tables.map((_) => (
        <TableContainer isLight={isLight} className={className}>
          <TableBody>
            <TableRow isMain isLight={isLight}>
              <Headed>Atlas Immutable AA Budgets </Headed>
              <Cell>2208889</Cell>
              <Cell>2208889</Cell>
              <Cell>2208889</Cell>
              <Cell>2208889</Cell>
              <Cell>2208889</Cell>
            </TableRow>
            <TableRow isLight={isLight}>
              <Headed>Aligned Voter Committees</Headed>
              <Cell>245432</Cell>
              <Cell>245432</Cell>
              <Cell>245432</Cell>
              <Cell>245432</Cell>
              <Cell>2208889</Cell>
            </TableRow>
            <TableRow isLight={isLight}>
              <Headed>Aligned Delegates</Headed>
              <Cell>245432</Cell>
              <Cell>245432</Cell>
              <Cell>245432</Cell>
              <Cell>245432</Cell>
              <Cell>2208889</Cell>
            </TableRow>
            <TableRow isLight={isLight}>
              <Headed>SubDAOs</Headed>
              <Cell>245432</Cell>
              <Cell>245432</Cell>
              <Cell>245432</Cell>
              <Cell>245432</Cell>
              <Cell>2208889</Cell>
            </TableRow>
          </TableBody>
        </TableContainer>
      ))}
    </>
  );
};

export default FinancesTable;

const TableContainer = styled.table<WithIsLight>(({ isLight }) => ({
  borderCollapse: 'collapse',
  boxShadow: isLight ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)' : 'red',
  borderRadius: 6,
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  tableLayout: 'fixed',
  width: '100%',
}));

const Cell = styled.td({
  borderRight: '1px solid rgb(190,190,190)',
  padding: '16px 8px',
  textAlign: 'center',
  fontSize: 12,
});

const Headed = styled.th({
  borderRight: '1px solid rgb(190,190,190)',
  fontSize: 14,
  color: '#231536',
  width: 145,
  textAlign: 'center',
  verticalAlign: 'center',
  padding: '16px 8px',
  [lightTheme.breakpoints.up('desktop_1024')]: {
    width: 150,
  },
});

const TableRow = styled.tr<WithIsLight & { isMain?: boolean }>(({ isMain = false, isLight }) => ({
  '& th': {
    borderTopLeftRadius: isMain ? 6 : 'none',
    borderBottomLeftRadius: isMain ? 6 : 'none',
    fontWeight: isMain ? 700 : 400,
    textAlign: 'left',
  },
  '& td:last-of-type': {
    backgroundColor: isLight ? (isMain ? 'rgba(159, 175, 185, 0.17)' : 'inherit') : 'red',
    fontWeight: isMain ? 600 : 400,
    borderRight: 'none',
    borderTopRightRadius: isMain ? 6 : 'none',
    borderBottomRightRadius: isMain ? 6 : 'none',
  },
  '& td': {
    fontWeight: isMain ? 600 : 400,
  },
}));

const TableBody = styled.tbody({
  '& tr:nth-of-type(odd):not(:first-child)': {
    backgroundColor: '#F5F5F5',
  },
  '& tr:first-of-type': {
    backgroundColor: '#ECF1F3',
  },
});
