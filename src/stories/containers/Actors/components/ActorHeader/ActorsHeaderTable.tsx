import styled from '@emotion/styled';
import ArrowDown from '@ses/components/svg/arrow-down';
import ArrowUp from '@ses/components/svg/arrow-up';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { SortEnum } from '@ses/core/enums/sortEnum';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
export interface ActorTableHeader {
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  styles?: React.CSSProperties;
  sort?: SortEnum;
  hidden?: boolean;
  sortReverse?: boolean;
}

export interface Props {
  columns: ActorTableHeader[];
  sortClick?: (index: number) => void;
}

const ActorsHeaderTable: React.FC<Props> = ({ columns, sortClick }) => {
  const { isLight } = useThemeContext();
  return (
    <TableHeader isLight={isLight}>
      <TableHeaderRow className="no-select">
        {columns
          .filter((column) => !column.hidden)
          .map((column, i) => (
            <TableHeaderTitle
              key={column.header}
              width={column.width}
              styles={column.styles}
              align={column.align ?? 'left'}
              onClick={() => column.sort !== SortEnum.Disabled && sortClick?.(i)}
            >
              {column.header}
              {column.sort !== SortEnum.Disabled && (
                <Arrows>
                  <ArrowUp
                    fill={
                      isLight
                        ? column.sort === SortEnum.Asc
                          ? '#231536'
                          : '#708390'
                        : column.sort === SortEnum.Asc
                        ? '#434358'
                        : '#708390'
                    }
                    style={{ margin: '4px 0' }}
                  />
                  <ArrowDown
                    fill={
                      isLight
                        ? column.sort === SortEnum.Desc
                          ? '#231536'
                          : '#708390'
                        : column.sort === SortEnum.Desc
                        ? '#434358'
                        : '#708390'
                    }
                  />
                </Arrows>
              )}
            </TableHeaderTitle>
          ))}
      </TableHeaderRow>
    </TableHeader>
  );
};

export default ActorsHeaderTable;
const TableHeader = styled.div<{ isLight: boolean; isGlobal?: boolean }>(({ isLight }) => ({
  display: 'none',
  position: 'relative',
  zIndex: 1,
  background: isLight ? '#F7F8F9' : '#25273D',
  color: isLight ? '#231536' : '#FFFFFF',
  padding: '16px 0 14px',
  borderRadius: '6px',
  lineHeight: '22px',
  boxShadow: isLight
    ? 'inset .25px -.25px .25px .25px rgba(190, 190, 190, 0.25), 0px 20px 40px rgba(190, 190, 190, .25), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px rgba(7, 22, 40, 0.4)',

  [lightTheme.breakpoints.up('desktop_1194')]: {
    display: 'block',
  },
}));

const TableHeaderRow = styled.div({
  display: 'flex',
});

const TableHeaderTitle = styled.div<{
  width?: string;
  styles?: React.CSSProperties;
  align: 'left' | 'center' | 'right';
}>(({ width, styles, align }) => ({
  display: 'flex',
  cursor: 'pointer',
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '22px',

  textAlign: align,
  ...(width && { width }),

  ...(styles || {}),
}));

const Arrows = styled.div({
  display: 'flex',
  flexDirection: 'column',
  margin: '0 8px',
  cursor: 'pointer',
  boxSizing: 'unset',
});
