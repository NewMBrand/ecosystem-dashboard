import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { DeliverableStatus } from '@ses/core/models/interfaces/projects';
import lightTheme from '@ses/styles/theme/light';
import React, { useState } from 'react';
import DeliverablePercentageBar from '../DeliverablePercentageBar/DeliverablePercentageBar';
import DeliverableStatusChip from '../DeliverableStatusChip/DeliverableStatusChip';
import DeliverableStoryPointsBar from '../DeliverableStoryPointsBar/DeliverableStoryPointsBar';
import KeyResults from '../KeyResults/KeyResults';
import type { DeliverableViewMode } from '../ProjectCard/ProjectCard';
import type { Deliverable } from '@ses/core/models/interfaces/projects';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface DeliverableCardProps {
  deliverable: Deliverable;
  viewMode: DeliverableViewMode;
  isShownBelow: boolean;
  maxKeyResultsOnRow: number;
}

const DeliverableCard: React.FC<DeliverableCardProps> = ({
  deliverable,
  viewMode,
  isShownBelow,
  maxKeyResultsOnRow,
}) => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const [expanded, setExpanded] = useState<boolean>(false);
  const handleToggleExpand = () => setExpanded((prev) => !prev);

  return (
    <Card
      isLight={isLight}
      fixedHeight={!expanded && viewMode === 'compacted' && isShownBelow && !isMobile}
      maxKeyResultsOnRow={maxKeyResultsOnRow}
    >
      <HeaderContainer>
        <TitleContainer>
          <Title isLight={isLight}>{deliverable.title}</Title>
        </TitleContainer>
        <DeliverableOwnerContainer>
          <OwnerImage src={deliverable.owner.imgUrl} alt={deliverable.owner.name} />
        </DeliverableOwnerContainer>
      </HeaderContainer>
      <ProgressContainer>
        <DeliverableStatusChip status={deliverable.status} />
        {deliverable.status === DeliverableStatus.INPROGRESS &&
          deliverable.progress &&
          (deliverable.progress.__typename === 'Percentage' ? (
            <DeliverablePercentageBar percentage={deliverable.progress.value} />
          ) : (
            <DeliverableStoryPointsBar total={deliverable.progress.total} completed={deliverable.progress.completed} />
          ))}
      </ProgressContainer>

      {viewMode === 'detailed' && (
        <Description isLight={isLight}>
          Purely financial view of SPFs with generalized financial categories applicable across all budget categories.
        </Description>
      )}
      <KeyResults
        keyResults={deliverable.keyResults}
        viewMode={viewMode}
        isShownBelow={isShownBelow}
        expanded={expanded}
        handleToggleExpand={handleToggleExpand}
        maxKeyResultsOnRow={maxKeyResultsOnRow}
      />
    </Card>
  );
};

export default DeliverableCard;

const Card = styled.div<WithIsLight & { fixedHeight: boolean; maxKeyResultsOnRow: number }>(
  ({ isLight, fixedHeight, maxKeyResultsOnRow }) => {
    let height: string | number;

    if (fixedHeight) {
      height = maxKeyResultsOnRow < 4 ? 'auto' : 247;
    } else {
      height = 'auto';
    }

    return {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 7,
      borderRadius: 6,
      background: isLight ? '#fff' : '#1E2C37',
      boxShadow: isLight
        ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 5px 10px 0px rgba(219, 227, 237, 0.40)'
        : '10px 15px 20px 6px rgba(20, 0, 141, 0.10)',
      padding: 16,
      height: fixedHeight ? height : 'auto',
    };
  }
);

const HeaderContainer = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 24,
  alignSelf: 'stretch',
});

const TitleContainer = styled.div({
  maxWidth: 'calc(100% - 51px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 15,
  flex: '1 0 0',
});

const Title = styled.div<WithIsLight>(({ isLight }) => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  alignSelf: 'stretch',
  color: isLight ? '#25273D' : '#D2D4EF',
  fontSize: 16,
  fontWeight: 700,
  lineHeight: 'normal',
}));

const DeliverableOwnerContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
});

const OwnerImage = styled(Avatar)({
  width: 28,
  height: 28,
  borderRadius: 20,
  border: '2px solid #fff',
  boxShadow: '2px 4px 7px 0px rgba(26, 171, 155, 0.25)',
  fontSize: 14,
  fontFamily: 'Inter, sans-serif',
});

const ProgressContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  gap: 16,
});

const Description = styled.p<WithIsLight>(({ isLight }) => ({
  margin: 0,
  fontSize: 14,
  lineHeight: 'normal',
  color: isLight ? '#231536' : '#D2D4EF',

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    lineHeight: '22px',
  },
}));
