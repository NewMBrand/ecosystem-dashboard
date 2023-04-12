import styled from '@emotion/styled';
import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import { siteRoutes } from '@ses/config/routes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { featureFlags } from '../../../../feature-flags/feature-flags';
import lightTheme from '../../../../styles/theme/light';
import { useAuthContext } from '../../../core/context/AuthContext';
import { useThemeContext } from '../../../core/context/ThemeContext';
import LoginButton from '../MenuNavigation/LoginButton/LoginButton';
import MenuTheme from '../MenuNavigation/MenuTheme/MenuTheme';
import MenuUserOptions from '../MenuNavigation/MenuUser/MenuUserOptions';
import { TopBarSelect } from '../TopBarSelect/TopBarSelect';
import Expenses from '../svg/expenses';
import Logo from '../svg/logo';

import EssentialWebsitesMenuTrigger from './EssentialsTriggers/EssentialWebsitesMenuTrigger';
import EssentialWebsitesModalTrigger from './EssentialsTriggers/EssentialWebsitesModalTrigger';
import menuItems from './menuItems';
import type { MenuType } from './menuItems';

const Header: React.FC = () => {
  const router = useRouter();

  const { themeMode, toggleTheme, isLight } = useThemeContext();
  const { clearCredentials, permissionManager } = useAuthContext();

  const handleOnClickLogOut = () => {
    clearCredentials?.();
    router.push(siteRoutes.login);
  };

  const handleGoHome = useCallback(() => {
    router.push(siteRoutes.home);
  }, [router]);

  const activeMenuItem = useMemo(() => {
    if (router.pathname.startsWith('/core-unit')) {
      return featureFlags[CURRENT_ENVIRONMENT].FEATURE_FINANCES_OVERVIEW ? menuItems[2] : menuItems[0];
    } else if (
      router.pathname.startsWith('/activity-feed') &&
      featureFlags[CURRENT_ENVIRONMENT].FEATURE_GLOBAL_ACTIVITIES
    ) {
      return featureFlags[CURRENT_ENVIRONMENT].FEATURE_FINANCES_OVERVIEW ? menuItems[3] : menuItems[0];
    } else if (router.pathname.startsWith('/recognized-delegates')) {
      return menuItems[1];
    } else {
      return menuItems[0];
    }
  }, [router.pathname]);

  return (
    <Container isLight={isLight}>
      <LeftPart>
        <ContainerLogoSelect isLight={isLight}>
          <LogoContainer>
            <Logo fill="#211634" fillDark="#1aab9b" onClick={handleGoHome} />
          </LogoContainer>
          <LogoLinksWrapper>
            <Expenses fill={themeMode === 'dark' ? '#6EDBD0' : '#211634'} />
            <EssentialWebsitesMenuTrigger />
          </LogoLinksWrapper>
        </ContainerLogoSelect>

        <Navigation>
          {menuItems.map((item: MenuType) => (
            <Link href={item.link} passHref key={item.title}>
              <ItemMenuStyle
                isLight={isLight}
                style={{ marginRight: item.marginRight }}
                href={item.link}
                active={activeMenuItem === item}
              >
                {item.title}
              </ItemMenuStyle>
            </Link>
          ))}
          <ItemMenuResponsive>
            <TopBarSelect selectedOption={activeMenuItem.title} />
          </ItemMenuResponsive>
          <RightElementsWrapper>
            {permissionManager.isAuthenticated() ? (
              <MenuUserOptions
                isAdmin={permissionManager.isAdmin()}
                onClickLogOut={handleOnClickLogOut}
                username={permissionManager.loggedUser?.username ?? ''}
                hrefAccountManager={siteRoutes.manageAccounts}
                hrefProfile={permissionManager.isAdmin() ? siteRoutes.adminProfile : siteRoutes.userProfile}
              />
            ) : (
              <LoginButton />
            )}
          </RightElementsWrapper>
        </Navigation>
      </LeftPart>
      <RightPart>
        <div>
          <MobileOnly>
            <EssentialWebsitesModalTrigger />
          </MobileOnly>
          <WrapperIcon>
            <MenuTheme themeMode={themeMode} toggleTheme={toggleTheme} />
          </WrapperIcon>
        </div>
      </RightPart>
    </Container>
  );
};

const Container = styled.header<{ isLight: boolean }>(({ isLight }) => ({
  position: 'fixed',
  display: 'flex',
  width: '100%',
  zIndex: 4,
  flexDirection: 'row',
  height: '64px',
  justifyContent: 'space-between',
  background: isLight ? '#FFFFFF' : ' linear-gradient(180deg, #000000 0%, #001A34 100%)',
}));

const LeftPart = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: '100%',
  width: '100%',
});

const ContainerLogoSelect = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
  width: 'fit-content',
  marginRight: '16px',
  alignItems: 'center',
  padding: '0 16px',
  background: isLight
    ? 'linear-gradient(125.61deg, rgba(182, 237, 231, 0.5) -69.93%, rgba(182, 237, 231, 0.05) 130.99%)'
    : 'linear-gradient(125.61deg, rgba(0, 68, 61, 0.5) -69.93%, rgba(27, 45, 43, 0.05) 130.99%)',
  backdropFilter: 'blur(30px)',

  [lightTheme.breakpoints.up('desktop_1194')]: {
    paddingRight: 32,
    marginRight: 32,
  },
}));

const LogoContainer = styled.div({
  marginTop: 8,
  cursor: 'pointer',
  '@media (min-width: 834px)': {
    marginRight: '32px',
  },
});

const Navigation = styled.div({
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
  '@media (min-width: 1194px)': {
    justifyContent: 'flex-start',
  },
});

const RightPart = styled.div({
  display: 'flex',
  alignItems: 'center',
  paddingRight: '16px',
  '@media (min-width: 835px)': {
    paddingRight: '26px',
  },
});

const MobileOnly = styled.div({
  display: 'block',

  [lightTheme.breakpoints.up('table_834')]: {
    display: 'none',
  },
});

const ItemMenuStyle = styled.a<{ active: boolean; marginRight?: string; isLight: boolean }>(
  ({ active, isLight, marginRight }) => ({
    display: 'none',
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '22px',
    transform: 'none',
    marginRight,
    color: isLight ? (active ? '#1AAB9B' : '#25273D') : active ? '#2DC1B1' : '#D2D4EF',
    letterSpacing: '0.4px',
    cursor: 'pointer',
    textDecoration: 'none',
    '&:hover': {
      color: '#1dc1ae',
    },
    '@media (min-width: 1194px)': {
      display: 'block',
    },
  })
);

const ItemMenuResponsive = styled.div({
  '@media (min-width: 1194px)': {
    display: 'none',
  },
});

const RightElementsWrapper = styled.div({
  display: 'flex',
  '@media (min-width: 834px)': {
    position: 'absolute',
    right: 24,
  },
  '@media (min-width: 1194px)': {
    right: 24,
  },
});

const LogoLinksWrapper = styled.div({
  display: 'none',
  '@media (min-width: 834px)': {
    display: 'flex',
  },
});

const WrapperIcon = styled.div({
  display: 'flex',
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    display: 'none',
  },
  [lightTheme.breakpoints.down('table_375')]: {
    display: 'none',
  },
});

export default Header;
