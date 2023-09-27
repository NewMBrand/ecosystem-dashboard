import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import { AccountsSnapshot, ThemeProvider } from 'dspot-powerhouse-components';
import React from 'react';
import type { Snapshots } from '@ses/core/models/dto/snapshotAccountDTO';
import type { ResourceType } from '@ses/core/models/interfaces/types';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface TemporaryContainerProps {
  snapshot: Snapshots;
  snapshotOwner: string;
  resourceType: ResourceType;
}

const TemporaryContainer: React.FC<TemporaryContainerProps> = ({ snapshot, snapshotOwner, resourceType }) => {
  const { isLight } = useThemeContext();

  return (
    <PageContainer hasImageBackground>
      <Container>
        <Title isLight={isLight}>Account Snapshot</Title>

        <ThemeProvider isLight={isLight}>
          <AccountsSnapshot snapshot={snapshot} snapshotOwner={snapshotOwner} resourceType={resourceType} />
        </ThemeProvider>
      </Container>
    </PageContainer>
  );
};

export default TemporaryContainer;

const Title = styled.h1<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter,san-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '20px',
  lineHeight: '24px',
  letterSpacing: '0.4px',
  color: isLight ? '#231536' : '#D2D4EF',
  marginTop: 32,
  marginBottom: 32,

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 24,
    lineHeight: '29px',
    letterSpacing: '0.4px',
    marginTop: 34,
    marginBottom: 32,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginTop: 32,
  },
}));
