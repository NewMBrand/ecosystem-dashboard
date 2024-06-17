import { Collapse, styled, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { TeamRole } from '@/core/enums/teamRole';
import type { Team } from '@/core/models/interfaces/team';
import type { TeamCategory, TeamStatus } from '@/core/models/interfaces/types';
import { ResourceType } from '@/core/models/interfaces/types';
import SocialMediaLinksButton from '../ButtonLink/SocialMediaLinksButton';
import CategoryChip from '../CategoryChip/CategoryChip';
import CircleAvatar from '../CircleAvatar/CircleAvatar';
import Container from '../Container/Container';
import RoleChip from '../RoleChip/RoleChip';
import ScopeChip from '../ScopeChip/ScopeChip';
import { StatusChip } from '../StatusChip/StatusChip';
import CoreUnitSubmissionLink from './CoreUnitSubmissionLink';
import type { Theme } from '@mui/material';

interface TeamHeaderProps {
  team: Team;
}

const TeamHeader: React.FC<TeamHeaderProps> = ({ team }) => {
  const router = useRouter();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const [spacerHeight, setSpacerHeight] = useState<number>(165);
  const headerRef = useRef<HTMLDivElement>(null);
  const chips =
    team.type === ResourceType.EcosystemActor ? (
      <ScopeList>
        {team.scopes?.map((item, index) => (
          <ScopeChip scope={item} key={index} codeOnly={isMobile} />
        ))}
      </ScopeList>
    ) : (
      <CategoryList>
        {team.category?.map((category) => (
          <CategoryChip category={category as TeamCategory} key={category} />
        ))}
      </CategoryList>
    );

  // show/hide header on scroll
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY ?? 0;

    setShowHeader(scrollPosition < 180);
  }, []);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // set spacer height
  const updateHeight = useCallback(() => {
    if (headerRef?.current) {
      const { bottom, top } = headerRef.current.getBoundingClientRect();
      const elementHeight = bottom - top;
      setSpacerHeight((elementHeight || 165) + 40);
    }
  }, [headerRef]);
  useEffect(() => {
    window.addEventListener('resize', updateHeight);
    updateHeight();

    return () => {
      window.addEventListener('resize', updateHeight);
    };
    // headerRef?.current is not recommended as a dependency, but this way we ensure
    // that the height is updated when the ref is properly initialized
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerRef?.current, updateHeight, router.query]);

  return (
    <SpacerAssigner height={spacerHeight}>
      <MainContainer ref={headerRef}>
        <Collapse in={showHeader} timeout={300}>
          <HeaderWrapper>
            <Container>
              <Content>
                <TeamBasicInfo>
                  <Avatar name={team.name} image={team.image} />
                  <InfoContent>
                    <TeamName>
                      <Code>{team.shortCode}</Code> {team.name}
                    </TeamName>
                    <ChipsContainer>
                      {team.type === ResourceType.EcosystemActor ? (
                        <StatusChip status={team.status as TeamStatus} />
                      ) : (
                        <StatusChipForCoreUnit status={team.status as TeamStatus} />
                      )}

                      {team.type === ResourceType.EcosystemActor ? (
                        <RoleChip status={(team.category?.[0] ?? '') as TeamRole} />
                      ) : (
                        <CoreUnitSubmissionLink team={team} />
                      )}
                    </ChipsContainer>
                    {chips}
                  </InfoContent>
                </TeamBasicInfo>

                <LinksContainer>
                  <SocialMediaLinksButton socialMedia={team.socialMediaChannels?.[0]} />
                </LinksContainer>
              </Content>
              <Description>{team.sentenceDescription}</Description>
            </Container>
          </HeaderWrapper>
        </Collapse>
      </MainContainer>
    </SpacerAssigner>
  );
};

export default TeamHeader;

const SpacerAssigner = styled('div')<{ height: number }>(({ height }) => ({
  position: 'relative',
  width: '100%',
  height,
}));

const MainContainer = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 105,
  zIndex: 3,
  width: '100%',
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : 'rgba(25, 29, 36, 1)',
}));

const HeaderWrapper = styled('div')(({ theme }) => ({
  paddingTop: 16,
  paddingBottom: 8,
  borderBottom: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[900]
  }`,
}));

const Content = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'nowrap',
  gap: 8,
}));

const TeamBasicInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 8,
  width: '100%',
  maxWidth: 'calc(100% - 40px)',

  [theme.breakpoints.up('tablet_768')]: {
    gap: 16,
  },
}));

const Avatar = styled(CircleAvatar)(({ theme }) => ({
  width: 48,
  height: 48,
  minWidth: 48,
  minHeight: 48,

  [theme.breakpoints.up('tablet_768')]: {
    width: 56,
    height: 56,
    minWidth: 56,
    minHeight: 56,
  },
}));

const InfoContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: 'calc(100% - 48px)',

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
}));

const ChipsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 4,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 8,
  },
}));

const StatusChipForCoreUnit = styled(StatusChip)(({ theme }) => ({
  alignSelf: 'baseline',
  padding: '3px 4px 3px 4px',

  [theme.breakpoints.up('tablet_768')]: {
    padding: '1px 8px 1px 8px',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    padding: '1px 16px 1px 16px',
  },
}));

const TeamName = styled('div')(({ theme }) => ({
  fontSize: 16,
  lineHeight: '24px',
  fontWeight: 600,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  [theme.breakpoints.up('tablet_768')]: {
    marginRight: 16,
    fontSize: 20,
    fontWeight: 700,
  },
}));

const Code = styled('span')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[400] : theme.palette.colors.gray[600],
}));

const ScopeList = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
  marginTop: 8,
  width: '100%',
}));

const CategoryList = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
  marginTop: 8,
  marginLeft: -56,
  width: 'calc(100% + 96px)',

  [theme.breakpoints.up('tablet_768')]: {
    width: '100%',
    marginLeft: 0,
  },
}));

const LinksContainer = styled('div')(({ theme }) => ({
  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'flex',
    alignSelf: 'flex-end',
  },
}));

const Description = styled('div')(({ theme }) => ({
  marginTop: 8,
  fontSize: 12,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 16,
    fontSize: 14,
    paddingLeft: 72,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
  },
}));
