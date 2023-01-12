import styled from '@emotion/styled';
import React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import CardInfoMember from '../card-info-member/card-info-member';
import { CircleAvatar } from '../circle-avatar/circle-avatar';
import { Title } from '../cu-table-column-expenditures/cu-table-column-expenditures';
import { CustomPopover } from '../custom-popover/custom-popover';
import { ColumnTeamMemberSkeleton } from './cu-table-column-team-member-skeleton';
import type { ContributorCommitmentDto } from '../../../core/models/dto/core-unit.dto';

interface CuTableColumnTeamMemberProps {
  members?: ContributorCommitmentDto[];
  fte?: number;
  isLoading?: boolean;
}

export const CuTableColumnTeamMember = ({ isLoading = false, ...props }: CuTableColumnTeamMemberProps) => {
  const { isLight } = useThemeContext();

  return !isLoading ? (
    <Container className="TeamMembers">
      <CustomPopover
        title={'Full-Time Equivalents'}
        id={'popover-fulltime-equivalents'}
        popupStyle={{
          padding: '16px',
          color: isLight ? '#231536' : '#D2D4EF',
        }}
      >
        <Data>
          <Title isLight={isLight}>FTEs</Title>
          <Value isLight={isLight} style={{ justifyContent: 'center' }}>
            {props.fte}
          </Value>
        </Data>
      </CustomPopover>
      <CirclesWrapper>
        {props.members?.map((member, i) => (
          <CustomPopover
            key={member.contributor[0].name + i}
            popupStyle={{
              padding: 0,
            }}
            title={<CardInfoMember contributorCommitment={member} />}
            id={member.contributor[0].name + i}
            leaveOnChildrenMouseOut
          >
            <CircleAvatar
              key={member.id}
              name={member.contributor[0].name}
              fontSize={'14px'}
              width={'36px'}
              height={'36px'}
              style={{
                boxSizing: 'border-box',
                marginLeft: i === 0 ? 0 : '-9px',
              }}
              image={member.contributor[0].facilitatorImage?.trim()}
            />
          </CustomPopover>
        ))}
      </CirclesWrapper>
    </Container>
  ) : (
    <ColumnTeamMemberSkeleton />
  );
};

const Container = styled.div({
  display: 'flex',
  flex: 1,
  alignItems: 'flex-end',
  fontWeight: 400,
  cursor: 'pointer',
  marginLeft: '7px',

  '@media (min-width: 1194px)': {
    marginLeft: '40px',
  },
});

const Data = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginRight: '10px',
});

const CirclesWrapper = styled.div({
  display: 'flex',
});

const Value = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '17px',
  color: isLight ? '#231536' : '#EDEFFF',
}));
