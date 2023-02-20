import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import Link from 'next/link';
import React from 'react';
import CardItemCoreUnitMobile from '../custom-table-mobile/card-mobile';
import type { CustomTableColumn } from '../custom-table-2';
import type { CoreUnitDto } from '@ses/core/models/dto/core-unit.dto';

interface Props {
  queryStrings?: string;
  isLoading?: boolean;
  columns: CustomTableColumn[];
  cu: CoreUnitDto;
}

export const ItemCoreUnit = ({ queryStrings, isLoading, columns, cu }: Props) => {
  const { isLight } = useThemeContext();
  return (
    <Link href={`/core-unit/${cu?.shortCode}/${queryStrings}`} passHref>
      <>
        <TableWrapper>
          <TableRow isLight={isLight} isLoading={isLoading} columns={columns}>
            {columns?.map((column) => (
              <TableCell key={column?.header}>{column.cellRender?.(cu)}</TableCell>
            ))}
          </TableRow>
        </TableWrapper>
        <ListWrapper>
          <CardItemCoreUnitMobile coreUnit={cu} />
        </ListWrapper>
      </>
    </Link>
  );
};

const TableWrapper = styled.div({
  display: 'none',
  '@media (min-width: 1194px)': {
    display: 'flex',
  },
});
const TableRow = styled.a<{ isLight: boolean; isLoading?: boolean; columns: CustomTableColumn[] }>(
  ({ isLight, isLoading, columns }) => ({
    background: isLight ? 'white' : '#10191F',
    display: 'grid',
    gridTemplateColumns: columns?.reduce((prev, curr) => `${prev} ${curr.responsiveWidth ?? curr.width}`, ''),
    gridTemplateRows: '120px',
    marginTop: '16px',
    cursor: 'pointer',
    borderColor: 'red',
    boxShadow: isLight
      ? '0px 0px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
      : '0px 20px 40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',
    ':hover': {
      background: !isLoading ? (isLight ? '#ECF1F3' : '#1E2C37') : isLight ? 'white' : '#10191F',
    },
    '@media (min-width: 1410px)': {
      gridTemplateColumns: columns?.reduce((prev, curr) => `${prev} ${curr.width}`, ''),
      gridTemplateRows: '98px',
      width: '100%',
    },
  })
);
export const TableCell = styled.div({
  color: '#231536',
  display: 'flex',
  alignItems: 'center',
});

const ListWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '16px',
  gap: 32,
  '@media (min-width: 1194px)': {
    display: 'none',
  },
});
export default ItemCoreUnit;
