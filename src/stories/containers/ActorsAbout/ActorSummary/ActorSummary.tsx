import styled from '@emotion/styled';
import { Collapse } from '@mui/material';
import { siteRoutes } from '@ses/config/routes';
import { filterDataActors } from '@ses/containers/Actors/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { getArrayParam } from '@ses/core/utils/filters';
import { buildQueryString } from '@ses/core/utils/urls';
import lightTheme from '@ses/styles/theme/light';
import _ from 'lodash';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import BreadCrumbNavigation from '../BreadCrumbNavigation/BreadCrumbNavigation';
import ActorTitleWithDescription from './ActorTitleWithDescription';
import type { Team } from '@ses/core/models/interfaces/team';

interface ActorSummaryProps {
  actors: Team[];
  trailingAddress?: string[];
  breadcrumbTitle?: string;
}

const ActorSummary: React.FC<ActorSummaryProps> = ({ actors: data = [], breadcrumbTitle, trailingAddress = [] }) => {
  const { isLight } = useThemeContext();

  const [showHeader, setShowHeader] = useState(true);
  const router = useRouter();
  const query = router.query;
  const code = query.code as string;

  // This is for the filter in the page of list actors about
  const filteredCategories = useMemo(() => getArrayParam('filteredCategories', router.query), [router.query]);

  const actorAbout = data?.find((actor) => actor.shortCode === code) || ({} as Team);

  const buildCULabel = () => (!_.isEmpty(actorAbout) ? `${actorAbout?.name}` : '');

  const ref = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = useCallback(
    _.debounce(() => {
      setShowHeader((ref?.current?.offsetTop ?? 0) <= 65);
    }, 50),
    []
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchmove', handleScroll);

    // Remove the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [handleScroll]);

  const filteredData = useMemo(() => {
    const { filteredCategoryData } = filterDataActors({
      data: data as Team[],
      filteredCategories,
    });

    return filteredCategoryData;
  }, [data, filteredCategories]);

  const page = useMemo(() => filteredData?.findIndex((item) => item.shortCode === code) + 1, [code, filteredData]);

  const queryStrings = buildQueryString({
    ...router.query,
    filteredCategories,
    code: null, // override the Actors Code code to avoid add it to the query string as Core Unit
  });

  const changeCoreUnitCode = useCallback(
    (direct: -1 | 1) => () => {
      const index = filteredData?.findIndex((item) => item.shortCode === code);
      const newIndex = index + direct;
      if (newIndex >= 0 && newIndex < filteredData?.length) {
        router.push(`${router.route.replace('[code]', filteredData[newIndex].shortCode)}${queryStrings}`);
      }
    },
    [code, filteredData, queryStrings, router]
  );

  return (
    <MainContainer ref={ref} isLight={isLight}>
      <BreadCrumbNavigationStyled
        descriptionTextPagination="Ecosystem Actors"
        itemActual={page}
        mainUrl={`${siteRoutes.ecosystemActors}/${queryStrings}`}
        labelFirstItemNavigation={{
          label: buildCULabel(),
          url: `${siteRoutes.ecosystemActorAbout(code)}/${queryStrings}`,
        }}
        totalElements={filteredData.length}
        onClickLeft={changeCoreUnitCode(-1)}
        onClickRight={changeCoreUnitCode(1)}
        breadcrumbTitleMobile={breadcrumbTitle}
        hasStyleMobileItem={[buildCULabel(), undefined].includes(breadcrumbTitle)}
        trailingAddress={trailingAddress}
        router={router}
      />

      <Collapse in={showHeader} timeout={600} unmountOnExit>
        <ActorTitleWithDescriptionStyled actorAbout={actorAbout} showTextDescription={true} />
      </Collapse>

      <ContainerResponsiveMobile showHeader={showHeader} isLight={isLight} />
    </MainContainer>
  );
};

export default ActorSummary;
const MainContainer = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  position: 'sticky',
  top: 64,
  width: '100%',
  background: isLight ? '#FFFFFF' : '#25273D',

  backgroundImage: isLight ? 'url(/assets/img/Subheader.png)' : 'url(/assets/img/Subheader-dark.png)',
  backgroundSize: 'cover',

  zIndex: 3,

  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    borderBottom: isLight ? '1px solid #B6EDE7' : '1px solid #027265',
  },
}));

const ContainerResponsiveMobile = styled.div<{ isLight: boolean; showHeader: boolean }>(({ isLight, showHeader }) => ({
  position: 'relative',
  borderBottom: showHeader ? (isLight ? '1px solid #B6EDE7' : '1px solid #027265') : 'none',
  width: '100%',
  marginTop: showHeader ? '24px' : 0,

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: '24px',
  },

  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    marginTop: showHeader ? '16px' : '0px',
    borderBottom: 'none',
  },
}));

const BreadCrumbNavigationStyled = styled(BreadCrumbNavigation)({
  marginBottom: 0,
  '> div:first-of-type': {
    marginBottom: 0,
  },
});

const ActorTitleWithDescriptionStyled = styled(ActorTitleWithDescription)({
  paddingTop: 16,
});
