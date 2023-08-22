import styled from '@emotion/styled';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { SelectChevronDown } from '@ses/components/svg/select-chevron-down';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  items: string[];
  handleChange: (event: SelectChangeEvent<unknown>) => void;
  onOpen?: () => void;
  onClose?: () => void;
  selectedValue: string;
  isOpen: boolean;
  className?: string;
  widthPaper?: number;
  height?: number;
  width?: number;
  borderRadiusPopover?: string;
}

const SelectDropdown: React.FC<Props> = ({
  items,
  handleChange,
  selectedValue,
  isOpen,
  onClose,
  onOpen,
  className,
  height = 34,
  width = 92,
  widthPaper = 120,
  borderRadiusPopover = '6px',
}: Props) => {
  const { isLight } = useThemeContext();
  return (
    <ContainerSelect className={className}>
      <SelectStyled
        width={width}
        height={height}
        isLight={isLight}
        MenuProps={{
          disableScrollLock: true,
          PaperProps: {
            sx: {
              bgcolor: isLight ? 'white' : '#000A13',
              '&.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded': {
                width: widthPaper,
                borderRadius: borderRadiusPopover,
              },
            },
          },
        }}
        open={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        variant="outlined"
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedValue}
        onChange={handleChange}
        IconComponent={() => (
          <ContainerIcon>
            <StyledSelectChevronDown
              isOpen={isOpen}
              onClick={isOpen ? onClose : onOpen}
              fill={isLight ? '#231436' : '#E2D8EE'}
            />
          </ContainerIcon>
        )}
      >
        {items.map((items) => (
          <MenuItemStyled value={items} key={items} disableTouchRipple={true} isLight={isLight}>
            {items}
          </MenuItemStyled>
        ))}
      </SelectStyled>
    </ContainerSelect>
  );
};

export default SelectDropdown;

const ContainerSelect = styled.div({
  '.MuiSelect-outlined': {
    paddingLeft: 16,
  },
  '&.MuiList-root': {
    color: 'red',
    backgroundColor: 'red',
  },
  '&.MuiMenu-paper': {
    backgroundColor: 'red',
  },
  '.Mui-selected': {
    backgroundColor: 'red',
  },
});
const SelectStyled = styled(Select)<WithIsLight & { width: number; height: number }>(({ isLight, height, width }) => ({
  padding: 0,
  borderRadius: 22,
  height,
  width,
  color: isLight ? '#231536' : '#E2D8EE',
  paddingRight: 0,
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '18px',
  marginTop: 1,

  '&.MuiOutlinedInput-root': {
    '& fieldset': {
      border: `1px solid ${isLight ? '#D4D9E1' : '#343442'}`,
    },
    '&:hover fieldset': {
      border: `1px solid ${isLight ? '#231536' : '#787A9B'}`,
    },
    '&.Mui-focused fieldset': {
      border: `1px solid ${isLight ? '#231536' : '#787A9B'}`,
    },
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    height: 48,
  },
}));

const MenuItemStyled = styled(MenuItem)<WithIsLight>(({ isLight }) => ({
  marginRight: 6,
  marginLeft: 6,
  padding: '4px 12px',
  backgroundColor: isLight ? 'white' : '#000A13',
  color: isLight ? '#231536' : '#D2D4EF',
  ':hover': {
    backgroundColor: isLight ? '#EDEFFF' : 'red',
    borderRadius: 6,
  },

  '&.MuiMenuItem-root.Mui-selected': {
    backgroundColor: isLight ? 'white' : '#000A13',
    ':hover': {
      backgroundColor: isLight ? '#EDEFFF' : 'red',
      borderRadius: 6,
    },
  },
}));

const ContainerIcon = styled.div({
  position: 'absolute',
  right: 16,
  marginTop: 6,
  marginRight: -2,
});

const StyledSelectChevronDown = styled(SelectChevronDown)<{ isOpen: boolean }>(({ isOpen }) => ({
  paddingRight: 4,
  transform: isOpen ? 'scaleY(-1)' : 'scaleY(1)',
  width: 16,
  height: 16,
}));