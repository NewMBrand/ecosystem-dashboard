import React from 'react';
import styled from '@emotion/styled';
import { Title } from '../cu-table-column-expenditures/cu-table-column-expenditures';
import { CustomPopover } from '../custom-popover/custom-popover';
import { CircleAvatar } from '../circle-avatar/circle-avatar';
import { useThemeContext } from '../../../core/context/ThemeContext';
import CardInfoMember from '../card-info-member/card-info-member';
import { ContributorCommitmentDto } from '../../../core/models/dto/core-unit.dto';

interface CuTableColumnTeamMemberProps {
  members: ContributorCommitmentDto[];
  fte: number;
}

export const CuTableColumnTeamMember = ({
  ...props
}: CuTableColumnTeamMemberProps) => {
  const isLight = useThemeContext().themeMode === 'light';

  return (
    <Container className="TeamMembers">
      <CustomPopover
        title={'Full Time Equivalents'}
        id={'popover-fulltime-equivalents'}
        popupStyle={{ padding: '16px' }}
      >
        <Data>
          <Title isLight={isLight}>FTEs</Title>
          <Value isLight={isLight} style={{ justifyContent: 'center' }}>
            {props.fte}
          </Value>
        </Data>
      </CustomPopover>
      <CirclesWrapper>
        {props.members.map((member, i) => {
          return (
            <CustomPopover
              key={member.contributor[0].name + i}
              popupStyle={{
                padding: 0,
              }}
              title={<CardInfoMember contributorCommitment={member} />}
              id={member.contributor[0].name + i}
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
                  border: member.contributor[0]?.facilitatorImage
                    ? 'none'
                    : '2px solid #E7FCFA',
                }}
                imageStyle={{
                  marginLeft: i === 0 ? 0 : '-9px',
                  border: '2px solid #E7FCFA',
                }}
                image={member.contributor[0].facilitatorImage?.trim()}
              />
            </CustomPopover>
          );
        })}
      </CirclesWrapper>
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  fontWeight: 400,
  cursor: 'pointer',
  paddingLeft: '40px',
});

const Data = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginRight: '8px',
});

const CirclesWrapper = styled.div({
  display: 'flex',
});

const Value = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'SF Pro Display, sans-serif',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '18px',
  color: isLight ? '#231536' : '#EDEFFF',
}));
