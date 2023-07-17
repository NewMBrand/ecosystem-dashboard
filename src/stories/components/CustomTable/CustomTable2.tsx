import styled from '@emotion/styled';
import React from 'react';
import { HeadCustomTable } from './HeadCustomTable/HeadCustomTable';
import { TablePlaceholder } from './TablePlaceholder';
import ListCoreUnit from './list-core-unit/list-core-unit';
import type { SortEnum } from '../../../core/enums/sortEnum';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';
import type { CSSProperties } from 'react';

export interface CustomTableColumn {
  justifyContent?: string;
  header?: string;
  cellRender?: (data: CoreUnit) => JSX.Element;
  headerAlign?: 'flex-start' | 'center' | 'flex-end';
  isCardHeader?: boolean;
  isCardFooter?: boolean;
  width?: string;
  responsiveWidth?: string;
  hidden?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (param: any) => void;
  style?: CSSProperties;
  sortReverse?: boolean;
  hasSort?: boolean;
}

export interface CustomTableRow {
  value: CoreUnit;
  key: string;
}

interface Props {
  columns: CustomTableColumn[];
  items?: CustomTableRow[];
  loading?: boolean;
  sortState?: SortEnum[];
  handleSort?: (index: number) => void;
  headersSort?: SortEnum[];
  queryStrings?: string;
}

export const CustomTable2 = (props: Props) => {
  if (!props.loading && props.items?.length === 0) return <TablePlaceholder />;

  const rows = props.loading ? new Array(10).fill(null) : props.items;
  return (
    <TableContainer>
      <Table>
        <TableWrapper>
          <HeadCustomTable {...props} />
        </TableWrapper>
        <ListCoreUnit columns={props.columns} isLoading={props.loading} queryStrings={props.queryStrings} rows={rows} />
      </Table>
    </TableContainer>
  );
};

const TableContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  width: '100%',
  '& *': {
    boxSizing: 'border-box',
  },
});

const Table = styled.div({
  borderCollapse: 'separate',
  tableLayout: 'fixed',
  flex: '1',
});

export const TableCell = styled.div({
  color: '#231536',
  display: 'flex',
  alignItems: 'center',
});

const TableWrapper = styled.div({
  display: 'none',
  '@media (min-width: 1194px)': {
    display: 'flex',
  },
});
