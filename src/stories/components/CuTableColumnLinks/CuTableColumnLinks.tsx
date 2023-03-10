import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React from 'react';
import lightTheme from '../../../../styles/theme/light';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { LinkTypeEnum } from '../../../core/enums/linkTypeEnum';
import Discord from '../svg/discord';
import Forum from '../svg/forum';
import Github from '../svg/github';
import Gmail from '../svg/gmail';
import LinkedIn from '../svg/linkedin';
import Twitter from '../svg/twitter';
import WWW from '../svg/www';
import Youtube from '../svg/youtube';
import { ColumnLinksSkeleton } from './CuTableColumnLinksSkeleton';

export interface LinkModel {
  href: string;
  linkType: LinkTypeEnum;
}

interface CuTableColumnLinksProps {
  links?: LinkModel[];
  width?: number;
  height?: number;
  spacings?: number;
  fill?: string;
  fillDark?: string;
  lastChild?: boolean;
  align?: 'flex-start' | 'center' | 'flex-end';
  isLoading?: boolean;
  isIndex?: boolean;
}

const getImageForLink = (link: LinkModel, fill: string, width?: number, height?: number, fillDark?: string) => {
  switch (link.linkType) {
    case LinkTypeEnum.WWW:
      return <WWW fill={fill} width={width} height={height} fillDark={fillDark} />;
    case LinkTypeEnum.Forum:
      return <Forum fill={fill} width={width} height={height} fillDark={fillDark} />;
    case LinkTypeEnum.Discord:
      return <Discord fill={fill} width={width} height={height} fillDark={fillDark} />;
    case LinkTypeEnum.Twitter:
      return <Twitter fill={fill} width={width} height={height} fillDark={fillDark} />;
    case LinkTypeEnum.Youtube:
      return <Youtube fill={fill} width={width} height={height} fillDark={fillDark} />;
    case LinkTypeEnum.LinkedIn:
      return <LinkedIn fill={fill} width={width} height={height} fillDark={fillDark} />;
    case LinkTypeEnum.Gmail:
      return <Gmail fill={fill} width={width} height={height} fillDark={fillDark} />;
    case LinkTypeEnum.Github:
      return <Github fill={fill} width={width} height={height} fillDark={fillDark} />;
    default:
      return <WWW />;
  }
};

export const CuTableColumnLinks = ({
  width,
  height,
  links,
  align = 'flex-end',
  spacings,
  fill = '#708390',
  lastChild = false,
  fillDark,
  isLoading = false,
  isIndex,
}: CuTableColumnLinksProps) => {
  const { isLight } = useThemeContext();
  return !isLoading ? (
    <Container isIndex={isIndex} spacings={spacings} align={align}>
      {links?.map((link, i) => (
        <StyleBox lastChild={lastChild} key={`link-${i}`}>
          <LinkImage
            href={link.href}
            target="_blank"
            width={width}
            height={height}
            isLight={isLight}
            onClick={(event: React.SyntheticEvent) => event.stopPropagation()}
          >
            {getImageForLink(link, fill, width, height, fillDark)}
          </LinkImage>
        </StyleBox>
      ))}
    </Container>
  ) : (
    <ColumnLinksSkeleton />
  );
};

const Container = styled.div<{ spacings?: number; align: string; isIndex?: boolean }>((props) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: props.align,
  ' & > div:first-of-type': {
    marginRight: '16px',
  },
  '* + *': {
    marginRight: '16px',
  },
  ' & > div:last-child': {
    marginRight: '0px',
  },
  '@media (min-width: 1194px)': props.isIndex
    ? {
        maxWidth: '240px',
        flexWrap: 'wrap-reverse',
        ' & > div:first-of-type': {
          marginRight: '8px',
          marginTop: '0px',
        },
        ' & > div:last-child': {
          marginRight: '8px',
          [lightTheme.breakpoints.up('desktop_1194')]: {
            marginRight: '16px',
          },
        },
      }
    : undefined,
  '@media (min-width: 1410px)': {
    maxWidth: 'unset',
    flexWrap: 'nowrap',
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    ' & > div:first-of-type': {
      marginRight: '16px',
      marginTop: '10px',
    },
    '* + *': {
      marginRight: '16px',
      marginTop: '10px',
    },
    ' & > div:last-child': {
      marginRight: '6px',
    },
  },
}));

type StickyLinkProps = {
  width?: number;
  height?: number;
  isLight?: boolean;
};

const LinkImage = styled.a(
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ({ width = 32, height = 32, isLight = true }: StickyLinkProps) => ({
    width,
    height,
    '&:hover svg path': {
      fill: isLight ? '#231536' : 'white',
    },
  })
);

const StyleBox = styled(Box, { shouldForwardProp: (prop) => prop !== 'isLight' })<{
  lastChild?: boolean;
}>((props) => ({
  '&:last-child': props.lastChild && {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 19,
    height: 19,
  },
}));
