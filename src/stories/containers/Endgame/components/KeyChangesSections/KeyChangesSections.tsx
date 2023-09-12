import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import KeyChangeSection from '../KeyChangeSection/KeyChangeSection';
import KeyChangesBudgetTransitionStatusSection from '../KeyChangesBudgetTransitionStatusSection/KeyChangesBudgetTransitionStatusSection';
import GovernanceSection from './Sections/GovernanceSection';
import OperationsSection from './Sections/OperationsSection';
import TokenUpgradesSection from './Sections/TokenUpgradesSection';
import { KeyChangesSectionsEnum } from './SectionsEnum';

const KeyChangesSections: React.FC = () => {
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const [activeSections, setActiveSections] = React.useState<Set<KeyChangesSectionsEnum>>(
    new Set([KeyChangesSectionsEnum.GOVERNANCE])
  );

  const handleExpand = (section: KeyChangesSectionsEnum) => () => {
    if (isMobile) {
      // only one can be expanded at the time
      setActiveSections(new Set(activeSections.has(section) ? [] : [section]));
      return;
    }
    const newActiveSections = new Set(activeSections);
    if (newActiveSections.has(section)) {
      newActiveSections.delete(section);
    } else {
      newActiveSections.add(section);
    }
    setActiveSections(newActiveSections);
  };

  return (
    <KeyChangesSectionsContainer>
      <KeyChangeSection
        title="Governance"
        expanded={activeSections.has(KeyChangesSectionsEnum.GOVERNANCE)}
        onExpand={handleExpand(KeyChangesSectionsEnum.GOVERNANCE)}
      >
        <SectionContainer>
          <GovernanceSection />
        </SectionContainer>
      </KeyChangeSection>

      <KeyChangeSection
        title="Operations"
        expanded={activeSections.has(KeyChangesSectionsEnum.OPERATIONS)}
        onExpand={handleExpand(KeyChangesSectionsEnum.OPERATIONS)}
      >
        <SectionContainer>
          <OperationsSection />
        </SectionContainer>
      </KeyChangeSection>

      <KeyChangeSection
        title="Token upgrades"
        expanded={activeSections.has(KeyChangesSectionsEnum.TOKEN_UPGRADES)}
        onExpand={handleExpand(KeyChangesSectionsEnum.TOKEN_UPGRADES)}
      >
        <SectionContainer>
          <TokenUpgradesSection />
        </SectionContainer>
      </KeyChangeSection>

      <KeyChangesBudgetTransitionStatusSection />
    </KeyChangesSectionsContainer>
  );
};

export default KeyChangesSections;

const KeyChangesSectionsContainer = styled.section({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
});

export const SectionContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    flexDirection: 'row',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    gap: 128,
  },
});
