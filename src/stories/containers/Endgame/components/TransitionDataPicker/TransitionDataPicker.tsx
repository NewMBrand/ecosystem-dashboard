import styled from '@emotion/styled';
import { CustomButton } from '@ses/components/CustomButton/CustomButton';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { TransitionStatusDataShown } from '../../types';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

export interface TransitionDataPickerProps {
  selected: TransitionStatusDataShown;
  handleChange: (selected: TransitionStatusDataShown) => void;
}

const TransitionDataPicker: React.FC<TransitionDataPickerProps> = ({ selected, handleChange }) => {
  const { isLight } = useThemeContext();

  return (
    <Content>
      <DataButton
        allowsHover={false}
        isLight={isLight}
        onClick={() => handleChange('actuals')}
        selected={selected === 'actuals'}
        label={'Actuals'}
      />
      <DataButton
        allowsHover={false}
        isLight={isLight}
        onClick={() => handleChange('budget-cap')}
        selected={selected === 'budget-cap'}
        label={'Budget Cap'}
      />
    </Content>
  );
};

export default TransitionDataPicker;

const Content = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 16,
});

const DataButton = styled(CustomButton)<WithIsLight & { selected?: boolean }>(({ isLight, selected }) => ({
  background: isLight ? (selected ? '#1AAB9B' : 'transparent') : selected ? '#098C7D' : 'transparent',
  borderColor: isLight ? (selected ? '#1AAB9B' : '#D4D9E1') : selected ? '#098C7D' : '#708390',
  borderRadius: '22px',
  fontFamily: 'Inter, sans serif',
  fontStyle: 'normal',
  padding: '7px 23px',

  '& > div': {
    color: isLight ? (selected ? '#FFFFFF' : '#9FAFB9') : selected ? '#FFFFFF' : '#ADAFD4',
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  ...(!selected
    ? {
        '&:hover': {
          background: isLight ? '#F6F8F9' : '#10191F',
          border: `1px solid ${isLight ? '#ECF1F3' : '#1E2C37'}}`,

          '&:hover > div': {
            color: `${isLight ? '#787A9B' : '#D2D4EF'}!important`,
          },
        },
      }
    : {}),
}));
