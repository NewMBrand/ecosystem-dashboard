
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import Markdown from 'marked-react';
import { customRenderer } from './renderUtils';
import { CustomButton } from '../custom-button/custom-button';

export type MarkDownHeaders = {
  level: number;
  title: string;
  id: string;
  href: string;
};

interface Props {
  sentenceDescription: string;
  paragraphDescription: string;
  paragraphImage: string;
  title?: string;
  subTitle?: string;
  headersLevel: MarkDownHeaders[];
  showButton?: boolean;
  onClick: () => void;
}

const MdViewerPage = ({ subTitle = 'What we do', paragraphDescription, paragraphImage, headersLevel, showButton = false, onClick }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const ids = headersLevel.map((header) => header.id);
    const linkRefs = ids.map((id) => document.querySelector(`a[href='#${id}']`));

    const onScroll = () => {
      let lastScrolledLink = linkRefs[0];

      linkRefs.forEach((link) => {
        if (link) {
          const topPosition = link.getBoundingClientRect().top;
          if (topPosition <= 20) {
            lastScrolledLink = link;
          }
        }
      });

      if (lastScrolledLink) {
        setActiveLink(lastScrolledLink.id);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [headersLevel]);
  return (
    <ViewerContainer>
      {showButton
        ? <ContainerResponsive>
          <TypographyStyleDescription id='hidden-element'>{subTitle}</TypographyStyleDescription>
          <CustomButton widthText='100%' label='Expenses' style={{
            textAlign: 'center',
            background: '#E7FCFA',
            border: '1px solid #1AAB9B',
            borderRadius: '22px',
            height: '34px',
            color: '#1AAB9B',
            fontFamily: 'SF Pro Text, sans serif',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '18px',
            width: 'fit-content',
            padding: '8px 24px'
            // eslint-disable-next-line @typescript-eslint/no-empty-function
          }} onClick={onClick} styleText={{
            color: '#1AAB9B',
          }} />
        </ContainerResponsive>
        : <TypographyStyleDescription id='hidden-element'>{subTitle}</TypographyStyleDescription>}
      {paragraphDescription && <Markdown value={paragraphDescription} renderer={customRenderer} key={paragraphDescription}/>}
      {(paragraphImage !== '![Image]()') &&
        <Markdown value={paragraphImage} renderer={customRenderer} key={paragraphImage}/>
      }
    </ViewerContainer>
  );
};

export default MdViewerPage;

const ViewerContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'justify',
  boxSizing: 'border-box',
});

const TypographyStyleDescription = styled(Typography)({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '20px',
  lineHeight: '19px',
  color: '#231536',
  marginBottom: '16px'
});

const ContainerResponsive = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

});
